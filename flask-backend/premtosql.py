import pandas as pd
import requests
import logging
import sqlite3

def create_connection(db_file):
    """ Create a database connection to the SQLite database specified by db_file """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except sqlite3.Error as e:
        logging.error(e)

    return conn

def create_tables(conn):
    """ Create a table in the provided database connection """
    try:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS team_stats (
                          id INTEGER PRIMARY KEY,
                          squad TEXT,
                          xG REAL,
                          xGA REAL)''')
        
        cursor.execute('''CREATE TABLE IF NOT EXISTS fixtures (
                          fixture_id INTEGER PRIMARY KEY,
                          home_id INTEGER,
                          away_id INTEGER)''')
        
    except sqlite3.Error as e:
        logging.error(e)


# Name mapping of PL team names to normalise the names of the teams throughout the process
name_mapping = {
    'Manchester City': 'Man City',
    'Tottenham': 'Spurs',
    'Manchester Utd': 'Man Utd',
    'Newcastle Utd': 'Newcastle',
    'Nott\'ham Forest': 'Nott\'m Forest',
    'Luton Town': 'Luton'
}

def fetch_fbref_team_stats():
    try:
        url = 'https://fbref.com/en/comps/9/Premier-League-Stats'
        df = pd.read_html(url)[0]
        df = df[['Squad', 'xG', 'xGA']]

        # Normalise team names
        df['Squad'] = df['Squad'].map(name_mapping).fillna(df['Squad'])
        
        # Creating a mapping of team IDs to names
        bootstrap_data = fetch_fpl_bootstrap()
        teams_dict = {team['id']: team['name'] for team in bootstrap_data['teams']}
        id_dict = {v: k for k, v in teams_dict.items()}

        # Map the team ID to the corresponding column in the PL Team Stats DataFrame
        df['id'] = df['Squad'].map(id_dict)
        df = df[['id','Squad', 'xG', 'xGA']]
        return df
    
    except Exception as e:
        logging.error(f"Error during data fetching and processing: {e}")
        raise

def fetch_fpl_bootstrap():
    bootstrap_url = 'https://fantasy.premierleague.com/api/bootstrap-static/'
    bootstrap_response = requests.get(bootstrap_url)
    bootstrap_data = bootstrap_response.json()
    return bootstrap_data

def fetch_curr_gw():
    # Determine current gameweek
    bootstrap_data = fetch_fpl_bootstrap()
    current_gameweek = next(gw for gw in bootstrap_data['events'] if gw['is_next'])

    # Get fixtures for the current gameweek
    fixtures_url = 'https://fantasy.premierleague.com/api/fixtures/'
    fixtures_response = requests.get(fixtures_url)
    fixtures = [fixture for fixture in fixtures_response.json() if fixture['event'] == current_gameweek['id']]

    # Store gameweek fixtures in a DataFrame
    fixture_id=[]
    home_id=[]
    away_id=[]
    for fixture in fixtures:
        fixture_id.append(fixture['id'])
        home_id.append(fixture['team_h'])
        away_id.append(fixture['team_a'])
    df = pd.DataFrame()
    df['fixture_id'] = fixture_id
    df['home_id'] = home_id
    df['away_id'] = away_id
    return df

def rank_team_stats(df):
    """
    Adds xG and xGA rankings to the DataFrame.
    """
    # Calculate rankings for xG and xGA
    df['xGRank'] = df['xG'].rank(method='min', ascending=False)  # Higher xG is better, so rank in descending order
    df['xGARank'] = df['xGA'].rank(method='min', ascending=True)  # Lower xGA is better, so rank in ascending order
    
    # Convert rankings to integers
    # Note: The ranking might produce floats, so ensure there are no NaN values before conversion to avoid errors
    df['xGRank'] = df['xGRank'].fillna(0).astype(int)
    df['xGARank'] = df['xGARank'].fillna(0).astype(int)
    
    return df

def fetch_and_process_data():
    try:
        # Your data fetching and processing code goes here
        # Example: Fetching Premier League stats from FBRef
        team_stats_df = fetch_fbref_team_stats()
        fixtures_df = fetch_curr_gw()

        # Add the rankings for xG and xGA into the DataFrame
        team_stats_df = rank_team_stats(team_stats_df)

        # After processing the data
        db_file = 'football_data.db'
        conn = create_connection(db_file)

        if conn is not None:
            create_tables(conn)
            team_stats_df.to_sql('team_stats', conn, if_exists='replace', index=False)
            fixtures_df.to_sql('fixtures', conn, if_exists='replace', index=False)
            conn.close()
        else:
            logging.error("Error! Cannot create the database connection.")

    except Exception as e:
        logging.error(f"Error during data fetching and processing: {e}")
        raise

if __name__ == "__main__":
    fetch_and_process_data()