import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from scipy import stats

# Set random seed for reproducibility
np.random.seed(42)

# Define larger sample size
n_samples = 200000  # Increased from 50,000 to 200,000

# Create date range covering multiple years to capture seasonal patterns
start_date = datetime(2022, 1, 1)
end_date = datetime(2025, 4, 26)  # Current date
date_range = (end_date - start_date).days
random_dates = [start_date + timedelta(days=np.random.randint(0, date_range)) for _ in range(n_samples)]
random_dates.sort()  # Sort dates for time series analysis

print("Generating Mumbai healthcare synthetic dataset...")

# Generate demographic data based on Mumbai's population statistics
# Age distribution
age_distribution = np.concatenate([
    np.random.normal(5, 3, size=int(n_samples*0.1)),    # Children (10%)
    np.random.normal(25, 7, size=int(n_samples*0.25)),  # Young adults (25%)
    np.random.normal(45, 10, size=int(n_samples*0.35)), # Middle-aged (35%)
    np.random.normal(72, 8, size=int(n_samples*0.3))    # Elderly (30%)
])
np.random.shuffle(age_distribution)
ages = np.clip(age_distribution, 0, 105).astype(int)[:n_samples]

# Gender distribution with recognition of non-binary individuals (4%)
genders = np.random.choice(['Male', 'Female', 'Non-binary'], 
                          size=n_samples, 
                          p=[0.48, 0.48, 0.04])

# Mumbai-specific geographic areas
areas = ['South Mumbai', 'Western Suburbs', 'Eastern Suburbs', 'Navi Mumbai', 'Thane']
area_distribution = np.random.choice(areas, size=n_samples, p=[0.15, 0.35, 0.2, 0.15, 0.15])

# Create PIN codes that correlate with areas (actual Mumbai PIN codes)
pin_codes = []
for area in area_distribution:
    if area == 'South Mumbai':
        pin_codes.append(np.random.randint(400001, 400020))
    elif area == 'Western Suburbs':
        pin_codes.append(np.random.randint(400050, 400090))
    elif area == 'Eastern Suburbs':
        pin_codes.append(np.random.randint(400070, 400099))
    elif area == 'Navi Mumbai':
        pin_codes.append(np.random.randint(400700, 400710))
    else:  # Thane
        pin_codes.append(np.random.randint(400600, 400612))

# Slum dwelling indicator - approximately 40% of Mumbai's population lives in slums
is_slum_dwelling = []
for area in area_distribution:
    if area == 'South Mumbai':
        is_slum_dwelling.append(np.random.binomial(1, 0.25))  # 25% in slums
    elif area in ['Western Suburbs', 'Eastern Suburbs']:
        is_slum_dwelling.append(np.random.binomial(1, 0.45))  # 45% in slums
    else:  # Navi Mumbai, Thane
        is_slum_dwelling.append(np.random.binomial(1, 0.35))  # 35% in slums

# Generate socioeconomic status (SES) as SDOH factor
ses_categories = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High']
# Create SES distribution that correlates with area and slum dwelling
ses = []
for i, area in enumerate(area_distribution):
    if is_slum_dwelling[i]:
        ses.append(np.random.choice(ses_categories, p=[0.6, 0.3, 0.1, 0.0, 0.0]))
    elif area == 'South Mumbai':
        ses.append(np.random.choice(ses_categories, p=[0.1, 0.15, 0.25, 0.25, 0.25]))
    elif area == 'Western Suburbs':
        ses.append(np.random.choice(ses_categories, p=[0.15, 0.2, 0.3, 0.2, 0.15]))
    elif area == 'Eastern Suburbs':
        ses.append(np.random.choice(ses_categories, p=[0.2, 0.25, 0.3, 0.15, 0.1]))
    elif area == 'Navi Mumbai':
        ses.append(np.random.choice(ses_categories, p=[0.15, 0.2, 0.35, 0.2, 0.1]))
    else:  # Thane
        ses.append(np.random.choice(ses_categories, p=[0.2, 0.25, 0.3, 0.15, 0.1]))

