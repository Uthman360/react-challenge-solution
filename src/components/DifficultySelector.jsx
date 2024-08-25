import React from 'react';

const DifficultySelector = ({ selectedDifficulty, handleDifficultyChange }) => (
    <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange('easy')} style={{ borderColor: selectedDifficulty === 'easy' ? '#fff' : 'transparent' }}>Easy</button>
        <button onClick={() => handleDifficultyChange('medium')} style={{ borderColor: selectedDifficulty === 'medium' ? '#fff' : 'transparent' }}>Medium</button>
        <button
            onClick={() => handleDifficultyChange('hard')}
            style={{ borderColor: selectedDifficulty === 'hard' ? '#fff' : 'transparent' }}
        >
            Hard
        </button>
    </div>
);

export default DifficultySelector;
