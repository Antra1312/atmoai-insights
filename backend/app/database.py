import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'atmoai.db')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute('''
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        input TEXT,
        output REAL
    )
    ''')
    conn.commit()
    conn.close()
