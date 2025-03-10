import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css";

const App = () => {
  const initialCards = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", answer: "4" },
    { id: 3, question: "Who discovered gravity?", answer: "Isaac Newton" },
    { id: 4, question: "What is the largest planet?", answer: "Jupiter" },
    { id: 5, question: "Who wrote Hamlet?", answer: "William Shakespeare" },
    { id: 6, question: "What is the speed of light?", answer: "299792458 m/s" },
    { id: 7, question: "What is the chemical symbol for gold?", answer: "Au" },
    { id: 8, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { id: 9, question: "What is the capital of Japan?", answer: "Tokyo" },
    { id: 10, question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
  ];

  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // ✅ Shuffle WITHOUT altering correct answers
  const shuffleCards = () => {
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  // ✅ Handle correct/incorrect answers & update streak
  const updateStreak = (isCorrect) => {
    setCurrentStreak((prevStreak) => {
      if (isCorrect) {
        const newStreak = prevStreak + 1;
        setLongestStreak((prevLongest) => Math.max(prevLongest, newStreak));
        return newStreak;
      } else {
        return 0; // Reset streak on incorrect answer
      }
    });
  };

  // ✅ Navigate cards correctly
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  return (
    <div className="App">
      <h1>Flashcards Game</h1>
      
      <Flashcard
        question={cards[currentIndex].question}
        answer={cards[currentIndex].answer}
        onShuffle={shuffleCards}
        onNext={nextCard}
        onPrevious={previousCard}
        updateStreak={updateStreak}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />
    </div>
  );
};

export default App;
