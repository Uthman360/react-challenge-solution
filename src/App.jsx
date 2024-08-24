import React from 'react';
import './App.css';
import Quiz from './components/Quiz';
import questions from './questions.json';


function App() {
  return (
    <div className="App">
      <h1>React Quiz App</h1>
      <Quiz quizData={questions} />
    </div>
  );
}

export default App;
