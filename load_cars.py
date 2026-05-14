import psycopg2
import pandas as pd
import math

def load_data():
    try:
        conn = psycopg2.connect(
            dbname='uppcar',
            user='postgres',
            password='1234badrtiwi',
            host='localhost'
        )
        cur = conn.cursor()

        # 1. Delete the first 10 cars (by ID or just 10)
        # We need to delete from car_photos first due to FK constraint
        print("Deleting 10 cars and their photos...")
        cur.execute("SELECT id FROM cars ORDER BY id LIMIT 10")
        ids_to_delete = [r[0] for r in cur.fetchall()]
        if ids_to_delete:
            cur.execute("DELETE FROM car_photos WHERE car_id IN %s", (tuple(ids_to_delete),))
            cur.execute("DELETE FROM cars WHERE id IN %s", (tuple(ids_to_delete),))
            print(f"Deleted {len(ids_to_delete)} cars and their photos.")
        else:
            print("No cars found to delete.")

        # 2. Load CSV
        csv_path = r'c:\Users\digit\Desktop\UppCar\data\professional_rentals_clean_unique_images_with_images.csv'
        df = pd.read_csv(csv_path)
        print(f"Loading {len(df)} cars from CSV...")

        for index, row in df.iterrows():
            # Get or create agency
            agency_name = str(row['agence'])
            cur.execute("SELECT id FROM agences WHERE agency_name = %s", (agency_name,))
            res = cur.fetchone()
            if res:
                agency_id = res[0]
            else:
                # Create a dummy agency if it doesn't exist
                # Based on Agency.java: firstName, lastName, email, password, agencyName, city, phone, fleetSize
                email = f"contact@{agency_name.lower().replace(' ', '')}.com"
                cur.execute(
                    "INSERT INTO agences (first_name, last_name, email, password, agency_name, city, phone, fleet_size) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                    ("Agency", "Owner", email, "password", agency_name, row['ville'], "0000000000", "Unknown")
                )
                agency_id = cur.fetchone()[0]

            # Insert car
            name = row['nom']
            brand = row['marque']
            year = int(row['annee']) if not math.isnan(row['annee']) else 2024
            seats = int(row['places']) if not math.isnan(row['places']) else 5
            price = float(row['prix_par_jour']) if not math.isnan(row['prix_par_jour']) else 0.0
            city = row['ville']
            
            plate = f"ABC-{index}"
            fuel = "Diesel"
            status = "available"
            color = "Silver"
            mileage = 0
            
            cur.execute(
                "INSERT INTO cars (name, plate, category, price, fuel, seats, year, status, city, color, mileage, agency_id, start_date, end_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (name, plate, brand, price, fuel, seats, year, status, city, color, mileage, agency_id, "", "")
            )
            car_id = cur.fetchone()[0]

            # Insert photos
            for i in range(1, 5):
                url = row.get(f'image_url_{i}')
                if isinstance(url, str) and url.strip():
                    cur.execute(
                        "INSERT INTO car_photos (car_id, photo_url) VALUES (%s, %s)",
                        (car_id, url)
                    )

        conn.commit()
        print("Successfully loaded all cars.")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")
        if 'conn' in locals() and conn:
            conn.rollback()

if __name__ == "__main__":
    load_data()
