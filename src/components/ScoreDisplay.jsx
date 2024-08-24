import React from 'react';

const ScoreDisplay = ({ currentScorePercentage, maxScorePercentage, minScorePercentage }) => (
    <div className="score-wrapper">
        <div className="score">
            <div>Score: {Math.round(currentScorePercentage)}%</div>
            <div>Max Score: {Math.round(maxScorePercentage)}%</div>
        </div>
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{
                    width: `${minScorePercentage}%`,
                    backgroundColor: 'black',
                }}
            ></div>
            <div
                className="progress-bar-gray"
                style={{
                    width: `${currentScorePercentage - minScorePercentage}%`,
                    left: `${minScorePercentage}%`,
                    backgroundColor: 'darkgray',
                }}
            ></div>
            <div
                className="progress-bar-light-gray"
                style={{
                    width: `${maxScorePercentage - currentScorePercentage}%`,
                    left: `${currentScorePercentage}%`,
                    backgroundColor: 'gray',
                }}
            ></div>
        </div>
    </div>
);

export default ScoreDisplay;
