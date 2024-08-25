import React from 'react';

const ScoreDisplay = ({ currentScorePercentage, maxScorePercentage }) => (
    <div className="score-wrapper">
        <div className="score">
            <div>Score: {Math.round(currentScorePercentage)}%</div>
            <div>Max Score: {Math.round(maxScorePercentage)}%</div>
        </div>
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{
                    width: `${currentScorePercentage}%`,
                    backgroundColor: 'black',
                }}
            ></div>
            <div
                className="progress-bar-light-gray"
                style={{
                    width: `${maxScorePercentage - currentScorePercentage}%`,
                    backgroundColor: 'gray',
                    position: 'absolute',
                    left: `${currentScorePercentage}%`,
                }}
            ></div>
        </div>
    </div>

);

export default ScoreDisplay;
