import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
import pickle
import os
from flask import Flask, request, jsonify, render_template_string
import shap
warnings.filterwarnings('ignore')

# For preprocessing
from sklearn.model_selection import train_test_split, TimeSeriesSplit
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import (mean_absolute_error, mean_squared_error, r2_score, 
                            accuracy_score, precision_score, recall_score, 
                            f1_score, roc_auc_score, confusion_matrix,
                            precision_recall_curve, auc, roc_curve)
from sklearn.model_selection import cross_val_score

# For modeling
from sklearn.ensemble import (RandomForestRegressor, GradientBoostingRegressor, 
                             RandomForestClassifier, GradientBoostingClassifier,
                             StackingClassifier, IsolationForest)
from sklearn.linear_model import LogisticRegression
import xgboost as xgb
from imblearn.over_sampling import SMOTE, ADASYN
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.combine import SMOTETomek
from skopt import BayesSearchCV
from skopt.space import Real, Integer, Categorical

# Set random seed for reproducibility
np.random.seed(42)

# Create model directory if it doesn't exist
model_dir = "models"
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

# Function to check if models are already trained and saved
def models_exist():
    required_files = [
        f"{model_dir}/er_model.pkl",
        f"{model_dir}/opd_model.pkl",
        f"{model_dir}/spike_model.pkl",
        f"{model_dir}/area_models.pkl",
        f"{model_dir}/area_results.pkl",
        f"{model_dir}/optimal_threshold.pkl"
    ]
    return all(os.path.exists(file) for file in required_files)

# Advanced Feature Engineering
def advanced_feature_engineering(df):
    # Create a copy to avoid modifying the original
    data = df.copy()
    
    # Extract date components
    data['DayOfWeek'] = data['Date'].dt.dayofweek
    data['Month'] = data['Date'].dt.month
    data['Year'] = data['Date'].dt.year
    data['Day'] = data['Date'].dt.day
    data['Quarter'] = data['Date'].dt.quarter
    data['IsWeekend'] = (data['DayOfWeek'] >= 5).astype(int)
    data['DayOfYear'] = data['Date'].dt.dayofyear
    data['WeekOfYear'] = data['Date'].dt.isocalendar().week
    
    # Create holiday proximity feature (days before/after holiday)
    holiday_dates = data[data['IsHoliday'] == 1]['Date'].unique()
    data['DaysToHoliday'] = 100  # Default large value
    
    for date in data['Date'].unique():
        days_to_holiday = min([abs((date - pd.Timestamp(hdate)).days) for hdate in holiday_dates], default=100)
        data.loc[data['Date'] == date, 'DaysToHoliday'] = days_to_holiday
    
    # Create seasonal indicators using sine and cosine transforms for cyclical features
    data['MonthSin'] = np.sin(2 * np.pi * data['Month']/12)
    data['MonthCos'] = np.cos(2 * np.pi * data['Month']/12)
    data['DayOfYearSin'] = np.sin(2 * np.pi * data['DayOfYear']/365)
    data['DayOfYearCos'] = np.cos(2 * np.pi * data['DayOfYear']/365)
    
    # Create lag features for time series
    for lag in [7, 14, 28]:  # 1 week, 2 weeks, 4 weeks
        data[f'ER_Lag_{lag}'] = data.groupby(['Area'])['ER_Visits'].transform(
            lambda x: x.shift(lag))
        data[f'OPD_Lag_{lag}'] = data.groupby(['Area'])['OPD_Visits'].transform(
            lambda x: x.shift(lag))
    
    # Create rolling averages
    for window in [7, 14, 28]:
        data[f'ER_RollingMean_{window}'] = data.groupby(['Area'])['ER_Visits'].transform(
            lambda x: x.shift(1).rolling(window=window, min_periods=1).mean())
        data[f'OPD_RollingMean_{window}'] = data.groupby(['Area'])['OPD_Visits'].transform(
            lambda x: x.shift(1).rolling(window=window, min_periods=1).mean())
    
    # Add moving averages with different windows
    for window in [3, 5]:
        data[f'ER_MA_{window}'] = data.groupby(['Area'])['ER_Visits'].transform(
            lambda x: x.shift(1).rolling(window=window, min_periods=1).mean())
        data[f'OPD_MA_{window}'] = data.groupby(['Area'])['OPD_Visits'].transform(
            lambda x: x.shift(1).rolling(window=window, min_periods=1).mean())
    
    # Add exponentially weighted moving averages
    data['ER_EWMA'] = data.groupby(['Area'])['ER_Visits'].transform(
        lambda x: x.shift(1).ewm(span=7).mean())
    data['OPD_EWMA'] = data.groupby(['Area'])['OPD_Visits'].transform(
        lambda x: x.shift(1).ewm(span=7).mean())
    
    # Add lag differences (rate of change)
    for lag in [7, 14]:
        data[f'ER_Diff_{lag}'] = data['ER_Visits'] - data[f'ER_Lag_{lag}']
        data[f'OPD_Diff_{lag}'] = data['OPD_Visits'] - data[f'OPD_Lag_{lag}']
    
    # Aggregate environmental factors by area and date
    env_cols = ['Temperature', 'Humidity', 'AQI', 'Precipitation']
    area_date_env = data.groupby(['Area', 'Date'])[env_cols].mean().reset_index()
    
    # Merge back to get area-level environmental factors
    data = data.merge(area_date_env, on=['Area', 'Date'], suffixes=('', '_AreaAvg'))
    
    # Create interaction features
    data['TempHumidityInteraction'] = data['Temperature'] * data['Humidity'] / 100
    data['ComorbidityCount'] = (data['HasDiabetes'] + data['HasHypertension'] + 
                              data['HasAsthma'] + data['HasCOPD'] + data['HasHeartDisease'])
    
    # Add polynomial features for important numerical variables
    for col in ['Age', 'Temperature', 'AQI']:
        data[f'{col}_Squared'] = data[col] ** 2
    
    # Add more interaction terms
    data['Age_Temperature'] = data['Age'] * data['Temperature'] / 100
    data['AQI_Asthma'] = data['AQI'] * data['HasAsthma']
    data['Temp_COPD'] = data['Temperature'] * data['HasCOPD']
    data['Humidity_Asthma'] = data['Humidity'] * data['HasAsthma']
    
    # Create risk score based on multiple factors
    data['HealthRiskScore'] = (
        data['Age'] / 100 +  # Age factor
        data['ComorbidityCount'] * 0.2 +  # Comorbidity factor
        (data['Temperature'] > 32).astype(int) * 0.15 +  # High temperature
        (data['Humidity'] > 80).astype(int) * 0.1 +  # High humidity
        (data['AQI'] > 100).astype(int) * 0.15 +  # Poor air quality
        data['IsVectorDiseaseRisk'] * 0.2 +  # Vector disease risk
        data['IsFluSeason'] * 0.15 +  # Flu season
        data['IsCycloneRisk'] * 0.25  # Cyclone risk
    )
    
    # Create more complex risk scores
    data['RespiratoryRiskScore'] = (
        data['HasAsthma'] * 2 + 
        data['HasCOPD'] * 2 + 
        (data['AQI'] > 100).astype(int) * 1.5 +
        (data['PollenCount'] > 100).astype(int) * 1.2
    )
    
    data['CardioRiskScore'] = (
        data['HasHeartDisease'] * 2 + 
        data['HasHypertension'] * 1.5 + 
        data['HasDiabetes'] * 1.2 +
        (data['Age'] > 65).astype(int) * 1.5
    )
    
    # Create area-specific features
    data['IsSlum_HighTemp'] = data['IsSlumDwelling'] * (data['Temperature'] > 30).astype(int)
    data['Age_Comorbidity'] = data['Age'] * data['ComorbidityCount']
    data['SES_Numeric'] = data['SES'].map({
        'Low': 0, 'Medium-Low': 1, 'Medium': 2, 'Medium-High': 3, 'High': 4
    })
    data['SES_Healthcare'] = data['SES_Numeric'] * data['HasPrimaryCare']
    
    # Create area-specific interaction terms
    for area in data['Area'].unique():
        # Create area dummy
        data[f'Is_{area.replace(" ", "_")}'] = (data['Area'] == area).astype(int)
        
        # Create area-specific interaction terms
        for feature in ['Temperature', 'Humidity', 'AQI']:
            data[f'{feature}_{area.replace(" ", "_")}'] = data[feature] * data[f'Is_{area.replace(" ", "_")}']
    
    return data

