import React from 'react';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => (
    <div className="difficulty-buttons">
        <button onClick={() => onDifficultyChange('easy')} style={{ borderColor: selectedDifficulty === 'easy' ? '#fff' : 'transparent' }}>Easy</button>
        <button onClick={() => onDifficultyChange('medium')} style={{ borderColor: selectedDifficulty === 'medium' ? '#fff' : 'transparent' }}>Medium</button>
        <button
            onClick={() => onDifficultyChange('hard')}
            style={{ borderColor: selectedDifficulty === 'hard' ? '#fff' : 'transparent' }}
        >
            Hard
        </button>
    </div>
);

export default DifficultySelector;