# Generate insurance status - 73% of surveyed households did not have health insurance
insurance_types = ['Private', 'Government', 'Employer', 'None']
# Insurance distribution correlates with SES
insurance = []
for s in ses:
    if s == 'Low':
        insurance.append(np.random.choice(insurance_types, p=[0.05, 0.15, 0.05, 0.75]))
    elif s == 'Medium-Low':
        insurance.append(np.random.choice(insurance_types, p=[0.1, 0.15, 0.1, 0.65]))
    elif s == 'Medium':
        insurance.append(np.random.choice(insurance_types, p=[0.2, 0.1, 0.15, 0.55]))
    elif s == 'Medium-High':
        insurance.append(np.random.choice(insurance_types, p=[0.4, 0.05, 0.2, 0.35]))
    else:  # High
        insurance.append(np.random.choice(insurance_types, p=[0.6, 0.02, 0.18, 0.2]))

# Determine season based on Mumbai's climate
def get_mumbai_season(date):
    month = date.month
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4, 5]:
        return 'Summer'
    elif month in [6, 7, 8, 9]:
        return 'Monsoon'
    else:
        return 'Post-Monsoon'

seasons = [get_mumbai_season(d) for d in random_dates]

# Generate weather data based on Mumbai's climate patterns
temperature = []
precipitation = []
humidity = []
for i, date in enumerate(random_dates):
    month = date.month
    
    # Temperature patterns based on Mumbai's climate data
    if month == 1:  # January
        temp = np.random.normal(23.9, 3.3)
    elif month == 2:  # February
        temp = np.random.normal(25.4, 3.4)
    elif month == 3:  # March
        temp = np.random.normal(27.5, 3.0)
    elif month == 4:  # April
        temp = np.random.normal(28.6, 2.7)
    elif month == 5:  # May
        temp = np.random.normal(29.7, 2.1)
    elif month == 6:  # June
        temp = np.random.normal(28.4, 1.8)
    elif month == 7:  # July
        temp = np.random.normal(26.7, 0.9)
    elif month == 8:  # August
        temp = np.random.normal(26.3, 1.1)
    elif month == 9:  # September
        temp = np.random.normal(26.9, 1.8)
    elif month == 10:  # October
        temp = np.random.normal(28.8, 2.6)
    elif month == 11:  # November
        temp = np.random.normal(27.4, 3.0)
    else:  # December
        temp = np.random.normal(24.1, 3.3)
    
    temperature.append(temp)
    
    # Precipitation patterns based on Mumbai's monsoon
    if month in [6, 7, 8, 9]:  # Monsoon season (June-September)
        if month == 7:  # July is wettest
            daily_precip_chance = 0.8
            precip_amount = np.random.gamma(5, 6)
            # Occasionally have extreme rainfall events
            if np.random.random() < 0.05:
                precip_amount = np.random.gamma(15, 10)  # Heavy rainfall events
        elif month == 8:  # August also very wet
            daily_precip_chance = 0.75
            precip_amount = np.random.gamma(4, 5)
        elif month == 6:  # June (beginning of monsoon)
            daily_precip_chance = 0.6
            precip_amount = np.random.gamma(3, 4)
        else:  # September (end of monsoon)
            daily_precip_chance = 0.5
            precip_amount = np.random.gamma(2, 3)
            
        if np.random.random() < daily_precip_chance:
            precipitation.append(precip_amount)
        else:
            precipitation.append(0)
    elif month in [5, 10]:  # Pre and post monsoon
        if np.random.random() < 0.3:
            precipitation.append(np.random.gamma(1, 2))
        else:
            precipitation.append(0)
    else:  # Dry season (November-April)
        if np.random.random() < 0.05:  # Rare rainfall in dry season
            precipitation.append(np.random.gamma(0.5, 1))
        else:
            precipitation.append(0)
    
    # Humidity patterns based on Mumbai's climate
    if month == 1:  # January
        humidity.append(np.random.normal(62, 5))
    elif month == 2:  # February
        humidity.append(np.random.normal(65, 5))
    elif month == 3:  # March
        humidity.append(np.random.normal(67, 5))
    elif month == 4:  # April
        humidity.append(np.random.normal(70, 5))
    elif month == 5:  # May
        humidity.append(np.random.normal(73, 5))
    elif month == 6:  # June
        humidity.append(np.random.normal(80, 5))
    elif month == 7:  # July
        humidity.append(np.random.normal(86, 3))
    elif month == 8:  # August
        humidity.append(np.random.normal(85, 3))
    elif month == 9:  # September
        humidity.append(np.random.normal(82, 4))
    elif month == 10:  # October
        humidity.append(np.random.normal(75, 5))
    elif month == 11:  # November
        humidity.append(np.random.normal(68, 5))
    else:  # December
        humidity.append(np.random.normal(64, 5))
    
    # Cap humidity between 30-100%
    humidity[i] = max(30, min(100, humidity[i]))