# Define healthcare demand spikes
def identify_demand_spikes(data, er_threshold_percentile=90, opd_threshold_percentile=90):
    # Calculate area-specific thresholds
    area_er_thresholds = data.groupby('Area')['ER_Visits'].quantile(er_threshold_percentile/100).to_dict()
    area_opd_thresholds = data.groupby('Area')['OPD_Visits'].quantile(opd_threshold_percentile/100).to_dict()
    
    # Create spike indicators
    data['ER_Spike'] = data.apply(lambda x: 1 if x['ER_Visits'] > area_er_thresholds[x['Area']] else 0, axis=1)
    data['OPD_Spike'] = data.apply(lambda x: 1 if x['OPD_Visits'] > area_opd_thresholds[x['Area']] else 0, axis=1)
    data['Healthcare_Spike'] = ((data['ER_Spike'] + data['OPD_Spike']) > 0).astype(int)
    
    return data

# Find the optimal threshold for classification
def find_optimal_threshold(y_true, y_proba):
    precisions, recalls, thresholds = precision_recall_curve(y_true, y_proba)
    f1_scores = 2 * (precisions * recalls) / (precisions + recalls + 1e-10)
    optimal_idx = np.argmax(f1_scores[:-1])  # Exclude the last element which doesn't correspond to a threshold
    if len(thresholds) > optimal_idx:
        return thresholds[optimal_idx]
    else:
        return 0.5  # Default threshold

# Function to generate early warnings
def generate_early_warnings(forecast_df, threshold=0.7, consecutive_days=2):
    """Generate early warnings for healthcare demand spikes"""
    warnings = []
    
    # Ensure Date is datetime
    if isinstance(forecast_df, pd.DataFrame) and 'Date' in forecast_df.columns:
        forecast_df['Date'] = pd.to_datetime(forecast_df['Date'])
    else:
        return pd.DataFrame(columns=['Area', 'Start_Date', 'End_Date', 'Duration', 'Average_Probability'])
    
    for area in forecast_df['Area'].unique():
        area_forecast = forecast_df[forecast_df['Area'] == area]
        
        # Group by date and check for consecutive days above threshold
        high_risk_dates = area_forecast[area_forecast['Spike_Probability'] > threshold]['Date'].dt.date.unique()
        
        # Check for consecutive days
        for i in range(len(high_risk_dates) - consecutive_days + 1):
            date_sequence = [high_risk_dates[i] + timedelta(days=j) for j in range(consecutive_days)]
            if all(d in high_risk_dates for d in date_sequence):
                warnings.append({
                    'Area': area,
                    'Start_Date': high_risk_dates[i],
                    'End_Date': high_risk_dates[i + consecutive_days - 1],
                    'Duration': consecutive_days,
                    'Average_Probability': area_forecast[
                        (area_forecast['Date'].dt.date >= high_risk_dates[i]) & 
                        (area_forecast['Date'].dt.date <= high_risk_dates[i + consecutive_days - 1])
                    ]['Spike_Probability'].mean()
                })
    
    return pd.DataFrame(warnings) if warnings else pd.DataFrame(columns=['Area', 'Start_Date', 'End_Date', 'Duration', 'Average_Probability'])

