import React, { useState, useEffect } from 'react';
import Fixture from './components/Fixture';
import './App.css'; 

function App() {
    const [fixtures, setFixtures] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/fixtures')
            .then(response => response.json())
            .then(data => {
                const transformedData = data.map(fixtureArray => ({
                    fixtureId: fixtureArray[0],
                    homeTeam: fixtureArray[1],
                    homeStats: { xG: fixtureArray[2], xGA: fixtureArray[3] },
                    awayTeam: fixtureArray[4],
                    awayStats: { xG: fixtureArray[5], xGA: fixtureArray[6] },
                    homePlayers: [{name: "Player 1", stats: "Stats"}], // Placeholder data
                    awayPlayers: [{name: "Player 2", stats: "Stats"}], // Placeholder data
                }));
                setFixtures(transformedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Upcoming Fixtures</h1>
                {fixtures.map((fixture, index) => (
                    <Fixture 
                        key={index}
                        homeTeam={fixture.homeTeam}
                        awayTeam={fixture.awayTeam}
                        homeStats={fixture.homeStats}
                        awayStats={fixture.awayStats}
                        homePlayers={fixture.homePlayers} // Pass player data
                        awayPlayers={fixture.awayPlayers} // Pass player data
                    />
                ))}
            </header>
        </div>
    );
}

export default App;