# Generate air quality index (AQI) specific to Mumbai
aqi = []
for i, date in enumerate(random_dates):
    month = date.month
    
    # AQI is generally moderate in Mumbai (50-100)
    # Higher in winter months due to less dispersion
    if month in [11, 12, 1, 2]:  # Winter months
        base_aqi = np.random.gamma(9, 15)  # Higher AQI in winter (120-150 range)
    elif month in [3, 4]:  # Pre-monsoon
        base_aqi = np.random.gamma(7, 12)  # Moderate to poor (80-120 range)
    elif month in [6, 7, 8, 9]:  # Monsoon
        base_aqi = np.random.gamma(4, 10)  # Better AQI during monsoon (40-80 range)
    else:
        base_aqi = np.random.gamma(6, 12)  # Moderate (70-100 range)
    
    aqi.append(min(base_aqi, 300))  # Cap at hazardous level

# Generate pollen count - Mumbai has specific pollen patterns
pollen_count = []
for i, date in enumerate(random_dates):
    month = date.month
    
    # Mumbai has lower pollen counts during monsoon, higher in winter/spring
    if month in [1, 2, 3]:  # Winter/early spring - flowering season
        base_pollen = np.random.gamma(5, 15)
    elif month in [4, 5]:  # Late spring/early summer
        base_pollen = np.random.gamma(3, 10)
    elif month in [6, 7, 8, 9]:  # Monsoon - pollen washed away
        base_pollen = np.random.gamma(1, 5)
    else:  # Post-monsoon
        base_pollen = np.random.gamma(2, 8)
    
    pollen_count.append(min(base_pollen, 200))  # Cap extreme values

# Generate cyclone/extreme weather event indicator for Mumbai
# Mumbai cyclone risk is highest in May-June (pre-monsoon) and October-November (post-monsoon)
is_cyclone_risk = []
for date in random_dates:
    month = date.month
    # Cyclone risk periods: May-June and October-November
    if month in [5, 6, 10, 11]:
        is_cyclone_risk.append(np.random.binomial(1, 0.05))  # 5% chance during risk periods
    else:
        is_cyclone_risk.append(0)

# Generate flu season indicator for Mumbai (typically coincides with winter)
is_flu_season = []
for date in random_dates:
    # Flu season in Mumbai typically runs from November to February
    if date.month in [11, 12, 1, 2]:
        is_flu_season.append(1)
    else:
        is_flu_season.append(0)

# Generate vector-borne disease risk indicator (higher during monsoon)
is_vector_disease_risk = []
for date in random_dates:
    if date.month in [6, 7, 8, 9, 10]:  # Monsoon and post-monsoon
        is_vector_disease_risk.append(np.random.binomial(1, 0.15))  # 15% chance during monsoon
    else:
        is_vector_disease_risk.append(np.random.binomial(1, 0.03))  # 3% chance other times

# Generate comorbidity data based on Mumbai's health statistics
# 60% of Mumbaikars struggle with weight issues
is_overweight = np.random.binomial(1, 0.46, size=n_samples)  # 46% overweight
is_obese = np.random.binomial(1, 0.12, size=n_samples)  # 12% obese