# Function to forecast future healthcare demand
def forecast_future_demand(models, last_date, features_df, area_results, days=30):
    """
    Generate healthcare demand forecasts for the next specified number of days
    
    Parameters:
    -----------
    models : dict
        Dictionary of area-specific models
    last_date : datetime
        The last date in the dataset
    features_df : DataFrame
        The dataset used for training
    area_results : dict
        Dictionary of area-specific results including optimal thresholds
    days : int
        Number of days to forecast
    
    Returns:
    --------
    DataFrame with forecasts for each area
    """
    # Create a date range for the forecast period
    future_dates = pd.date_range(start=last_date + timedelta(days=1), periods=days)
    
    # Create a DataFrame for future dates
    future_df = pd.DataFrame({'Date': future_dates})
    
    # Add date-based features
    future_df['DayOfWeek'] = future_df['Date'].dt.dayofweek
    future_df['Month'] = future_df['Date'].dt.month
    future_df['Year'] = future_df['Date'].dt.year
    future_df['Day'] = future_df['Date'].dt.day
    future_df['Quarter'] = future_df['Date'].dt.quarter
    future_df['IsWeekend'] = (future_df['DayOfWeek'] >= 5).astype(int)
    future_df['DayOfYear'] = future_df['Date'].dt.dayofyear
    future_df['WeekOfYear'] = future_df['Date'].dt.isocalendar().week
    
    # Add seasonal indicators
    future_df['MonthSin'] = np.sin(2 * np.pi * future_df['Month']/12)
    future_df['MonthCos'] = np.cos(2 * np.pi * future_df['Month']/12)
    future_df['DayOfYearSin'] = np.sin(2 * np.pi * future_df['DayOfYear']/365)
    future_df['DayOfYearCos'] = np.cos(2 * np.pi * future_df['DayOfYear']/365)
    future_df['Season'] = future_df['Month'].apply(lambda m: 'Winter' if m in [12, 1, 2] else
                                                ('Summer' if m in [3, 4, 5] else
                                                 ('Monsoon' if m in [6, 7, 8, 9] else 'Post-Monsoon')))
    
    # Add holiday indicators
    future_df['IsHoliday'] = 0
    # Republic Day
    future_df.loc[(future_df['Month'] == 1) & (future_df['Day'] == 26), 'IsHoliday'] = 1
    # Independence Day
    future_df.loc[(future_df['Month'] == 8) & (future_df['Day'] == 15), 'IsHoliday'] = 1
    
    # Add DaysToHoliday
    future_df['DaysToHoliday'] = 100  # Default value
    holiday_dates = pd.to_datetime([
        f"{future_df['Year'].iloc[0]}-01-26",  # Republic Day
        f"{future_df['Year'].iloc[0]}-08-15",  # Independence Day
    ])
    
    for i, date in enumerate(future_df['Date']):
        days_to_holiday = min([abs((date - hdate).days) for hdate in holiday_dates], default=100)
        future_df.loc[i, 'DaysToHoliday'] = days_to_holiday
    
    # Add environmental forecasts based on historical monthly averages
    for month in range(1, 13):
        month_mask = features_df['Month'] == month
        
        for col in ['Temperature', 'Humidity', 'AQI', 'Precipitation', 'PollenCount']:
            if month_mask.sum() > 0:
                future_df.loc[future_df['Month'] == month, col] = features_df.loc[month_mask, col].mean()
            else:
                # Fallback if no data for this month
                future_df.loc[future_df['Month'] == month, col] = features_df[col].mean()
    
    # Add seasonal disease indicators
    future_df['IsFluSeason'] = future_df['Month'].apply(lambda x: 1 if x in [11, 12, 1, 2] else 0)
    future_df['IsVectorDiseaseRisk'] = future_df['Month'].apply(lambda x: 1 if x in [6, 7, 8, 9, 10] else 0)
    future_df['IsCycloneRisk'] = future_df['Month'].apply(lambda x: 1 if x in [5, 6, 10, 11] else 0)
    
    # Create predictions for each area
    all_predictions = []
    
    for area in models.keys():
        area_df = future_df.copy()
        area_df['Area'] = area
        
        # Add area-specific features (using averages from historical data)
        area_mask = features_df['Area'] == area
        
        # Add demographic and SDOH averages for this area
        for col in ['DistanceToHospital', 'HasPrimaryCare', 'HasTransportation', 'IsSlumDwelling',
                   'Age', 'HasDiabetes', 'HasHypertension', 'HasAsthma', 'HasCOPD', 'HasHeartDisease']:
            if area_mask.sum() > 0:
                area_df[col] = features_df.loc[area_mask, col].mean()
            else:
                area_df[col] = features_df[col].mean()
        
        # Add categorical distributions
        for cat in ['Gender', 'SES', 'Insurance']:
            if area_mask.sum() > 0:
                cat_dist = features_df.loc[area_mask, cat].value_counts(normalize=True)
                area_df[cat] = np.random.choice(cat_dist.index, size=len(area_df), p=cat_dist.values)
            else:
                # Fallback if no data for this area
                cat_dist = features_df[cat].value_counts(normalize=True)
                area_df[cat] = np.random.choice(cat_dist.index, size=len(area_df), p=cat_dist.values)
        
        # Calculate polynomial features
        area_df['Age_Squared'] = area_df['Age'] ** 2
        area_df['Temperature_Squared'] = area_df['Temperature'] ** 2
        area_df['AQI_Squared'] = area_df['AQI'] ** 2
        
        # Calculate ComorbidityCount
        area_df['ComorbidityCount'] = (area_df['HasDiabetes'] + area_df['HasHypertension'] + 
                                      area_df['HasAsthma'] + area_df['HasCOPD'] + area_df['HasHeartDisease'])
        
        # Calculate interaction terms
        area_df['TempHumidityInteraction'] = area_df['Temperature'] * area_df['Humidity'] / 100
        area_df['Age_Temperature'] = area_df['Age'] * area_df['Temperature'] / 100
        area_df['AQI_Asthma'] = area_df['AQI'] * area_df['HasAsthma']
        area_df['Temp_COPD'] = area_df['Temperature'] * area_df['HasCOPD']
        area_df['Humidity_Asthma'] = area_df['Humidity'] * area_df['HasAsthma']
        
        # Calculate HealthRiskScore
        area_df['HealthRiskScore'] = (
            area_df['Age'] / 100 +
            area_df['ComorbidityCount'] * 0.2 +
            (area_df['Temperature'] > 32).astype(int) * 0.15 +
            (area_df['Humidity'] > 80).astype(int) * 0.1 +
            (area_df['AQI'] > 100).astype(int) * 0.15 +
            area_df['IsVectorDiseaseRisk'] * 0.2 +
            area_df['IsFluSeason'] * 0.15 +
            area_df['IsCycloneRisk'] * 0.25
        )
        
        # Calculate RespiratoryRiskScore
        area_df['RespiratoryRiskScore'] = (
            area_df['HasAsthma'] * 2 + 
            area_df['HasCOPD'] * 2 + 
            (area_df['AQI'] > 100).astype(int) * 1.5 +
            (area_df['PollenCount'] > 100).astype(int) * 1.2
        )
        
        # Calculate CardioRiskScore
        area_df['CardioRiskScore'] = (
            area_df['HasHeartDisease'] * 2 + 
            area_df['HasHypertension'] * 1.5 + 
            area_df['HasDiabetes'] * 1.2 +
            (area_df['Age'] > 65).astype(int) * 1.5
        )
        
        # Calculate SES_Numeric
        area_df['SES_Numeric'] = area_df['SES'].map({
            'Low': 0, 'Medium-Low': 1, 'Medium': 2, 'Medium-High': 3, 'High': 4
        })
        
        # Calculate SES_Healthcare
        area_df['SES_Healthcare'] = area_df['SES_Numeric'] * area_df['HasPrimaryCare']
        
        # Calculate IsSlum_HighTemp
        area_df['IsSlum_HighTemp'] = area_df['IsSlumDwelling'] * (area_df['Temperature'] > 30).astype(int)
        
        # Calculate Age_Comorbidity
        area_df['Age_Comorbidity'] = area_df['Age'] * area_df['ComorbidityCount']
        
        # Create area-specific interaction terms
        for a in features_df['Area'].unique():
            area_df[f'Is_{a.replace(" ", "_")}'] = (area_df['Area'] == a).astype(int)
            
            for feature in ['Temperature', 'Humidity', 'AQI']:
                area_df[f'{feature}_{a.replace(" ", "_")}'] = area_df[feature] * area_df[f'Is_{a.replace(" ", "_")}']
        
        # Add rolling means from the last available data
        last_month_data = features_df[(features_df['Area'] == area)].sort_values('Date').tail(30)
        
        if len(last_month_data) > 0:
            for window in [7, 14, 28]:
                area_df[f'ER_RollingMean_{window}'] = last_month_data['ER_Visits'].tail(window).mean()
                area_df[f'OPD_RollingMean_{window}'] = last_month_data['OPD_Visits'].tail(window).mean()
            
            for window in [3, 5]:
                area_df[f'ER_MA_{window}'] = last_month_data['ER_Visits'].tail(window).mean()
                area_df[f'OPD_MA_{window}'] = last_month_data['OPD_Visits'].tail(window).mean()
            
            area_df['ER_EWMA'] = last_month_data['ER_Visits'].tail(7).mean()  # Simplified EWMA
            area_df['OPD_EWMA'] = last_month_data['OPD_Visits'].tail(7).mean()  # Simplified EWMA
            
            for lag in [7, 14]:
                if len(last_month_data) > lag:
                    area_df[f'ER_Diff_{lag}'] = last_month_data['ER_Visits'].iloc[-1] - last_month_data['ER_Visits'].iloc[-lag-1]
                    area_df[f'OPD_Diff_{lag}'] = last_month_data['OPD_Visits'].iloc[-1] - last_month_data['OPD_Visits'].iloc[-lag-1]
                else:
                    area_df[f'ER_Diff_{lag}'] = 0
                    area_df[f'OPD_Diff_{lag}'] = 0
        else:
            # Fallback if no data for this area
            for window in [7, 14, 28]:
                area_df[f'ER_RollingMean_{window}'] = features_df['ER_Visits'].mean()
                area_df[f'OPD_RollingMean_{window}'] = features_df['OPD_Visits'].mean()
            
            for window in [3, 5]:
                area_df[f'ER_MA_{window}'] = features_df['ER_Visits'].mean()
                area_df[f'OPD_MA_{window}'] = features_df['OPD_Visits'].mean()
            
            area_df['ER_EWMA'] = features_df['ER_Visits'].mean()
            area_df['OPD_EWMA'] = features_df['OPD_Visits'].mean()
            
            for lag in [7, 14]:
                area_df[f'ER_Diff_{lag}'] = 0
                area_df[f'OPD_Diff_{lag}'] = 0
        
        # Use the area-specific model to predict
        X_area = area_df.drop(['Date'], axis=1)
        
        try:
            # Make predictions
            area_df['Spike_Probability'] = models[area].predict_proba(X_area)[:, 1]
            # Use area-specific optimal threshold
            area_threshold = area_results[area]['threshold']
            area_df['Predicted_Spike'] = (area_df['Spike_Probability'] >= area_threshold).astype(int)
            
            # Use ER model to predict ER visits
            area_df['Predicted_ER_Visits'] = er_model.predict(X_area)
            
            # Use OPD model to predict OPD visits
            area_df['Predicted_OPD_Visits'] = opd_model.predict(X_area)
        except Exception as e:
            print(f"Error predicting for {area}: {e}")
            # Fallback
            area_df['Spike_Probability'] = 0.5
            area_df['Predicted_Spike'] = 0
            area_df['Predicted_ER_Visits'] = features_df['ER_Visits'].mean()
            area_df['Predicted_OPD_Visits'] = features_df['OPD_Visits'].mean()
        
        all_predictions.append(area_df)
    
    # Combine all area predictions
    forecast_df = pd.concat(all_predictions, ignore_index=True)
    
    return forecast_df

