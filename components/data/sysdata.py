import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from scipy import stats

# Set random seed for reproducibility
np.random.seed(42)

# Define sample size
n_samples = 50000

# Create date range covering multiple years to capture seasonal patterns
start_date = datetime(2022, 1, 1)
end_date = datetime(2025, 4, 25)  # Current date
date_range = (end_date - start_date).days
random_dates = [start_date + timedelta(days=np.random.randint(0, date_range)) for _ in range(n_samples)]
random_dates.sort()  # Sort dates for time series analysis

# Generate demographic data with more diversity
age_distribution = np.concatenate([
    np.random.normal(5, 3, size=int(n_samples*0.1)),    # Children
    np.random.normal(25, 7, size=int(n_samples*0.25)),  # Young adults
    np.random.normal(45, 10, size=int(n_samples*0.35)), # Middle-aged
    np.random.normal(72, 8, size=int(n_samples*0.3))    # Elderly
])
np.random.shuffle(age_distribution)
ages = np.clip(age_distribution, 0, 105).astype(int)[:n_samples]

# More diverse gender distribution
genders = np.random.choice(['Male', 'Female', 'Non-binary'], 
                          size=n_samples, 
                          p=[0.48, 0.48, 0.04])

# Generate more diverse location data (fictional zip codes by region)
regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West']
region_distribution = np.random.choice(regions, size=n_samples, p=[0.2, 0.25, 0.2, 0.15, 0.2])

# Create zip codes that correlate with regions
zip_codes = []
for region in region_distribution:
    if region == 'Northeast':
        zip_codes.append(np.random.randint(1000, 29999))
    elif region == 'Southeast':
        zip_codes.append(np.random.randint(30000, 39999))
    elif region == 'Midwest':
        zip_codes.append(np.random.randint(40000, 59999))
    elif region == 'Southwest':
        zip_codes.append(np.random.randint(70000, 79999))
    else:  # West
        zip_codes.append(np.random.randint(80000, 99999))

# Generate more diverse socioeconomic status (SES) as SDOH factor
ses_categories = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High']
# Create SES distribution that correlates with region (some regions have different SES distributions)
ses = []
for region in region_distribution:
    if region == 'Northeast':
        ses.append(np.random.choice(ses_categories, p=[0.15, 0.2, 0.3, 0.2, 0.15]))
    elif region == 'Southeast':
        ses.append(np.random.choice(ses_categories, p=[0.25, 0.3, 0.25, 0.15, 0.05]))
    elif region == 'Midwest':
        ses.append(np.random.choice(ses_categories, p=[0.2, 0.25, 0.3, 0.15, 0.1]))
    elif region == 'Southwest':
        ses.append(np.random.choice(ses_categories, p=[0.3, 0.25, 0.2, 0.15, 0.1]))
    else:  # West
        ses.append(np.random.choice(ses_categories, p=[0.15, 0.2, 0.25, 0.25, 0.15]))

# Generate more diverse insurance status
insurance_types = ['Private', 'Medicare', 'Medicaid', 'Military', 'Uninsured']
# Insurance distribution correlates with SES
insurance = []
for s in ses:
    if s == 'Low':
        insurance.append(np.random.choice(insurance_types, p=[0.1, 0.2, 0.4, 0.05, 0.25]))
    elif s == 'Medium-Low':
        insurance.append(np.random.choice(insurance_types, p=[0.3, 0.25, 0.25, 0.05, 0.15]))
    elif s == 'Medium':
        insurance.append(np.random.choice(insurance_types, p=[0.5, 0.2, 0.15, 0.05, 0.1]))
    elif s == 'Medium-High':
        insurance.append(np.random.choice(insurance_types, p=[0.7, 0.1, 0.05, 0.1, 0.05]))
    else:  # High
        insurance.append(np.random.choice(insurance_types, p=[0.8, 0.05, 0.02, 0.1, 0.03]))

# Determine season based on date
def get_season(date):
    month = date.month
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Spring'
    elif month in [6, 7, 8]:
        return 'Summer'
    else:
        return 'Fall'

seasons = [get_season(date) for date in random_dates]