# Diabetes - 18% of Mumbaikars aged 18-69 have diabetes
has_diabetes = []
for i, age in enumerate(ages):
    if age < 18:
        has_diabetes.append(0)
    elif age >= 18 and age < 35:
        has_diabetes.append(np.random.binomial(1, 0.05))  # 5% in younger adults
    elif age >= 35 and age < 50:
        has_diabetes.append(np.random.binomial(1, 0.15))  # 15% in middle-aged
    else:
        has_diabetes.append(np.random.binomial(1, 0.25))  # 25% in older adults
    
    # Adjust for obesity/overweight
    if has_diabetes[i] == 0 and (is_overweight[i] or is_obese[i]):
        has_diabetes[i] = np.random.binomial(1, 0.2)  # Higher chance if overweight/obese

# Hypertension - 26% of Mumbai's adult population
has_hypertension = []
for i, age in enumerate(ages):
    if age < 18:
        has_hypertension.append(0)
    elif age >= 18 and age < 35:
        has_hypertension.append(np.random.binomial(1, 0.1))  # 10% in younger adults
    elif age >= 35 and age < 50:
        has_hypertension.append(np.random.binomial(1, 0.25))  # 25% in middle-aged
    else:
        has_hypertension.append(np.random.binomial(1, 0.4))  # 40% in older adults
    
    # Adjust for obesity/overweight
    if has_hypertension[i] == 0 and (is_overweight[i] or is_obese[i]):
        has_hypertension[i] = np.random.binomial(1, 0.3)  # Higher chance if overweight/obese

# Asthma - rising in Mumbai, especially in children
has_asthma = []
for i, age in enumerate(ages):
    if age < 18:
        has_asthma.append(np.random.binomial(1, 0.15))  # 15% in children (increased rate)
    else:
        has_asthma.append(np.random.binomial(1, 0.09))  # 9% in adults

# COPD
has_copd = []
for i, age in enumerate(ages):
    if age < 18:
        has_copd.append(0)  # No COPD in children
    elif age >= 18 and age < 40:
        has_copd.append(np.random.binomial(1, 0.02))  # 2% in young adults
    elif age >= 40 and age < 60:
        has_copd.append(np.random.binomial(1, 0.05))  # 5% in middle-aged
    else:
        has_copd.append(np.random.binomial(1, 0.1))  # 10% in older adults

# Heart disease
has_heart_disease = []
for i, age in enumerate(ages):
    if age < 18:
        has_heart_disease.append(0)  # No heart disease in children
    elif age >= 18 and age < 40:
        has_heart_disease.append(np.random.binomial(1, 0.02))  # 2% in young adults
    elif age >= 40 and age < 60:
        has_heart_disease.append(np.random.binomial(1, 0.1))  # 10% in middle-aged
    else:
        has_heart_disease.append(np.random.binomial(1, 0.2))  # 20% in older adults
    
    # Adjust for diabetes and hypertension
    if has_heart_disease[i] == 0 and (has_diabetes[i] or has_hypertension[i]):
        has_heart_disease[i] = np.random.binomial(1, 0.15)  # Higher chance with comorbidities

# Generate holiday/festival indicator (Indian holidays)
is_holiday = []
for date in random_dates:
    # Major Indian holidays and periods
    if (date.month == 1 and date.day == 26) or \
       (date.month == 8 and date.day == 15) or \
       (date.month == 10 and date.day >= 15 and date.day <= 25) or \
       (date.month == 9 and date.day >= 1 and date.day <= 10) or \
       (date.month == 3 and date.day >= 15 and date.day <= 20) or \
       (date.month == 4 and date.day >= 10 and date.day <= 15):
        is_holiday.append(1)
    else:
        is_holiday.append(0)

