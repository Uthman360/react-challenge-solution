import React, { useState } from 'react';
import ScoreDisplay from './ScoreDisplay';
import QuestionSection from './QuestionSection';
import DifficultySelector from './DifficultySelector';
import ProgressBar from './ProgressBar';
import Feedback from './Feedback';

const decodeString = (str) => decodeURIComponent(str);

const Quiz = ({ quizData }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('hard');
    const [filteredQuizData, setFilteredQuizData] = useState(quizData.filter(q => q.difficulty === 'hard'));
    const [clickedOption, setClickedOption] = useState(null);

    const totalQuestions = filteredQuizData.length;
    const questionsAnswered = currentQuestion;

    const currentScorePercentage = (score / totalQuestions) * 100;
    const maxScorePercentage = Math.min(
        ((score + (totalQuestions - questionsAnswered)) / totalQuestions) * 100,
        100
    );
    const minScorePercentage = (score / totalQuestions) * 100;

    const handleAnswerOptionClick = (selectedOption) => {
        if (clickedOption) return;

        setClickedOption(selectedOption);
        const correctOption = decodeString(filteredQuizData[currentQuestion].correct_answer);

        if (selectedOption === correctOption) {
            setFeedback('Correct');
            setScore(score + 1);
        } else {
            setFeedback('Sorry!');
            setCorrectAnswer(false);
        }
    };

    const nextQuestion = () => {
        const nextQuestionIndex = currentQuestion + 1;
        if (nextQuestionIndex < filteredQuizData.length) {
            setCurrentQuestion(nextQuestionIndex);
            setFeedback(null);
            setClickedOption(null);
            setProgress(((nextQuestionIndex + 1) / filteredQuizData.length) * 100);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setProgress(0);
        setShowScore(false);
        setFeedback(null);
        setCorrectAnswer(null);
        setClickedOption(null);
    };

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        const newFilteredData = quizData.filter(q => q.difficulty === difficulty);
        setFilteredQuizData(newFilteredData);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setFeedback(null);
        setClickedOption(null);
        setProgress(0);
    };

    if (!filteredQuizData[currentQuestion]) return null;

    const currentOptions = [
        ...filteredQuizData[currentQuestion].incorrect_answers,
        filteredQuizData[currentQuestion].correct_answer
    ].map(decodeString).sort(() => Math.random() - 0.5);

    return (
        <div className="quiz">
            <ProgressBar progress={progress} />
            <DifficultySelector handleDifficultyChange={handleDifficultyChange} selectedDifficulty={selectedDifficulty} />

            {showScore ? (
                <div className="score-section">
                    <p>You scored {score} out of {filteredQuizData.length}</p>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <>
                    <QuestionSection currentQuestion={currentQuestion} filteredQuizData={filteredQuizData} />

                    <div className="answer-section">
                        {currentOptions.length > 0 ? (
                            currentOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(option)}
                                    disabled={!!clickedOption}
                                    style={{
                                        backgroundColor:
                                            option === decodeString(filteredQuizData[currentQuestion].correct_answer) && clickedOption
                                                ? 'green'
                                                : clickedOption === option
                                                    ? 'red'
                                                    : '',
                                        color: option === decodeString(filteredQuizData[currentQuestion].correct_answer) && clickedOption
                                            ? '#fff'
                                            : clickedOption === option
                                                ? '#fff'
                                                : '',
                                    }}
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            <p>Nothing here</p>
                        )}
                    </div>

                    <button onClick={nextQuestion} disabled={!clickedOption}>Next Question</button>
                    <Feedback feedback={feedback} />
                </>
            )}

            <ScoreDisplay currentScorePercentage={currentScorePercentage} maxScorePercentage={maxScorePercentage} minScorePercentage={minScorePercentage} />
        </div>
    );
};

export default Quiz;