# Function to train models and save them
def train_and_save_models():
    global er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold
    
    print("Starting healthcare demand prediction model with advanced techniques...")
    
    # Load the dataset
    print("Loading dataset...")
    df = pd.read_csv('mumbai_healthcare_demand_dataset.csv')
    
    # Convert date to datetime
    df['Date'] = pd.to_datetime(df['Date'])
    
    print(f"Dataset shape: {df.shape}")
    
    # Apply feature engineering
    print("\nPerforming advanced feature engineering...")
    engineered_df = advanced_feature_engineering(df)
    
    # Handle missing values from lag features
    engineered_df = engineered_df.dropna()
    print(f"Dataset shape after feature engineering: {engineered_df.shape}")
    
    # Identify demand spikes
    spike_df = identify_demand_spikes(engineered_df)
    
    # Check distribution of spikes
    er_spikes = spike_df['ER_Spike'].sum()
    opd_spikes = spike_df['OPD_Spike'].sum()
    healthcare_spikes = spike_df['Healthcare_Spike'].sum()
    
    print(f"ER Spikes: {er_spikes} ({spike_df['ER_Spike'].mean()*100:.2f}%)")
    print(f"OPD Spikes: {opd_spikes} ({spike_df['OPD_Spike'].mean()*100:.2f}%)")
    print(f"Overall Healthcare Spikes: {healthcare_spikes} ({spike_df['Healthcare_Spike'].mean()*100:.2f}%)")
    
    # Define features and target variables
    categorical_features = ['Area', 'Gender', 'SES', 'Insurance', 'Season']
    numerical_features = [
        'Age', 'Temperature', 'Humidity', 'AQI', 'Precipitation', 'PollenCount',
        'IsCycloneRisk', 'IsVectorDiseaseRisk', 'IsFluSeason', 'IsHoliday',
        'DistanceToHospital', 'HasPrimaryCare', 'HasTransportation',
        'IsSlumDwelling', 'HasDiabetes', 'HasHypertension', 'HasAsthma',
        'HasCOPD', 'HasHeartDisease', 'DaysToHoliday', 'MonthSin', 'MonthCos',
        'DayOfYearSin', 'DayOfYearCos', 'ER_RollingMean_7', 'ER_RollingMean_14', 
        'ER_RollingMean_28', 'OPD_RollingMean_7', 'OPD_RollingMean_14', 'OPD_RollingMean_28',
        'ER_MA_3', 'ER_MA_5', 'OPD_MA_3', 'OPD_MA_5', 'ER_EWMA', 'OPD_EWMA',
        'ER_Diff_7', 'ER_Diff_14', 'OPD_Diff_7', 'OPD_Diff_14',
        'TempHumidityInteraction', 'ComorbidityCount', 'HealthRiskScore',
        'Age_Squared', 'Temperature_Squared', 'AQI_Squared',
        'Age_Temperature', 'AQI_Asthma', 'Temp_COPD', 'Humidity_Asthma',
        'RespiratoryRiskScore', 'CardioRiskScore',
        'IsSlum_HighTemp', 'Age_Comorbidity', 'SES_Numeric', 'SES_Healthcare',
        'DayOfWeek', 'Month', 'IsWeekend', 'DayOfYear', 'WeekOfYear'
    ]
    
    # Create preprocessor
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ],
        remainder='drop'  # Drop any columns not specified
    )
    
    # Split data for training and testing
    # Use time-based split since this is time series data
    print("\nSplitting data for training and testing...")
    train_idx = spike_df[spike_df['Date'] < '2024-10-01'].index
    test_idx = spike_df[spike_df['Date'] >= '2024-10-01'].index
    
    X_train = spike_df.loc[train_idx].drop(['ER_Visits', 'OPD_Visits', 'ER_Spike', 'OPD_Spike', 
                                            'Healthcare_Spike', 'Date', 'PinCode', 'Admission', 
                                            'LOS_Days', 'IsOverweight', 'IsObese'], axis=1)
    X_test = spike_df.loc[test_idx].drop(['ER_Visits', 'OPD_Visits', 'ER_Spike', 'OPD_Spike', 
                                          'Healthcare_Spike', 'Date', 'PinCode', 'Admission', 
                                          'LOS_Days', 'IsOverweight', 'IsObese'], axis=1)
    
    y_er_train = spike_df.loc[train_idx, 'ER_Visits']
    y_er_test = spike_df.loc[test_idx, 'ER_Visits']
    y_opd_train = spike_df.loc[train_idx, 'OPD_Visits']
    y_opd_test = spike_df.loc[test_idx, 'OPD_Visits']
    y_spike_train = spike_df.loc[train_idx, 'Healthcare_Spike']
    y_spike_test = spike_df.loc[test_idx, 'Healthcare_Spike']
    
    print(f"Training set size: {len(X_train)}")
    print(f"Testing set size: {len(X_test)}")
    
    # Detect and remove anomalies
    print("\nDetecting and removing anomalies...")
    isolation_forest = IsolationForest(contamination=0.05, random_state=42)
    anomalies = isolation_forest.fit_predict(preprocessor.fit_transform(X_train))
    
    # Filter out anomalies for training
    X_train_filtered = X_train[anomalies == 1]
    y_er_train_filtered = y_er_train[anomalies == 1]
    y_opd_train_filtered = y_opd_train[anomalies == 1]
    y_spike_train_filtered = y_spike_train[anomalies == 1]
    
    print(f"Removed {len(X_train) - len(X_train_filtered)} anomalies ({(len(X_train) - len(X_train_filtered))/len(X_train)*100:.2f}%)")
    print(f"Filtered training set size: {len(X_train_filtered)}")
    
    # Model 1: ER Visits Prediction with Bayesian Optimization
    print("\nTraining ER visits prediction model with Bayesian Optimization...")
    
    # Define search space for ER model
    er_search_space = {
        'regressor__n_estimators': Integer(100, 300),
        'regressor__learning_rate': Real(0.01, 0.2, prior='log-uniform'),
        'regressor__max_depth': Integer(3, 7),
        'regressor__subsample': Real(0.6, 1.0),
        'regressor__colsample_bytree': Real(0.6, 1.0)
    }
    
    er_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', xgb.XGBRegressor(random_state=42))
    ])
    
    # Use Bayesian search for hyperparameter optimization
    er_bayes_search = BayesSearchCV(
        er_model,
        er_search_space,
        n_iter=20,  # Reduced for faster execution
        cv=3,
        scoring='neg_mean_squared_error',
        n_jobs=-1,
        random_state=42,
        verbose=1
    )
    
    er_bayes_search.fit(X_train_filtered, y_er_train_filtered)
    print(f"Best parameters: {er_bayes_search.best_params_}")
    
    # Use the best model
    er_model = er_bayes_search.best_estimator_
    er_preds = er_model.predict(X_test)
    
    er_mae = mean_absolute_error(y_er_test, er_preds)
    er_rmse = np.sqrt(mean_squared_error(y_er_test, er_preds))
    er_r2 = r2_score(y_er_test, er_preds)
    
    print(f"ER Model - MAE: {er_mae:.2f}, RMSE: {er_rmse:.2f}, R²: {er_r2:.2f}")
    
    # Model 2: OPD Visits Prediction with Bayesian Optimization
    print("\nTraining OPD visits prediction model with Bayesian Optimization...")
    
    # Define search space for OPD model
    opd_search_space = {
        'regressor__n_estimators': Integer(100, 300),
        'regressor__learning_rate': Real(0.01, 0.2, prior='log-uniform'),
        'regressor__max_depth': Integer(3, 7),
        'regressor__subsample': Real(0.6, 1.0),
        'regressor__colsample_bytree': Real(0.6, 1.0)
    }
    
    opd_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', xgb.XGBRegressor(random_state=42))
    ])
    
    # Use Bayesian search for hyperparameter optimization
    opd_bayes_search = BayesSearchCV(
        opd_model,
        opd_search_space,
        n_iter=20,  # Reduced for faster execution
        cv=3,
        scoring='neg_mean_squared_error',
        n_jobs=-1,
        random_state=42,
        verbose=1
    )
    
    opd_bayes_search.fit(X_train_filtered, y_opd_train_filtered)
    print(f"Best parameters: {opd_bayes_search.best_params_}")
    
    # Use the best model
    opd_model = opd_bayes_search.best_estimator_
    opd_preds = opd_model.predict(X_test)
    
    opd_mae = mean_absolute_error(y_opd_test, opd_preds)
    opd_rmse = np.sqrt(mean_squared_error(y_opd_test, opd_preds))
    opd_r2 = r2_score(y_opd_test, opd_preds)
    
    print(f"OPD Model - MAE: {opd_mae:.2f}, RMSE: {opd_rmse:.2f}, R²: {opd_r2:.2f}")
    
    # Model 3: Healthcare Demand Spike Prediction with Ensemble Learning
    print("\nTraining healthcare demand spike prediction model with Ensemble Learning...")
    
    # Calculate class weights based on imbalance
    class_weight = {0: 1, 1: int(1 / spike_df['Healthcare_Spike'].mean())}
    
    # Base models with different strengths
    base_models = [
        ('xgb', xgb.XGBClassifier(
            n_estimators=200, 
            learning_rate=0.05, 
            max_depth=6, 
            scale_pos_weight=class_weight[1],
            random_state=42
        )),
        ('rf', RandomForestClassifier(
            n_estimators=200, 
            max_depth=10, 
            class_weight='balanced',
            random_state=42
        )),
        ('gb', GradientBoostingClassifier(
            n_estimators=200, 
            learning_rate=0.05, 
            max_depth=4,
            random_state=42
        ))
    ]
    
    # Create a stacking classifier
    stacking_model = ImbPipeline([
        ('preprocessor', preprocessor),
        ('sampler', SMOTETomek(random_state=42)),
        ('classifier', StackingClassifier(
            estimators=base_models,
            final_estimator=LogisticRegression(class_weight='balanced', max_iter=1000),
            cv=5,
            stack_method='predict_proba',
            n_jobs=-1
        ))
    ])
    
    # Train the stacking model
    stacking_model.fit(X_train_filtered, y_spike_train_filtered)
    spike_probs = stacking_model.predict_proba(X_test)[:, 1]
    
    # Find optimal threshold
    optimal_threshold = find_optimal_threshold(y_spike_test, spike_probs)
    print(f"Optimal threshold: {optimal_threshold:.3f}")
    
    # Make predictions with optimal threshold
    spike_preds = (spike_probs >= optimal_threshold).astype(int)
    
    # Evaluate spike prediction model
    accuracy = accuracy_score(y_spike_test, spike_preds)
    precision = precision_score(y_spike_test, spike_preds)
    recall = recall_score(y_spike_test, spike_preds)
    f1 = f1_score(y_spike_test, spike_preds)
    roc_auc = roc_auc_score(y_spike_test, spike_probs)
    
    # Calculate precision-recall AUC (better for imbalanced data)
    precision_curve, recall_curve, _ = precision_recall_curve(y_spike_test, spike_probs)
    pr_auc = auc(recall_curve, precision_curve)
    
    print(f"Spike Prediction - Accuracy: {accuracy:.2f}, Precision: {precision:.2f}, Recall: {recall:.2f}, F1: {f1:.2f}")
    print(f"ROC-AUC: {roc_auc:.2f}, PR-AUC: {pr_auc:.2f}")
    
    # Plot confusion matrix
    cm = confusion_matrix(y_spike_test, spike_preds)
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix for Healthcare Demand Spike Prediction')
    plt.savefig('confusion_matrix.png')
    plt.close()
    
    # Plot ROC curve
    plt.figure(figsize=(8, 6))
    fpr, tpr, _ = roc_curve(y_spike_test, spike_probs)
    plt.plot(fpr, tpr, label=f'ROC Curve (AUC = {roc_auc:.2f})')
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve for Healthcare Demand Spike Prediction')
    plt.legend()
    plt.savefig('roc_curve.png')
    plt.close()
    
    # Plot precision-recall curve
    plt.figure(figsize=(8, 6))
    plt.plot(recall_curve, precision_curve, label=f'PR Curve (AUC = {pr_auc:.2f})')
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve for Healthcare Demand Spike Prediction')
    plt.legend()
    plt.savefig('pr_curve.png')
    plt.close()
    
    # IMPROVEMENT 1: Model Explainability with SHAP
    print("\nGenerating SHAP values for model explainability...")
    # Fix: Create a direct XGBoost model for SHAP analysis instead of using the pipeline
    try:
        # Get a sample of the test data for SHAP analysis
        X_sample = X_test.iloc[:100]  # Using a small sample for efficiency
        
        # Preprocess the data
        X_sample_transformed = preprocessor.transform(X_sample)
        
        # Create a simple XGBoost model for SHAP
        simple_xgb = xgb.XGBRegressor(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=4,
            random_state=42
        )
        simple_xgb.fit(preprocessor.transform(X_train_filtered), y_er_train_filtered)
        
        # Create a SHAP explainer for the simple model
        explainer = shap.Explainer(simple_xgb)
        shap_values = explainer(X_sample_transformed)
        
        # Plot SHAP summary
        plt.figure(figsize=(12, 8))
        shap.summary_plot(shap_values, X_sample_transformed, show=False)
        plt.title('SHAP Feature Importance for ER Visits Prediction')
        plt.tight_layout()
        plt.savefig('shap_summary_er.png')
        plt.close()
        
        # Create a simple XGBoost classifier for spike prediction SHAP
        simple_xgb_clf = xgb.XGBClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=4,
            scale_pos_weight=class_weight[1],
            random_state=42
        )
        simple_xgb_clf.fit(preprocessor.transform(X_train_filtered), y_spike_train_filtered)
        
        # Create a SHAP explainer for the classifier
        explainer_clf = shap.Explainer(simple_xgb_clf)
        shap_values_clf = explainer_clf(X_sample_transformed)
        
        plt.figure(figsize=(12, 8))
        shap.summary_plot(shap_values_clf, X_sample_transformed, show=False)
        plt.title('SHAP Feature Importance for Healthcare Demand Spike Prediction')
        plt.tight_layout()
        plt.savefig('shap_summary_spike.png')
        plt.close()
        
        print("SHAP analysis completed successfully.")
    except Exception as e:
        print(f"Error in SHAP analysis: {e}")
        print("Continuing with the rest of the pipeline...")
    
    # IMPROVEMENT 2: Temporal Validation
    print("\nPerforming temporal validation...")
    # Create a TimeSeriesSplit for temporal validation
    tscv = TimeSeriesSplit(n_splits=5)
    
    # Function to evaluate model with temporal cross-validation
    def temporal_cv_evaluation(model, X, y, cv, scoring='f1'):
        cv_scores = []
        fold = 1
        
        for train_idx, val_idx in cv.split(X):
            X_cv_train, X_cv_val = X.iloc[train_idx], X.iloc[val_idx]
            y_cv_train, y_cv_val = y.iloc[train_idx], y.iloc[val_idx]
            
            # Train the model
            model.fit(X_cv_train, y_cv_train)
            
            # Predict and evaluate
            if scoring == 'f1':
                y_cv_pred = model.predict(X_cv_val)
                score = f1_score(y_cv_val, y_cv_pred)
            elif scoring == 'r2':
                y_cv_pred = model.predict(X_cv_val)
                score = r2_score(y_cv_val, y_cv_pred)
            
            cv_scores.append(score)
            print(f"Fold {fold}: {scoring} = {score:.3f}")
            fold += 1
        
        return cv_scores
    
    # Create simplified models for temporal validation (for efficiency)
    er_cv_model = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', xgb.XGBRegressor(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            random_state=42
        ))
    ])
    
    spike_cv_model = ImbPipeline([
        ('preprocessor', preprocessor),
        ('sampler', SMOTETomek(random_state=42)),
        ('classifier', xgb.XGBClassifier(
            n_estimators=200,
            learning_rate=0.1,
            max_depth=5,
            scale_pos_weight=class_weight[1],
            random_state=42
        ))
    ])
    
    # Perform temporal validation
    print("ER Model Temporal Validation:")
    er_cv_scores = temporal_cv_evaluation(er_cv_model, X_train, y_er_train, tscv, scoring='r2')
    print(f"Mean R² across folds: {np.mean(er_cv_scores):.3f}")
    
    print("\nSpike Model Temporal Validation:")
    spike_cv_scores = temporal_cv_evaluation(spike_cv_model, X_train, y_spike_train, tscv, scoring='f1')
    print(f"Mean F1 across folds: {np.mean(spike_cv_scores):.3f}")
    
    # Area-specific models with improved approach
    print("\nTraining area-specific models...")
    areas = spike_df['Area'].unique()
    area_models = {}
    area_results = {}
    
    for area in areas:
        print(f"Training model for {area}...")
        
        # Filter data for this area
        area_train_idx = spike_df[(spike_df['Area'] == area) & (spike_df['Date'] < '2024-10-01')].index
        area_test_idx = spike_df[(spike_df['Area'] == area) & (spike_df['Date'] >= '2024-10-01')].index
        
        X_area_train = spike_df.loc[area_train_idx].drop(['ER_Visits', 'OPD_Visits', 'ER_Spike', 'OPD_Spike', 
                                                         'Healthcare_Spike', 'Date', 'PinCode', 'Admission', 
                                                         'LOS_Days', 'Area', 'IsOverweight', 'IsObese'], axis=1)
        X_area_test = spike_df.loc[area_test_idx].drop(['ER_Visits', 'OPD_Visits', 'ER_Spike', 'OPD_Spike', 
                                                       'Healthcare_Spike', 'Date', 'PinCode', 'Admission', 
                                                       'LOS_Days', 'Area', 'IsOverweight', 'IsObese'], axis=1)
        
        y_area_train = spike_df.loc[area_train_idx, 'Healthcare_Spike']
        y_area_test = spike_df.loc[area_test_idx, 'Healthcare_Spike']
        
        # Create area-specific preprocessor (without Area feature)
        area_categorical_features = [f for f in categorical_features if f != 'Area']
        
        area_preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numerical_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), area_categorical_features)
            ],
            remainder='drop'
        )
        
        # Calculate class weights for this area
        area_class_weight = {0: 1, 1: int(1 / max(0.01, y_area_train.mean()))}
        
        # Create and train model with ADASYN for imbalanced classes
        area_model = ImbPipeline([
            ('preprocessor', area_preprocessor),
            ('sampler', ADASYN(random_state=42, sampling_strategy=0.5)),
            ('classifier', xgb.XGBClassifier(
                n_estimators=200,
                learning_rate=0.1,
                max_depth=6,
                scale_pos_weight=area_class_weight[1],
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42
            ))
        ])
        
        # Train the model
        area_model.fit(X_area_train, y_area_train)
        
        # Evaluate
        area_probs = area_model.predict_proba(X_area_test)[:, 1]
        
        # Find optimal threshold for this area
        if len(np.unique(y_area_test)) > 1 and sum(y_area_test) > 0:
            area_threshold = find_optimal_threshold(y_area_test, area_probs)
        else:
            area_threshold = 0.5
        
        area_preds = (area_probs >= area_threshold).astype(int)
        
        area_accuracy = accuracy_score(y_area_test, area_preds)
        area_precision = precision_score(y_area_test, area_preds, zero_division=0)
        area_recall = recall_score(y_area_test, area_preds, zero_division=0)
        area_f1 = f1_score(y_area_test, area_preds, zero_division=0)
        
        # Calculate precision-recall AUC
        if len(np.unique(y_area_test)) > 1 and sum(y_area_test) > 0:  # Only if both classes are present
            area_precision_curve, area_recall_curve, _ = precision_recall_curve(y_area_test, area_probs)
            area_pr_auc = auc(area_recall_curve, area_precision_curve)
        else:
            area_pr_auc = 0
        
        print(f"{area} - Accuracy: {area_accuracy:.2f}, Precision: {area_precision:.2f}, Recall: {area_recall:.2f}, F1: {area_f1:.2f}, PR-AUC: {area_pr_auc:.2f}")
        
        # Store model and results
        area_models[area] = area_model
        area_results[area] = {
            'accuracy': area_accuracy,
            'precision': area_precision,
            'recall': area_recall,
            'f1': area_f1,
            'pr_auc': area_pr_auc,
            'threshold': area_threshold
        }
    
    # Generate forecast for the next 30 days
    try:
        print("\nGenerating 30-day healthcare demand forecast...")
        forecast = forecast_future_demand(area_models, spike_df['Date'].max(), spike_df, area_results, days=30)
        
        # Visualize the forecast
        plt.figure(figsize=(15, 8))
        for area in areas:
            area_forecast = forecast[forecast['Area'] == area]
            plt.plot(area_forecast['Date'], area_forecast['Spike_Probability'], label=area)
        
        plt.axhline(y=0.5, color='r', linestyle='--', label='Spike Threshold')
        plt.title('30-Day Healthcare Demand Spike Forecast by Area')
        plt.xlabel('Date')
        plt.ylabel('Spike Probability')
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        plt.savefig('forecast_by_area.png')
        plt.close()
        
        # Generate early warnings
        warnings = generate_early_warnings(forecast, threshold=0.7, consecutive_days=2)
        
        if len(warnings) > 0:
            print("\nEarly Warning System - Healthcare Demand Spike Alerts:")
            for _, row in warnings.iterrows():
                print(f"{row['Area']}: {row['Start_Date']} to {row['End_Date']} ({row['Duration']} days) - Avg. Probability: {row['Average_Probability']:.2f}")
        else:
            print("\nNo early warnings generated for the forecast period.")
            print("This may be because the current time period (late April 2025) doesn't have conditions that would trigger healthcare demand spikes.")
            print("Consider the following factors:")
            print("1. April-May is a transition period between winter and monsoon in Mumbai")
            print("2. Vector-borne diseases typically peak during monsoon (June-September)")
            print("3. Respiratory conditions are more common during winter (November-February)")
            print("4. The model is trained on historical patterns and may not predict unusual events")
        
        # Save forecast to CSV
        forecast.to_csv('healthcare_demand_forecast.csv', index=False)
        print("Forecast saved to 'healthcare_demand_forecast.csv'")
        
        # Identify high-risk days
        high_risk_days = forecast[forecast['Spike_Probability'] > 0.7].groupby('Date')['Area'].apply(list).reset_index()
        if len(high_risk_days) > 0:
            print("\nHigh-risk days for healthcare demand spikes:")
            for _, row in high_risk_days.iterrows():
                print(f"{row['Date'].strftime('%Y-%m-%d')}: {', '.join(row['Area'])}")
        else:
            print("\nNo high-risk days identified in the forecast period.")
        
    except Exception as e:
        print(f"Error generating forecast: {e}")
        print("Please check that all required features are available in the dataset.")
    
    # Save models
    print("\nSaving trained models...")
    with open(f"{model_dir}/er_model.pkl", "wb") as f:
        pickle.dump(er_model, f)
    
    with open(f"{model_dir}/opd_model.pkl", "wb") as f:
        pickle.dump(opd_model, f)
    
    with open(f"{model_dir}/spike_model.pkl", "wb") as f:
        pickle.dump(stacking_model, f)
    
    with open(f"{model_dir}/area_models.pkl", "wb") as f:
        pickle.dump(area_models, f)
    
    with open(f"{model_dir}/area_results.pkl", "wb") as f:
        pickle.dump(area_results, f)
    
    with open(f"{model_dir}/optimal_threshold.pkl", "wb") as f:
        pickle.dump(optimal_threshold, f)
    
    print("Models saved successfully!")
    
    return er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold

