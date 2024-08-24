import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import DifficultySelector from './DifficultySelector';
import QuestionSection from './QuestionSection';
import ScoreDisplay from './ScoreDisplay';
import Feedback from './Feedback';

const decodeString = (str) => decodeURIComponent(str);

const Quiz = ({ quizData }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('hard');
    const [filteredQuizData, setFilteredQuizData] = useState(quizData.filter(q => q.difficulty === 'hard'));
    const [clickedOption, setClickedOption] = useState(null);

    const handleAnswerOptionClick = (selectedOption) => {
        if (clickedOption) return;

        setClickedOption(selectedOption);
        const correctOption = decodeString(filteredQuizData[currentQuestion].correct_answer);

        if (selectedOption === correctOption) {
            setFeedback('Correct');
            setScore(score + 1);
        } else {
            setFeedback('Sorry!');
        }
    };

    const totalQuestions = filteredQuizData.length;
    const questionsAnswered = currentQuestion;
    const currentScorePercentage = (score / totalQuestions) * 100;
    const maxScorePercentage = ((score + (totalQuestions - questionsAnswered)) / totalQuestions) * 100;
    const minScorePercentage = (score / totalQuestions) * 100;

    const nextQuestion = () => {
        const nextQuestionIndex = currentQuestion;
        if (nextQuestionIndex < filteredQuizData.length) {
            setCurrentQuestion(nextQuestionIndex);
            setFeedback(null);
            setClickedOption(null);
        } else {
            setShowScore(true);
        }
    };

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setFilteredQuizData(quizData.filter(q => q.difficulty === difficulty));
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setFeedback(null);
        setClickedOption(null);
    };

    if (!filteredQuizData[currentQuestion]) return null;

    const currentOptions = [
        ...filteredQuizData[currentQuestion].incorrect_answers,
        filteredQuizData[currentQuestion].correct_answer
    ].map(decodeString).sort(() => Math.random() - 0.5);

    return (
        <div className="quiz">
            <ProgressBar progress={((currentQuestion + 1) / filteredQuizData.length) * 100} />
            <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
            />
            {
                showScore ? (
                    <div className="score-section">
                        You scored {score} out of {filteredQuizData.length}
                    </div>
                ) : (
                    <>
                        <QuestionSection
                            question={decodeString(filteredQuizData[currentQuestion].question)}
                            options={currentOptions}
                            onAnswerOptionClick={handleAnswerOptionClick}
                            clickedOption={clickedOption}
                            correctAnswer={decodeString(filteredQuizData[currentQuestion].correct_answer)}
                            currentQuestion={currentQuestion}
                            totalQuestions={filteredQuizData.length}
                        />
                        <button onClick={nextQuestion} disabled={!clickedOption}>Next Question</button>
                        <Feedback feedback={feedback} />
                    </>
                )
            }
            <ScoreDisplay
                currentScorePercentage={currentScorePercentage}
                maxScorePercentage={maxScorePercentage}
                minScorePercentage={minScorePercentage}
            />
        </div>
    );
};

export default Quiz;
