import React from 'react';
import teamLogos from '../utils/teamLogos'; // Adjust this import path as necessary
import './Fixture.css';

const Fixture = ({ homeTeam, awayTeam, homeStats, awayStats }) => {
    // Function to determine the class based on xG rank
    const getXgClass = (rank) => {
        if (rank <= 4) return 'xg-top';    // Top fifth
        if (rank <= 8) return 'xg-top2';   // Second fifth
        if (rank <= 12) return 'xg-mid';   // Middle fifth
        if (rank <= 16) return 'xg-bottom2';// Fourth fifth
        return 'xg-bottom';                // Bottom fifth
    };

    // Function to determine the class based on xGA rank
    const getXgaClass = (rank) => {
        if (rank <= 4) return 'xga-bottom';    // Lowest xGA fifth
        if (rank <= 8) return 'xga-bottom2';   // Second lowest xGA fifth
        if (rank <= 12) return 'xga-mid';   // Middle xGA fifth
        if (rank <= 16) return 'xga-top2';// Second highest xGA fifth
        return 'xga-top';                // Highest xGA fifth
    };

    return (
        <div className="fixture">

            <div className="home-team-container">
                <div className="team-stats home-team-stats">
                    <div className={`stat-box ${getXgClass(homeStats.xGRank)}`}>xG: {homeStats.xG}</div>
                    <div className={`stat-box ${getXgClass(homeStats.xGARank)}`}>xGA: {homeStats.xGA}</div>
                </div>

                <span className="team-name home-team-name">{homeTeam}</span>
                <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="team-logo home-team-logo" />
            </div>
            
            <span className="vs">vs</span>

            <div className="away-team-container">
                <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="team-logo away-team-logo" />
                <span className="team-name away-team-name">{awayTeam}</span>
                <div className="team-stats away-team-stats">
                    <div className={`stat-box ${getXgaClass(awayStats.xGRank)}`}>xG: {awayStats.xG}</div>
                    <div className={`stat-box ${getXgaClass(awayStats.xGARank)}`}>xGA: {awayStats.xGA}</div>
                </div>
            </div>
        </div>
    );
};

export default Fixture;
