import psycopg2

def check_db():
    try:
        conn = psycopg2.connect(
            dbname='uppcar',
            user='postgres',
            password='1234badrtiwi',
            host='localhost'
        )
        cur = conn.cursor()
        cur.execute("SELECT name, category, price FROM cars WHERE name ILIKE '%Range Rover%' LIMIT 5;")
        rows = cur.fetchall()
        for row in rows:
            print(f"Name: {row[0]}, Category: {row[1]}, Price: {row[2]}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db()
