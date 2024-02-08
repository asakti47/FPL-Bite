from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS if your frontend is on a different origin

@app.route('/')
def index():
    return "Welcome to the FPL API!"

@app.route('/api/fixtures')
def get_fixtures():
    # Logic to fetch and return fixtures data
    # For example, query your SQLite database and return JSON data
    conn = sqlite3.connect('football_data.db')
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            f.fixture_id,
            home_team.Squad AS home_team,
            home_team.xG AS home_xG,
            home_team.xGA AS home_xGA,
            away_team.Squad AS away_team,
            away_team.xG AS away_xG,
            away_team.xGA AS away_xGA
        FROM 
            fixtures f
        JOIN 
            team_stats home_team ON f.home_id = home_team.id
        JOIN 
            team_stats away_team ON f.away_id = away_team.id
    """)
    
    fixtures = cursor.fetchall()
    conn.close()

    return jsonify(fixtures)

if __name__ == '__main__':
    app.run(debug=True)