# Generate distance to nearest hospital (km) - SDOH factor
distance_to_hospital = []
for i, area in enumerate(area_distribution):
    if area == 'South Mumbai':
        base_dist = 1.5
    elif area == 'Western Suburbs':
        base_dist = 2.5
    elif area == 'Eastern Suburbs':
        base_dist = 3.0
    elif area == 'Navi Mumbai':
        base_dist = 3.5
    else:  # Thane
        base_dist = 4.0
        
    if ses[i] == 'Low':
        distance_to_hospital.append(max(0.5, np.random.gamma(base_dist, 1.5)))
    elif ses[i] == 'Medium-Low':
        distance_to_hospital.append(max(0.5, np.random.gamma(base_dist, 1.2)))
    elif ses[i] == 'Medium':
        distance_to_hospital.append(max(0.5, np.random.gamma(base_dist, 1.0)))
    elif ses[i] == 'Medium-High':
        distance_to_hospital.append(max(0.5, np.random.gamma(base_dist * 0.8, 0.8)))
    else:  # High
        distance_to_hospital.append(max(0.5, np.random.gamma(base_dist * 0.6, 0.6)))

# Generate access to primary care (binary) - SDOH factor
has_primary_care = []
for i, s in enumerate(ses):
    if is_slum_dwelling[i]:
        base_access = 0.5  # Lower access in slums
    else:
        base_access = 0.7  # Higher access in non-slums
        
    if s == 'Low':
        has_primary_care.append(np.random.binomial(1, base_access * 0.6))
    elif s == 'Medium-Low':
        has_primary_care.append(np.random.binomial(1, base_access * 0.7))
    elif s == 'Medium':
        has_primary_care.append(np.random.binomial(1, base_access * 0.8))
    elif s == 'Medium-High':
        has_primary_care.append(np.random.binomial(1, base_access * 0.9))
    else:  # High
        has_primary_care.append(np.random.binomial(1, base_access))

# Generate transportation access (binary) - SDOH factor
has_transportation = []
for i, s in enumerate(ses):
    area = area_distribution[i]
    # Mumbai has good public transport overall, but varies by area and SES
    if area == 'South Mumbai':
        base_prob = 0.9
    elif area in ['Western Suburbs', 'Eastern Suburbs']:
        base_prob = 0.85
    elif area == 'Navi Mumbai':
        base_prob = 0.8
    else:  # Thane
        base_prob = 0.75
        
    if s == 'Low':
        has_transportation.append(np.random.binomial(1, base_prob * 0.8))
    elif s == 'Medium-Low':
        has_transportation.append(np.random.binomial(1, base_prob * 0.9))
    elif s == 'Medium':
        has_transportation.append(np.random.binomial(1, base_prob * 0.95))
    elif s == 'Medium-High':
        has_transportation.append(np.random.binomial(1, base_prob * 0.98))
    else:  # High
        has_transportation.append(np.random.binomial(1, base_prob))

