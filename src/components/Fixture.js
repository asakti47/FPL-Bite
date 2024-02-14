import React from 'react';
import teamLogos from '../utils/teamLogos';  // Ensure the path is correct based on your project structure
import './Fixture.css'

const Fixture = ({ homeTeam, awayTeam, homeStats, awayStats }) => {
    return (
        <div className="fixture">
            <div className="team home-team">
                <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="team-logo" />
                <span>{homeTeam}</span>
            </div>
            <div className="vs">vs</div>
            <div className="team away-team">
                <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="team-logo" />
                <span>{awayTeam}</span>
            </div>
            <div className="fixture-stats">
                <div className="team-stats home-stats">
                    <div className="stat-box">xG: {homeStats.xG}</div>
                    <div className="stat-box">xGA: {homeStats.xGA}</div>
                </div>
                <div className="team-stats away-stats">
                    <div className="stat-box">xG: {awayStats.xG}</div>
                    <div className="stat-box">xGA: {awayStats.xGA}</div>
                </div>
            </div>
        </div>
    );
};

export default Fixture;
