import React from 'react';

const ProgressBar = ({ progress }) => (
    <div className="progress-container">
        <div className="progress-bar-header" style={{ width: `${progress}%` }}></div>
    </div>
);

export default ProgressBar;