# Generate weather data with more realistic patterns
temperature = []
precipitation = []
for i, date in enumerate(random_dates):
    season = seasons[i]
    region = region_distribution[i]
    
    # Base temperature by season and region
    if season == 'Winter':
        if region in ['Northeast', 'Midwest']:
            base_temp = np.random.normal(-5, 8)
        elif region == 'Southeast':
            base_temp = np.random.normal(10, 5)
        elif region == 'Southwest':
            base_temp = np.random.normal(15, 7)
        else:  # West
            base_temp = np.random.normal(8, 10)  # More variable in the West
    elif season == 'Spring':
        if region in ['Northeast', 'Midwest']:
            base_temp = np.random.normal(15, 7)
        elif region == 'Southeast':
            base_temp = np.random.normal(22, 5)
        elif region == 'Southwest':
            base_temp = np.random.normal(25, 6)
        else:  # West
            base_temp = np.random.normal(18, 8)
    elif season == 'Summer':
        if region in ['Northeast', 'Midwest']:
            base_temp = np.random.normal(28, 5)
        elif region == 'Southeast':
            base_temp = np.random.normal(32, 4)
        elif region == 'Southwest':
            base_temp = np.random.normal(38, 5)
        else:  # West
            base_temp = np.random.normal(30, 8)
    else:  # Fall
        if region in ['Northeast', 'Midwest']:
            base_temp = np.random.normal(15, 7)
        elif region == 'Southeast':
            base_temp = np.random.normal(20, 6)
        elif region == 'Southwest':
            base_temp = np.random.normal(25, 7)
        else:  # West
            base_temp = np.random.normal(20, 9)
    
    temperature.append(base_temp)
    
    # Precipitation patterns by region and season
    if region == 'Northeast':
        if season in ['Spring', 'Fall']:
            precip = np.random.gamma(2, 2)
        elif season == 'Winter':
            precip = np.random.gamma(1.5, 1.5)
        else:
            precip = np.random.gamma(1, 3)
    elif region == 'Southeast':
        if season in ['Summer', 'Spring']:
            precip = np.random.gamma(2, 3)
        else:
            precip = np.random.gamma(1, 2)
    elif region == 'Midwest':
        if season == 'Summer':
            precip = np.random.gamma(2, 2.5)
        else:
            precip = np.random.gamma(1, 1.5)
    elif region == 'Southwest':
        precip = np.random.gamma(0.5, 1)  # Generally dry
    else:  # West
        if season == 'Winter':
            precip = np.random.gamma(2, 2)
        else:
            precip = np.random.gamma(0.5, 1)
    
    precipitation.append(min(precip, 15))  # Cap extreme values

# Generate air quality index (AQI) - important for respiratory conditions
aqi = []
for i, date in enumerate(random_dates):
    season = seasons[i]
    region = region_distribution[i]
    
    # Base AQI by season and region
    if region == 'West' and season in ['Summer', 'Fall']:
        # Higher AQI in West during wildfire season
        base_aqi = np.random.gamma(10, 10)
    elif region in ['Northeast', 'Midwest'] and season in ['Summer']:
        base_aqi = np.random.gamma(8, 7)
    elif region == 'Southwest' and season in ['Spring', 'Summer']:
        base_aqi = np.random.gamma(7, 8)
    else:
        base_aqi = np.random.gamma(5, 5)
    
    aqi.append(min(base_aqi, 300))  # Cap at hazardous level

# Generate pollen count - important for allergies
pollen_count = []
for i, date in enumerate(random_dates):
    season = seasons[i]
    
    if season == 'Spring':
        base_pollen = np.random.gamma(10, 30)
    elif season == 'Summer':
        base_pollen = np.random.gamma(8, 20)
    elif season == 'Fall':
        base_pollen = np.random.gamma(5, 15)
    else:  # Winter
        base_pollen = np.random.gamma(1, 5)
    
    pollen_count.append(min(base_pollen, 1000))  # Cap extreme values

# Generate comorbidity data
has_diabetes = np.random.binomial(1, 0.11, size=n_samples)  # ~11% prevalence
has_hypertension = np.random.binomial(1, 0.33, size=n_samples)  # ~33% prevalence
has_asthma = np.random.binomial(1, 0.08, size=n_samples)  # ~8% prevalence
has_copd = np.random.binomial(1, 0.06, size=n_samples)  # ~6% prevalence
has_heart_disease = np.random.binomial(1, 0.12, size=n_samples)  # ~12% prevalence

# Adjust comorbidities based on age (older people more likely to have chronic conditions)
for i in range(n_samples):
    age_factor = min(1.0, ages[i] / 65)
    
    if ages[i] > 50:
        has_diabetes[i] = has_diabetes[i] or np.random.binomial(1, 0.15 * age_factor)
        has_hypertension[i] = has_hypertension[i] or np.random.binomial(1, 0.4 * age_factor)
        has_heart_disease[i] = has_heart_disease[i] or np.random.binomial(1, 0.2 * age_factor)
        has_copd[i] = has_copd[i] or np.random.binomial(1, 0.1 * age_factor)

