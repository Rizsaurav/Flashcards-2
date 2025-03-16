import React, { useState, useEffect } from "react";
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

  // ✅ Load stored data from localStorage or initialize state
  const [masteredCards, setMasteredCards] = useState(() => JSON.parse(localStorage.getItem("masteredCards")) || []);
  const [currentStreak, setCurrentStreak] = useState(() => parseInt(localStorage.getItem("currentStreak")) || 0);
  const [longestStreak, setLongestStreak] = useState(() => parseInt(localStorage.getItem("longestStreak")) || 0);
  const [cards, setCards] = useState(() => initialCards.filter((card) => !masteredCards.includes(card.id)));
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Persist mastered cards and streaks in localStorage
  useEffect(() => {
    localStorage.setItem("masteredCards", JSON.stringify(masteredCards));
    localStorage.setItem("currentStreak", currentStreak);
    localStorage.setItem("longestStreak", longestStreak);
  }, [masteredCards, currentStreak, longestStreak]);

  // ✅ Function to generate visually distinct random colors
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue for variation
    const lightness = 80 + Math.random() * 10; // Ensures light pastel shades
    return `hsl(${hue}, 60%, ${lightness}%)`;
  };

  // ✅ Function to update card color dynamically
  const updateCardColor = () => {
    document.documentElement.style.setProperty("--card-color", getRandomColor());
  };

  // ✅ Shuffle cards while keeping mastered cards excluded
  const shuffleCards = () => {
    setCards((prevCards) => {
      const unmastered = prevCards.filter((card) => !masteredCards.includes(card.id));
      return [...unmastered].sort(() => Math.random() - 0.5);
    });
    setCurrentIndex(0);
    updateCardColor();
  };

  // ✅ Update streak logic
  const updateStreak = (isCorrect) => {
    setCurrentStreak((prevStreak) => {
      const newStreak = isCorrect ? prevStreak + 1 : 0;
      if (isCorrect) {
        setLongestStreak((prevLongest) => Math.max(prevLongest, newStreak));
      }
      return newStreak;
    });
  };

  // ✅ Navigate cards safely while updating color
  const nextCard = () => {
    if (cards.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      updateCardColor();
    }
  };

  const previousCard = () => {
    if (cards.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
      updateCardColor();
    }
  };

  // ✅ Mark a card as mastered & remove from deck
  const markAsMastered = (id) => {
    setMasteredCards((prev) => {
      const updatedMastered = [...prev, id];
      localStorage.setItem("masteredCards", JSON.stringify(updatedMastered));
      return updatedMastered;
    });

    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      if (updatedCards.length > 0) {
        setCurrentIndex((prevIndex) => Math.min(prevIndex, updatedCards.length - 1));
        updateCardColor();
      }
      return updatedCards;
    });
  };

  // ✅ Calculate progress percentage for progress bar
  const totalCards = cards.length;
  const progressPercentage = totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 100;

  return (
    <div className="App">
      <h1>Flashcards Game</h1>

      {/* ✅ Progress Bar */}
      <div className="progress-container">
        <p>Card {currentIndex + 1} / {totalCards}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {totalCards > 0 ? (
        <Flashcard
          key={cards[currentIndex].id}
          question={cards[currentIndex].question}
          answer={cards[currentIndex].answer}
          onShuffle={shuffleCards}
          onNext={nextCard}
          onPrevious={previousCard}
          updateStreak={updateStreak}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          markAsMastered={() => markAsMastered(cards[currentIndex].id)}
        />
      ) : (
        <p>🎉 Congratulations! You've mastered all cards!</p>
      )}
    </div>
  );
};

export default App;
