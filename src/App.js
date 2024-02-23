import React, { useState, useEffect } from 'react';
import Fixture from './components/Fixture';
import './App.css'; 

function App() {
    const [fixtures, setFixtures] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/fixtures') // Adjust this URL to your Flask API
            .then(response => response.json())
            .then(data => {
                const transformedData = data.map(fixture => ({
                    homeTeam: fixture[1],
                    awayTeam: fixture[6],
                    homeStats: { xG: Number(fixture[2]).toFixed(1), xGA: Number(fixture[3]).toFixed(1), xGRank: fixture[4], xGARank: fixture[5] },
                    awayStats: { xG: Number(fixture[7]).toFixed(1), xGA: Number(fixture[8]).toFixed(1), xGRank: fixture[9], xGARank: fixture[10] }
                }));
                setFixtures(transformedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(fixtures); // Add this before the return statement in App.js
    return (
        <div className="App">
            {fixtures.map((fixture, index) => (
                <Fixture 
                    key={index}
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                    homeStats={fixture.homeStats}
                    awayStats={fixture.awayStats}
                />
            ))}
        </div>
    );
}

export default App;