# Calculate synthetic healthcare demand data
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
        season_mod_er *= 1.3
        season_mod_opd *= 1.2
    
    # Vector-borne disease effect (dengue, malaria)
    if is_vector_disease_risk[i]:
        season_mod_er *= 1.4
        season_mod_opd *= 1.3
    
    # Cyclone/extreme weather effect
    if is_cyclone_risk[i]:
        season_mod_er *= 1.5  # Significant increase during cyclone risk periods
    
    # Temperature effects (extreme temperatures increase visits)
    if temperature[i] > 32:  # Heat effect - common in Mumbai summers
        temp_mod_er = 1.0 + min(1.0, (temperature[i] - 32) / 8)  # Increases with temperature
        # Elderly more affected by heat
        if ages[i] > 65:
            temp_mod_er *= 1.6
    else:
        temp_mod_er = 1.0
    
    # Humidity effect - high humidity can exacerbate heat stress
    if humidity[i] > 80 and temperature[i] > 30:
        humidity_mod = 1.2  # High humidity + high temp increases visits
    else:
        humidity_mod = 1.0
    
    # AQI effect on respiratory conditions
    if aqi[i] > 100:  # Unhealthy air quality
        aqi_mod = 1.0 + min(1.0, (aqi[i] - 100) / 100)
        # Stronger effect on people with respiratory conditions
        if has_asthma[i] or has_copd[i]:
            aqi_mod *= 1.5
    else:
        aqi_mod = 1.0
    
    # Pollen effect on allergies and asthma
    if pollen_count[i] > 100:  # High pollen
        if has_asthma[i]:
            pollen_mod = 1.3
        else:
            pollen_mod = 1.1
    else:
        pollen_mod = 1.0
    
    # Heavy rainfall effect - flooding, water-borne diseases
    if precipitation[i] > 50:  # Heavy rainfall day
        rain_mod = 1.3
    elif precipitation[i] > 20:  # Moderate rainfall
        rain_mod = 1.1
    else:
        rain_mod = 1.0
    
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
    er_rate = er_base_rate * season_mod_er * temp_mod_er * humidity_mod * aqi_mod * pollen_mod * \
              rain_mod * age_mod * comorbidity_mod * distance_mod * primary_care_mod_er * \
              transport_mod * ses_mod_er * holiday_mod_er
    
    opd_rate = opd_base_rate * season_mod_opd * age_mod * comorbidity_mod * \
               primary_care_mod_opd * transport_mod * ses_mod_opd
    
    # Generate visit counts using Poisson distribution
    er_visits.append(np.random.poisson(er_rate))
    opd_visits.append(np.random.poisson(opd_rate))
    
    # Calculate admission probability based on ER visits and patient factors
    if er_visits[i] > 0:
        admission_prob = admission_base_rate * age_mod * comorbidity_mod
        # Increase admission probability during extreme weather events
        if is_cyclone_risk[i]:
            admission_prob *= 1.3
        admission_rate.append(np.random.binomial(1, admission_prob))
        
        # Calculate length of stay if admitted
        if admission_rate[i] > 0:
            base_los = 3 + (comorbidity_count * 0.5)
            # Longer stays during extreme weather or vector-borne disease outbreaks
            if is_cyclone_risk[i] or is_vector_disease_risk[i]:
                base_los += 1
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
    'Area': area_distribution,
    'PinCode': pin_codes,
    'IsSlumDwelling': is_slum_dwelling,
    'SES': ses,
    'Insurance': insurance,
    'Season': seasons,
    'Temperature': temperature,
    'Precipitation': precipitation,
    'Humidity': humidity,
    'AQI': aqi,
    'PollenCount': pollen_count,
    'IsCycloneRisk': is_cyclone_risk,
    'IsVectorDiseaseRisk': is_vector_disease_risk,
    'IsOverweight': is_overweight,
    'IsObese': is_obese,
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

