import psycopg2
import pandas as pd

def update_categories():
    try:
        conn = psycopg2.connect(
            dbname='uppcar',
            user='postgres',
            password='1234badrtiwi',
            host='localhost'
        )
        cur = conn.cursor()

        # 1. Calculer les quartiles de prix à partir de la DB pour être précis
        cur.execute("SELECT price FROM cars")
        prices = [r[0] for r in cur.fetchall()]
        df_prices = pd.Series(prices)
        
        q1 = float(df_prices.quantile(0.25))
        q2 = float(df_prices.quantile(0.50))
        q3 = float(df_prices.quantile(0.75))
        
        print(f"Seuils de prix : Budget < {q1}, Mid <= {q2}, Premium <= {q3}, Luxury > {q3}")

        # 2. Mettre à jour les catégories
        # Budget
        cur.execute("UPDATE cars SET category = 'budget' WHERE price < %s", (q1,))
        # Mid-range
        cur.execute("UPDATE cars SET category = 'mid-range' WHERE price >= %s AND price < %s", (q1, q2))
        # Premium
        cur.execute("UPDATE cars SET category = 'premium' WHERE price >= %s AND price < %s", (q2, q3))
        # Luxury
        cur.execute("UPDATE cars SET category = 'luxury' WHERE price >= %s", (q3,))

        conn.commit()
        print(f"✅ Mise à jour de {len(prices)} voitures effectuée !")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Erreur : {e}")

if __name__ == "__main__":
    update_categories()