# Generate flu season indicator
is_flu_season = []
for date in random_dates:
    # Flu season typically runs from October to March
    if date.month >= 10 or date.month <= 3:
        is_flu_season.append(1)
    else:
        is_flu_season.append(0)

# Generate holiday/special event indicator
is_holiday = []
for date in random_dates:
    # Major US holidays and periods
    if (date.month == 1 and date.day == 1) or \
       (date.month == 12 and date.day >= 23 and date.day <= 31) or \
       (date.month == 7 and date.day == 4) or \
       (date.month == 11 and date.day >= 22 and date.day <= 28) or \
       (date.month == 5 and date.day >= 25 and date.day <= 31):
        is_holiday.append(1)
    else:
        is_holiday.append(0)

# Generate distance to nearest hospital (miles) - SDOH factor
distance_to_hospital = []
for s in ses:
    if s == 'Low':
        distance_to_hospital.append(max(0.5, np.random.gamma(3, 2)))
    elif s == 'Medium-Low':
        distance_to_hospital.append(max(0.5, np.random.gamma(2, 1.5)))
    elif s == 'Medium':
        distance_to_hospital.append(max(0.5, np.random.gamma(1.5, 1)))
    elif s == 'Medium-High':
        distance_to_hospital.append(max(0.5, np.random.gamma(1, 1)))
    else:  # High
        distance_to_hospital.append(max(0.5, np.random.gamma(1, 0.8)))

# Generate access to primary care (binary) - SDOH factor
has_primary_care = []
for i, s in enumerate(ses):
    if s == 'Low':
        has_primary_care.append(np.random.binomial(1, 0.6))
    elif s == 'Medium-Low':
        has_primary_care.append(np.random.binomial(1, 0.75))
    elif s == 'Medium':
        has_primary_care.append(np.random.binomial(1, 0.85))
    elif s == 'Medium-High':
        has_primary_care.append(np.random.binomial(1, 0.9))
    else:  # High
        has_primary_care.append(np.random.binomial(1, 0.95))

# Generate transportation access (binary) - SDOH factor
has_transportation = []
for i, s in enumerate(ses):
    if s == 'Low':
        has_transportation.append(np.random.binomial(1, 0.7))
    elif s == 'Medium-Low':
        has_transportation.append(np.random.binomial(1, 0.8))
    elif s == 'Medium':
        has_transportation.append(np.random.binomial(1, 0.9))
    elif s == 'Medium-High':
        has_transportation.append(np.random.binomial(1, 0.95))
    else:  # High
        has_transportation.append(np.random.binomial(1, 0.98))

# Calculate synthetic healthcare demand data
# This is where we model the complex relationships between all factors

# Base rates
er_base_rate = 0.5
opd_base_rate = 1.2
admission_base_rate = 0.25

# Calculate modifiers and generate healthcare utilization metrics
er_visits = []
opd_visits = []
admission_rate = []
los_days = []

