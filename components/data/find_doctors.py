from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

city = "mumbai"
specialization = "general-physician"
pages_to_scrape = 3

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)

doctor_data = []

try:
    for page in range(1, pages_to_scrape + 1):
        url = f"https://www.practo.com/{city}/doctors?page={page}&specialization={specialization}"
        driver.get(url)
        time.sleep(4)  # Wait for JS to load

        cards = driver.find_elements(By.CSS_SELECTOR, "div[data-qa-id='doctor_card']")
        print(f"Found {len(cards)} doctor cards on page {page}")

        for card in cards:
            try:
                # Name
                name_elem = card.find_element(By.CSS_SELECTOR, "h2[data-qa-id='doctor_name'].doctor-name")
                name = name_elem.text.strip()

                # Experience
                try:
                    exp_elem = card.find_element(By.CSS_SELECTOR, "div[data-qa-id='doctor_experience']")
                    experience = exp_elem.text.strip()
                except:
                    experience = "N/A"

                # Fees
                try:
                    fees_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='consultation_fee']")
                    fees = fees_elem.text.strip()
                except:
                    fees = "N/A"

                # Location
                try:
                    locality_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='practice_locality']")
                    city_elem = card.find_element(By.CSS_SELECTOR, "span[data-qa-id='practice_city']")
                    location = f"{locality_elem.text.strip()}, {city_elem.text.strip()}"
                except:
                    location = "N/A"

                # Book Clinic Visit link
                try:
                    book_btn = card.find_element(By.XPATH, ".//a[contains(.,'Book Clinic Visit')]")
                    book_link = book_btn.get_attribute('href')
                except:
                    book_link = "N/A"

                doctor_data.append({
                    "Name": name,
                    "Experience": experience,
                    "Fees": fees,
                    "Location": location,
                    "Book Link": book_link
                })

            except Exception as e:
                print("Could not extract doctor data:", e)
                continue

finally:
    driver.quit()

print("\nScraped Doctor Details:")
for doc in doctor_data:
    print(doc)
