import React, { useState } from 'react';
import teamLogos from '../utils/teamLogos';
import './Fixture.css';

const Fixture = ({ homeTeam, awayTeam, homeStats, awayStats, homePlayers, awayPlayers }) => {
    const [showHomePlayers, setShowHomePlayers] = useState(false);
    const [showAwayPlayers, setShowAwayPlayers] = useState(false);

    return (
        <div className="fixture">
            <div className="fixture-teams">
                {/* Home Team Section */}
                <div className="team-section" onMouseEnter={() => setShowHomePlayers(true)} onMouseLeave={() => setShowHomePlayers(false)}>
                    <div className="team-info">
                        <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="team-logo" />
                        <span className="team-name">{homeTeam}</span>
                    </div>
                    <div className="team-stats">
                        <div className="stat-box">xG: {homeStats.xG}</div>
                        <div className="stat-box">xGA: {homeStats.xGA}</div>
                    </div>
                    {showHomePlayers && (
                        <div className="players-stats">
                            <ul>
                                {homePlayers.map(player => (
                                    <li key={player.id}>{player.name}: xG Contributions - {player.xGContributions}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <span className="vs">vs</span>

                {/* Away Team Section */}
                <div className="team-section" onMouseEnter={() => setShowAwayPlayers(true)} onMouseLeave={() => setShowAwayPlayers(false)}>
                    <div className="team-info">
                        <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="team-logo" />
                        <span className="team-name">{awayTeam}</span>
                    </div>
                    <div className="team-stats">
                        <div className="stat-box">xG: {awayStats.xG}</div>
                        <div className="stat-box">xGA: {awayStats.xGA}</div>
                    </div>
                    {showAwayPlayers && (
                        <div className="players-stats">
                            <ul>
                                {awayPlayers.map(player => (
                                    <li key={player.id}>{player.name}: xG Contributions - {player.xGContributions}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fixture;
