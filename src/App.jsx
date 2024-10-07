import React, { useState } from 'react';
import './App.css';

const flashcardsData = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What planet is known as the Red Planet?", answer: "Mars" },
  { question: "Which animal is the largest mammal?", answer: "Blue whale" },
  { question: "What is 5 + 7?", answer: "12" },
  { question: "Who was the first President of the United States?", answer: "George Washington" },
  { question: "What is the fastest land animal?", answer: "Cheetah" },
];

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [shuffledCards, setShuffledCards] = useState([...flashcardsData]);

  const handleInputChange = (e) => setUserAnswer(e.target.value);

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === shuffledCards[currentCard].answer.toLowerCase()) {
      alert('Correct!');
      setCorrectStreak(correctStreak + 1);
      if (correctStreak + 1 > longestStreak) {
        setLongestStreak(correctStreak + 1);
      }
    } else {
      alert('Incorrect. Try again!');
      setCorrectStreak(0); // reset streak if wrong
    }
    setUserAnswer(''); // clear input
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCard((prevCard) => (prevCard + 1) % shuffledCards.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setCurrentCard((prevCard) => (prevCard - 1 + shuffledCards.length) % shuffledCards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCard(0); // Reset to first card after shuffle
  };

  return (
    <div className="App">
      <h1>General Knowledge Flashcards for Kids</h1>
      <div className="flashcard">
        <h2>{shuffledCards[currentCard].question}</h2>
        {showAnswer && <p className="answer">Answer: {shuffledCards[currentCard].answer}</p>}
      </div>
      
      <input
        type="text"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
      <button onClick={checkAnswer}>Submit Answer</button>
      <button onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>

      <div className="controls">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
        <button onClick={shuffleCards}>Shuffle</button>
      </div>

      <div className="score">
        <p>Correct Streak: {correctStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>
    </div>
  );
};

export default App;