for i in range(n_samples):
    # Season and weather modifiers
    season_mod_er = 1.0
    season_mod_opd = 1.0
    
    # Flu season effect
    if is_flu_season[i]:
        season_mod_er *= 1.4
        season_mod_opd *= 1.3
    
    # Temperature effects (extreme temperatures increase visits)
    if temperature[i] > 32:  # Heat effect
        temp_mod_er = 1.0 + min(1.0, (temperature[i] - 32) / 10)  # Increases with temperature
        # Elderly more affected by heat
        if ages[i] > 65:
            temp_mod_er *= 1.5
    elif temperature[i] < 0:  # Cold effect
        temp_mod_er = 1.0 + min(1.0, abs(temperature[i]) / 10)  # Increases with cold
    else:
        temp_mod_er = 1.0
    
    # AQI effect on respiratory conditions
    if aqi[i] > 100:  # Unhealthy air quality
        aqi_mod = 1.0 + min(1.0, (aqi[i] - 100) / 100)
        # Stronger effect on people with respiratory conditions
        if has_asthma[i] or has_copd[i]:
            aqi_mod *= 1.5
    else:
        aqi_mod = 1.0
    
    # Pollen effect on allergies and asthma
    if pollen_count[i] > 200:  # High pollen
        if has_asthma[i]:
            pollen_mod = 1.3
        else:
            pollen_mod = 1.1
    else:
        pollen_mod = 1.0
    
    # Age modifier
    if ages[i] < 5 or ages[i] > 75:
        age_mod = 1.4  # Higher utilization for very young and elderly
    elif ages[i] < 18:
        age_mod = 1.1
    elif ages[i] > 65:
        age_mod = 1.3
    else:
        age_mod = 1.0
    
    # Comorbidity modifier
    comorbidity_count = has_diabetes[i] + has_hypertension[i] + has_asthma[i] + has_copd[i] + has_heart_disease[i]
    comorbidity_mod = 1.0 + (comorbidity_count * 0.15)
    
    # SDOH modifiers
    # Distance to hospital affects ER use
    if distance_to_hospital[i] > 5:
        distance_mod = 0.9  # Reduced use if far away
    else:
        distance_mod = 1.0
    
    # Primary care access reduces ER use but increases OPD
    if has_primary_care[i]:
        primary_care_mod_er = 0.8
        primary_care_mod_opd = 1.2
    else:
        primary_care_mod_er = 1.2
        primary_care_mod_opd = 0.9
    
    # Transportation access
    if not has_transportation[i]:
        transport_mod = 0.8  # Harder to get to healthcare
    else:
        transport_mod = 1.0
    
    # SES modifier
    if ses[i] == 'Low':
        ses_mod_er = 1.3  # Higher ER use for low SES
        ses_mod_opd = 0.8  # Lower OPD use for low SES
    elif ses[i] == 'Medium-Low':
        ses_mod_er = 1.1
        ses_mod_opd = 0.9
    elif ses[i] == 'Medium':
        ses_mod_er = 1.0
        ses_mod_opd = 1.0
    elif ses[i] == 'Medium-High':
        ses_mod_er = 0.9
        ses_mod_opd = 1.1
    else:  # High
        ses_mod_er = 0.8
        ses_mod_opd = 1.2
    
    # Holiday effect (higher ER use during holidays)
    if is_holiday[i]:
        holiday_mod_er = 1.2
    else:
        holiday_mod_er = 1.0
    
    # Calculate final rates with all modifiers
    er_rate = er_base_rate * season_mod_er * temp_mod_er * aqi_mod * pollen_mod * age_mod * \
              comorbidity_mod * distance_mod * primary_care_mod_er * transport_mod * ses_mod_er * holiday_mod_er
    
    opd_rate = opd_base_rate * season_mod_opd * age_mod * comorbidity_mod * \
               primary_care_mod_opd * transport_mod * ses_mod_opd
    
    # Generate visit counts using Poisson distribution
    er_visits.append(np.random.poisson(er_rate))
    opd_visits.append(np.random.poisson(opd_rate))
    
    # Calculate admission probability based on ER visits and patient factors
    if er_visits[i] > 0:
        admission_prob = admission_base_rate * age_mod * comorbidity_mod
        admission_rate.append(np.random.binomial(1, admission_prob))
        
        # Calculate length of stay if admitted
        if admission_rate[i] > 0:
            base_los = 3 + (comorbidity_count * 0.5)
            los_days.append(max(1, np.random.poisson(base_los)))
        else:
            los_days.append(0)
    else:
        admission_rate.append(0)
        los_days.append(0)

# Create DataFrame
synthetic_data = pd.DataFrame({
    'Date': random_dates,
    'Age': ages,
    'Gender': genders,
    'Region': region_distribution,
    'ZipCode': zip_codes,
    'SES': ses,
    'Insurance': insurance,
    'Season': seasons,
    'Temperature': temperature,
    'Precipitation': precipitation,
    'AQI': aqi,
    'PollenCount': pollen_count,
    'HasDiabetes': has_diabetes,
    'HasHypertension': has_hypertension,
    'HasAsthma': has_asthma,
    'HasCOPD': has_copd,
    'HasHeartDisease': has_heart_disease,
    'IsFluSeason': is_flu_season,
    'IsHoliday': is_holiday,
    'DistanceToHospital': distance_to_hospital,
    'HasPrimaryCare': has_primary_care,
    'HasTransportation': has_transportation,
    'ER_Visits': er_visits,
    'OPD_Visits': opd_visits,
    'Admission': admission_rate,
    'LOS_Days': los_days
})

# Sort by date for time series analysis
synthetic_data = synthetic_data.sort_values('Date').reset_index(drop=True)

# Add day of week and month features for time series analysis
synthetic_data['DayOfWeek'] = synthetic_data['Date'].dt.dayofweek
synthetic_data['Month'] = synthetic_data['Date'].dt.month
synthetic_data['Year'] = synthetic_data['Date'].dt.year

# Display the first few rows and summary statistics
print(synthetic_data.head())
print("\nDataset Shape:", synthetic_data.shape)
print("\nSummary Statistics:")
print(synthetic_data.describe())

# Save to CSV
synthetic_data.to_csv('synthetic_healthcare_demand_dataset.csv', index=False)

print("\nSynthetic healthcare demand dataset with 50,000 records created successfully!")
