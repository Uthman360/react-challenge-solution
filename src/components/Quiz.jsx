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
    const [feedback, setFeedback] = useState(null); // Feedback for the answer
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('hard');
    const [filteredQuizData, setFilteredQuizData] = useState(quizData.filter(q => q.difficulty === 'hard'));
    const [clickedOption, setClickedOption] = useState(null); // Track clicked option

    const totalQuestions = filteredQuizData.length;
    const questionsAnswered = currentQuestion + 1;

    // Calculate scores
    const currentScorePercentage = (score / totalQuestions) * 100;
    const maxScorePercentage = ((score + (totalQuestions - questionsAnswered)) / totalQuestions) * 100;
    const minScorePercentage = (score / totalQuestions) * 100;

    const handleAnswerOptionClick = (selectedOption) => {
        if (clickedOption) return; // If an option is already clicked, do nothing

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
            setFeedback(null); // Reset feedback for the next question
            setClickedOption(null); // Reset clicked option
            setProgress(((nextQuestionIndex + 1) / filteredQuizData.length) * 100);
        } else {
            setShowScore(true);
        }
    };

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        const newFilteredData = quizData.filter(q => q.difficulty === difficulty);
        setFilteredQuizData(newFilteredData);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setFeedback(null);
        setClickedOption(null); // Reset clicked option
        setProgress(0); // Reset progress
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
            {
                showScore ? (
                    <div className="score-section">
                        You scored {score} out of {filteredQuizData.length}
                    </div>
                ) : (
                    <>

                        <QuestionSection currentQuestion={currentQuestion} filteredQuizData={filteredQuizData} />

                        <div className="answer-section">
                            {currentOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(option)}
                                    disabled={!!clickedOption} // Disable all options after one is clicked
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
                            ))}
                        </div>

                        <button onClick={nextQuestion} disabled={!clickedOption}>Next Question</button>
                        <Feedback feedback={feedback} />
                    </>
                )
            }

            <ScoreDisplay currentScorePercentage={currentScorePercentage} maxScorePercentage={maxScorePercentage} minScorePercentage={minScorePercentage} />
        </div>
    );
};

export default Quiz;
