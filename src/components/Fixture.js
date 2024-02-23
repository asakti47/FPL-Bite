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
        return 'xga-top';                // Highest xGA fifth fifth
    };

    return (
        <div className="fixture">
            <div className="team-stats home-stats">
                <div className= "combined-stat-box">
                    <div className={`rank-box ${getXgClass(homeStats.xGRank)}`}>{homeStats.xGRank}</div>
                    <div className="stat-box">xG: {homeStats.xG}</div>
                </div>
                <div className= "combined-stat-box">
                    <div className={`rank-box ${getXgaClass(homeStats.xGARank)}`}>{homeStats.xGARank}</div>
                    <div className="stat-box">xGA: {homeStats.xGA}</div>
                </div>
            </div>
            
            <span className="team-name">{homeTeam}</span>
            <img src={teamLogos[homeTeam]} alt={`${homeTeam} logo`} className="team-logo" />
            <span className="vs">vs</span>
            <img src={teamLogos[awayTeam]} alt={`${awayTeam} logo`} className="team-logo away-team-logo" />
            <span className="team-name">{awayTeam}</span>
            
            <div className="team-stats away-stats">
                <div className="combined-stat-box">
                    <div className={`rank-box ${getXgClass(awayStats.xGRank)}`}>{awayStats.xGRank}</div>
                    <div className="stat-box">xG: {awayStats.xG}</div>
                </div>
                <div className="combined-stat-box">
                    <div className={`rank-box ${getXgaClass(awayStats.xGARank)}`}>{awayStats.xGARank}</div>
                    <div className="stat-box">xGA: {awayStats.xGA}</div>
                </div>
            </div>
        </div>
    );
};

export default Fixture;
