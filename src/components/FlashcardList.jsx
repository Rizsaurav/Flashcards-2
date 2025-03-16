import React, { useState } from "react";
import Flashcard from "./Flashcard";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What is 2 + 2?", answer: "4" },
    { id: 3, question: "Who discovered gravity?", answer: "Isaac Newton" },
    { id: 4, question: "Which planet is closest to the Sun?", answer: "Mercury" },
    { id: 5, question: "What is the largest ocean?", answer: "Pacific" },
  ]);

  const [index, setIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  // Shuffle WITHOUT including mastered cards
  const shuffleCards = () => {
    const unmastered = flashcards.filter((card) => !masteredCards.includes(card.id));
    setFlashcards([...unmastered].sort(() => Math.random() - 0.5));
    setIndex(0);
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  // ✅ Update Streak Correctly using useState
  const updateStreak = (isCorrect) => {
    setCurrentStreak((prevStreak) => {
      if (isCorrect) {
        const newStreak = prevStreak + 1;
        setLongestStreak((prevLongest) => Math.max(prevLongest, newStreak));
        return newStreak;
      } else {
        return 0; // Reset streak if incorrect
      }
    });
  };

  // ✅ Mark card as mastered
  const markAsMastered = (id) => {
    setMasteredCards((prev) => [...prev, id]);
    setFlashcards((prevCards) => prevCards.filter((card) => card.id !== id));
    nextCard();
  };

  return (
    <>
      {flashcards.length > 0 ? (
        <Flashcard
          question={flashcards[index].question}
          answer={flashcards[index].answer}
          onShuffle={shuffleCards}
          onNext={nextCard}
          onPrevious={prevCard}
          updateStreak={updateStreak}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          markAsMastered={() => markAsMastered(flashcards[index].id)}
        />
      ) : (
        <p>🎉 You have mastered all flashcards!</p>
      )}
    </>
  );
};

export default FlashcardList;
