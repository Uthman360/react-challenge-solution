import React from 'react';

const QuestionSection = ({ question, options, onAnswerOptionClick, clickedOption, correctAnswer, currentQuestion, totalQuestions }) => (
    <div className="question-section">
        <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{totalQuestions}
        </div>
        <div className="question-text">
            {question}
        </div>
        <div className="answer-section">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswerOptionClick(option)}
                    disabled={!!clickedOption}
                    style={{
                        backgroundColor:
                            option === correctAnswer && clickedOption
                                ? 'green'
                                : clickedOption === option
                                    ? 'red'
                                    : '',
                        color: option === correctAnswer && clickedOption
                            ? '#fff'
                            : clickedOption === option
                                ? '#fff'
                                : '',
                    }}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default QuestionSection;
