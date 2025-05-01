from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv

cities = [
    "agra", "ahmedabad","allahabad", "amritsar", "bhopal", "chandigarh",
     "kanpur", "kozhikode", "lucknow","nagpur", "nashik", "navi-mumbai","noida", "patna" ,"rajkot", "ranchi", "surat", "thane", "thiruvananthapuram","vadodara", "varanasi"
]

specializations = [
    "general-physician", "dentist", "cardiologist", 
    "ophthalmologist", "dermatologist", "neurologist", "urologist", 
    "orthodontist", "pediatrician", 
    "ayurveda", "physiotherapist"
]

pages_to_scrape = 1

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(options=chrome_options)

wait = WebDriverWait(driver, 10)
all_doctor_data = []

try:
    for city in cities:
        for specialization in specializations:
            print(f"\nScraping {specialization} in {city}...")
            for page in range(1, pages_to_scrape + 1):
                url = f"https://www.practo.com/{city}/doctors?page={page}&specialization={specialization}"
                driver.get(url)
                time.sleep(4)  # Wait for JS to load

                cards = driver.find_elements(By.CSS_SELECTOR, "div[data-qa-id='doctor_card']")
                print(f"  Found {len(cards)} doctor cards on page {page}")

                for card_index, card in enumerate(cards):
                    try:
                        name_elem = card.find_element(By.CSS_SELECTOR, "h2[data-qa-id='doctor_name'].doctor-name")
                        name = name_elem.text.strip()

                        try:
                            exp_elem = card.find_element(By.CSS_SELECTOR, "div[data-qa-id='doctor_experience']")
                            experience = exp_elem.text.strip()
                        except:
                            experience = "N/A"

                        try:
                            fees_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='consultation_fee']")
                            fees = fees_elem.text.strip()
                        except:
                            fees = "N/A"

                        try:
                            locality_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='practice_locality']")
                            city_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='practice_city']")
                            location = f"{locality_elem.text.strip()}, {city_elem.text.strip()}"
                        except:
                            location = "N/A"

                        # --- CLICK "Book Clinic Visit" BUTTON ---
                        phone_number = "N/A"
                        try:
                            # Find and click the "Book Clinic Visit" button
                            book_btn = card.find_element(By.CSS_SELECTOR, "button[data-qa-id='book_button']")
                            driver.execute_script("arguments[0].click();", book_btn)
                            # Wait for the modal/dialog to appear
                            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "button[data-qa-id='call_button']")))
                            time.sleep(1)
                            # Find and click the "Call Now" button in the modal
                            call_btn = driver.find_element(By.CSS_SELECTOR, "button[data-qa-id='call_button']")
                            driver.execute_script("arguments[0].click();", call_btn)
                            # Wait for phone number to appear
                            phone_elem = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "div.c-vn_number")))
                            phone_number = phone_elem.text.strip()
                            # Optional: Close the modal (if a close button exists)
                            try:
                                close_btn = driver.find_element(By.CSS_SELECTOR, "button[aria-label='Close']")
                                driver.execute_script("arguments[0].click();", close_btn)
                            except:
                                pass
                        except Exception as e:
                            # If phone number not found, just skip
                            pass

                        all_doctor_data.append({
                            "City": city,
                            "Specialization": specialization,
                            "Name": name,
                            "Experience": experience,
                            "Fees": fees,
                            "Location": location,
                            "Phone Number": phone_number
                        })

                    except Exception as e:
                        print(f"    Could not extract doctor data for card {card_index+1}: {e}")
                        continue

finally:
    driver.quit()

with open("doctors_multi_city_specialization.csv", "w", newline="", encoding="utf-8") as csvfile:
    fieldnames = ["City", "Specialization", "Name", "Experience", "Fees", "Location", "Phone Number"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for doc in all_doctor_data:
        writer.writerow(doc)

print("\nScraping complete! Data saved to doctors_multi_city_specialization.csv")