# Add disease outbreak modeling
def add_realistic_outbreaks(df):
    """Add realistic disease outbreaks based on historical patterns"""
    # Dengue outbreak in August 2023 (monsoon peak)
    dengue_start = datetime(2023, 8, 1)
    dengue_end = datetime(2023, 8, 25)
    mask = (df['Date'] >= dengue_start) & (df['Date'] <= dengue_end)
    # 30-60% increase in ER visits during outbreak
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                                np.random.uniform(1.3, 1.6, size=mask.sum())).astype(int)
    df.loc[mask, 'IsVectorDiseaseRisk'] = 1
    
    # Respiratory disease outbreak in winter 2024
    flu_start = datetime(2024, 12, 15)
    flu_end = datetime(2025, 1, 31)
    mask = (df['Date'] >= flu_start) & (df['Date'] <= flu_end)
    # Increase ER visits and admissions
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                               np.random.uniform(1.4, 1.7, size=mask.sum())).astype(int)
    df.loc[mask, 'Admission'] = np.where(
        df.loc[mask, 'ER_Visits'] > 0,
        np.random.binomial(1, np.minimum(0.4, df.loc[mask, 'Admission'] * 1.5)),
        0
    )
    
    # Cyclone impact in June 2024
    cyclone_start = datetime(2024, 6, 5)
    cyclone_end = datetime(2024, 6, 12)
    mask = (df['Date'] >= cyclone_start) & (df['Date'] <= cyclone_end)
    df.loc[mask, 'IsCycloneRisk'] = 1
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                               np.random.uniform(1.5, 2.0, size=mask.sum())).astype(int)
    
    # Add more outbreaks to increase healthcare demand spikes
    # Malaria outbreak in July 2022
    malaria_start = datetime(2022, 7, 10)
    malaria_end = datetime(2022, 7, 30)
    mask = (df['Date'] >= malaria_start) & (df['Date'] <= malaria_end)
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                               np.random.uniform(1.3, 1.5, size=mask.sum())).astype(int)
    df.loc[mask, 'IsVectorDiseaseRisk'] = 1
    
    # Heat wave in May 2023
    heatwave_start = datetime(2023, 5, 15)
    heatwave_end = datetime(2023, 5, 25)
    mask = (df['Date'] >= heatwave_start) & (df['Date'] <= heatwave_end)
    df.loc[mask, 'Temperature'] += 3  # Increase temperature
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                               np.random.uniform(1.4, 1.6, size=mask.sum())).astype(int)
    
    # Severe flooding in July 2024
    flood_start = datetime(2024, 7, 25)
    flood_end = datetime(2024, 8, 5)
    mask = (df['Date'] >= flood_start) & (df['Date'] <= flood_end)
    df.loc[mask, 'Precipitation'] = np.random.gamma(20, 10, size=mask.sum())  # Heavy rainfall
    df.loc[mask, 'ER_Visits'] = (df.loc[mask, 'ER_Visits'] * 
                               np.random.uniform(1.6, 2.2, size=mask.sum())).astype(int)
    
    return df

# Apply disease outbreaks
synthetic_data = add_realistic_outbreaks(synthetic_data)

# Add validation metrics for data quality assessment
def calculate_validation_metrics(data):
    """Calculate metrics to validate synthetic data quality"""
    metrics = {}
    
    # Check age-comorbidity relationship
    elderly = data[data['Age'] > 65]
    young = data[data['Age'] < 40]
    metrics['elderly_diabetes_rate'] = elderly['HasDiabetes'].mean()
    metrics['young_diabetes_rate'] = young['HasDiabetes'].mean()
    metrics['age_diabetes_ratio'] = metrics['elderly_diabetes_rate'] / max(0.001, metrics['young_diabetes_rate'])
    
    # Check seasonal patterns
    monsoon_data = data[data['Season'] == 'Monsoon']
    winter_data = data[data['Season'] == 'Winter']
    metrics['monsoon_vector_disease_rate'] = monsoon_data['IsVectorDiseaseRisk'].mean()
    metrics['winter_flu_rate'] = winter_data['IsFluSeason'].mean()
    
    # Check SES-healthcare relationship
    low_ses = data[data['SES'] == 'Low']
    high_ses = data[data['SES'] == 'High']
    metrics['low_ses_er_rate'] = low_ses['ER_Visits'].mean()
    metrics['high_ses_er_rate'] = high_ses['ER_Visits'].mean()
    metrics['ses_er_ratio'] = metrics['low_ses_er_rate'] / max(0.001, metrics['high_ses_er_rate'])
    
    # Check overall disease prevalence
    metrics['diabetes_prevalence'] = data['HasDiabetes'].mean()
    metrics['hypertension_prevalence'] = data['HasHypertension'].mean()
    metrics['asthma_prevalence'] = data['HasAsthma'].mean()
    
    # Check healthcare spending based on SES (9.7% of income spent on healthcare)
    metrics['healthcare_spending_percent'] = 9.7
    
    return metrics

validation_metrics = calculate_validation_metrics(synthetic_data)

# Display validation metrics
print("\nValidation Metrics:")
for key, value in validation_metrics.items():
    print(f"{key}: {value}")

# Save to CSV
synthetic_data.to_csv('mumbai_healthcare_demand_dataset.csv', index=False)

print(f"\nSynthetic healthcare demand dataset for Mumbai with {n_samples} records created successfully!")
print("Dataset saved as 'mumbai_healthcare_demand_dataset.csv'")
