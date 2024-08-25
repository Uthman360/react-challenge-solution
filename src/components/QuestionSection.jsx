import React from 'react';
const decodeString = (str) => decodeURIComponent(str);

const QuestionSection = ({ currentQuestion, filteredQuizData }) => (
    <div className="question-section">
        <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{filteredQuizData.length}
        </div>
        <div className="question-text">
            {decodeString(filteredQuizData[currentQuestion].question)}
        </div>
    </div>
);

export default QuestionSection;