# Function to load models
def load_models():
    global er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold
    
    print("Loading trained models...")
    with open(f"{model_dir}/er_model.pkl", "rb") as f:
        er_model = pickle.load(f)
    
    with open(f"{model_dir}/opd_model.pkl", "rb") as f:
        opd_model = pickle.load(f)
    
    with open(f"{model_dir}/spike_model.pkl", "rb") as f:
        stacking_model = pickle.load(f)
    
    with open(f"{model_dir}/area_models.pkl", "rb") as f:
        area_models = pickle.load(f)
    
    with open(f"{model_dir}/area_results.pkl", "rb") as f:
        area_results = pickle.load(f)
    
    with open(f"{model_dir}/optimal_threshold.pkl", "rb") as f:
        optimal_threshold = pickle.load(f)
    
    print("Models loaded successfully!")
    return er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold

# Check if models exist, otherwise train them
if models_exist():
    er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold = load_models()
else:
    er_model, opd_model, stacking_model, area_models, area_results, optimal_threshold = train_and_save_models()

# Create a simple Flask API
app = Flask(__name__)

# HTML template for the dashboard
dashboard_template = """
<!DOCTYPE html>
<html>
<head>
    <title>Healthcare Demand Prediction Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2c3e50; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { background: #f9f9f9; border-radius: 5px; padding: 15px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .warning { background: #ffe6e6; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        .high { color: red; font-weight: bold; }
        .medium { color: orange; }
        .low { color: green; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Mumbai Healthcare Demand Prediction Dashboard</h1>
        
        <div class="card">
            <h2>Current Status</h2>
            <p>Date: {{ current_date }}</p>
            <p>Last Model Update: {{ last_update }}</p>
        </div>
        
        {% if warnings|length > 0 %}
        <div class="card warning">
            <h2>⚠️ Early Warnings</h2>
            <table>
                <tr>
                    <th>Area</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Risk Level</th>
                </tr>
                {% for warning in warnings %}
                <tr>
                    <td>{{ warning.Area }}</td>
                    <td>{{ warning.Start_Date }}</td>
                    <td>{{ warning.End_Date }}</td>
                    <td>{{ warning.Duration }} days</td>
                    <td class="high">HIGH</td>
                </tr>
                {% endfor %}
            </table>
        </div>
        {% endif %}
        
        <div class="card">
            <h2>30-Day Forecast</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Area</th>
                    <th>Spike Probability</th>
                    <th>Predicted ER Visits</th>
                    <th>Predicted OPD Visits</th>
                    <th>Risk Level</th>
                </tr>
                {% for row in forecast %}
                <tr>
                    <td>{{ row.Date }}</td>
                    <td>{{ row.Area }}</td>
                    <td>{{ "%.2f"|format(row.Spike_Probability) }}</td>
                    <td>{{ "%.1f"|format(row.Predicted_ER_Visits) }}</td>
                    <td>{{ "%.1f"|format(row.Predicted_OPD_Visits) }}</td>
                    <td class="{% if row.Spike_Probability > 0.7 %}high{% elif row.Spike_Probability > 0.5 %}medium{% else %}low{% endif %}">
                        {% if row.Spike_Probability > 0.7 %}HIGH{% elif row.Spike_Probability > 0.5 %}MEDIUM{% else %}LOW{% endif %}
                    </td>
                </tr>
                {% endfor %}
            </table>
        </div>
    </div>
</body>
</html>
"""

