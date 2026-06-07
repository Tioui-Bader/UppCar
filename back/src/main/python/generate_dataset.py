import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os

# Configuration
DAYS_HISTORY = 180
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "historical_data.csv")

def generate_data():
    dates = [datetime.now() - timedelta(days=x) for x in range(DAYS_HISTORY, 0, -1)]
    
    # Simulate growth trends
    # Reservations: base 5, adding 0.1 each day + some seasonality/noise
    reservations = [int(5 + (i * 0.15) + np.random.randint(-2, 5)) for i in range(DAYS_HISTORY)]
    
    # Clients: base 2, adding 0.05 each day
    clients = [int(2 + (i * 0.08) + np.random.randint(0, 3)) for i in range(DAYS_HISTORY)]
    
    # Agencies: base 1, adding 0.01 each day
    agencies = [int(1 + (i * 0.02) + np.random.randint(0, 2)) for i in range(DAYS_HISTORY)]
    
    df = pd.DataFrame({
        'date': [d.strftime('%Y-%m-%d') for d in dates],
        'reservations': reservations,
        'clients': clients,
        'agencies': agencies
    })
    
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Generated {len(df)} rows of historical data in {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_data()
