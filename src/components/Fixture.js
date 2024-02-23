import React from 'react';
import teamLogos from '../utils/teamLogos'; // Make sure the import path matches your project structure
import './Fixture.css';

const Fixture = ({ homeTeam, awayTeam, homeStats, awayStats }) => {
    return (
        <div className="fixture">
            {/* Home Team Stats */}
            <div className="team-stats home-stats">
                <div className="stat-box">[{homeStats.xGRank}] xG: {homeStats.xG}</div>
                <div className="stat-box">[{homeStats.xGARank}] xGA: {homeStats.xGA}</div>
            </div>
            
            {/* Home Team Name and Logo */}
            <span className="team-name">{homeTeam}</span>
            <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="team-logo" />
            
            {/* VS Section */}
            <span className="vs">vs</span>
            
            {/* Away Team Logo and Name */}
            <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="team-logo" />
            <span className="team-name">{awayTeam}</span>
            
            {/* Away Team Stats */}
            <div className="team-stats away-stats">
                <div className="stat-box">[{awayStats.xGRank}] xG: {awayStats.xG}</div>
                <div className="stat-box">[{awayStats.xGARank}] xGA: {awayStats.xGA}</div>
            </div>
        </div>
    );
};

export default Fixture;
