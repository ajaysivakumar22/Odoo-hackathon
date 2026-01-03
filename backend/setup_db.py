import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import sys

def setup_db(password):
    try:
        conn = psycopg2.connect(user='postgres', password=password, host='localhost', port=5433)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cur = conn.cursor()
        
        # Check if database exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = 'globetrotter'")
        exists = cur.fetchone()
        
        if not exists:
            cur.execute('CREATE DATABASE globetrotter')
            print("Successfully created database 'globetrotter'")
        else:
            print("Database 'globetrotter' already exists")
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python setup_db.py <postgres_password>")
    else:
        setup_db(sys.argv[1])