@app.route('/')
def dashboard():
    try:
        # Load forecast data
        forecast_data = pd.read_csv('healthcare_demand_forecast.csv')
        # Ensure Date is properly converted to datetime first, then formatted
        forecast_data['Date'] = pd.to_datetime(forecast_data['Date'])
        forecast_data['Date'] = forecast_data['Date'].dt.strftime('%Y-%m-%d')
        
        # Get early warnings - make sure to convert Date to datetime first
        warnings_df = pd.read_csv('healthcare_demand_forecast.csv')
        warnings_df['Date'] = pd.to_datetime(warnings_df['Date'])
        warnings_df = generate_early_warnings(warnings_df)
        
        # Convert to list of dictionaries for the template
        forecast_rows = forecast_data.head(100).to_dict('records')  # Limit to first 100 rows for display
        warning_rows = warnings_df.to_dict('records')
        
        # Format dates in warnings
        for warning in warning_rows:
            if 'Start_Date' in warning:
                warning['Start_Date'] = warning['Start_Date'].strftime('%Y-%m-%d') if isinstance(warning['Start_Date'], datetime) else warning['Start_Date']
            if 'End_Date' in warning:
                warning['End_Date'] = warning['End_Date'].strftime('%Y-%m-%d') if isinstance(warning['End_Date'], datetime) else warning['End_Date']
        
        return render_template_string(
            dashboard_template,
            current_date=datetime.now().strftime('%Y-%m-%d'),
            last_update=datetime.now().strftime('%Y-%m-%d'),
            forecast=forecast_rows,
            warnings=warning_rows
        )
    except Exception as e:
        return f"Error loading forecast data: {str(e)}"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.json
        
        # Create a DataFrame from the input data
        input_df = pd.DataFrame([data])
        
        # Make sure date is in datetime format
        if 'Date' in input_df.columns:
            input_df['Date'] = pd.to_datetime(input_df['Date'])
        
        # Apply feature engineering
        input_df = advanced_feature_engineering(input_df)
        
        # Make predictions
        area = input_df['Area'].iloc[0] if 'Area' in input_df.columns else None
        
        # If area is specified and we have an area-specific model, use it
        if area and area in area_models:
            spike_prob = area_models[area].predict_proba(input_df.drop(['Date'], axis=1, errors='ignore'))[:, 1][0]
            threshold = area_results[area]['threshold']
            spike_pred = 1 if spike_prob >= threshold else 0
        else:
            # Use the general model
            spike_prob = stacking_model.predict_proba(input_df.drop(['Date'], axis=1, errors='ignore'))[:, 1][0]
            spike_pred = 1 if spike_prob >= optimal_threshold else 0
        
        # Predict ER and OPD visits
        er_pred = er_model.predict(input_df.drop(['Date'], axis=1, errors='ignore'))[0]
        opd_pred = opd_model.predict(input_df.drop(['Date'], axis=1, errors='ignore'))[0]
        
        # Return predictions
        return jsonify({
            'spike_probability': float(spike_prob),
            'spike_prediction': int(spike_pred),
            'er_visits_prediction': float(er_pred),
            'opd_visits_prediction': float(opd_pred)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/retrain', methods=['POST'])
def retrain_endpoint():
    try:
        # Get the path to new data from the request
        data = request.json
        new_data_path = data.get('new_data_path')
        
        if not new_data_path:
            return jsonify({'error': 'No new data path provided'})
        
        # Retrain models
        success = retrain_models(new_data_path)
        
        if success:
            return jsonify({'message': 'Models retrained successfully'})
        else:
            return jsonify({'error': 'Failed to retrain models'})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# Main function to run the API
def run_api():
    app.run(host='0.0.0.0', port=5001, debug=False)

# If this script is run directly, start the API server
if __name__ == "__main__":
    run_api()
