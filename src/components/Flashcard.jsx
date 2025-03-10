import React, { useState } from "react";
import "./Flashcard.css";

const Flashcard = ({ question, answer, onShuffle, onNext, onPrevious, updateStreak, currentStreak, longestStreak }) => {
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleFlip = () => {
    setFlipped(!flipped);
    setFeedback(""); // Reset feedback when flipping
  };

  const checkAnswer = () => {
    const isCorrect = userAnswer.trim().toLowerCase() === answer.toLowerCase();
    if (isCorrect) {
      setFeedback("✅ Correct!");
      updateStreak(true);
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${answer}`);
      updateStreak(false);
    }
  };

  return (
    <div className="flashcard-container">
      {/* Streak Counter */}
      <div className="streaks">
        <p>🔥 Streak: {currentStreak}</p>
        <p>🏆 Best: {longestStreak}</p>
      </div>

      {/* Flashcard that flips on click */}
      <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
        {!flipped ? (
          <div className="front">{question}</div>
        ) : (
          <div className="back">{answer}</div>
        )}
      </div>

      {/* Answer Input Section */}
      <div className="answer-section">
        <input
          type="text"
          placeholder="Your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={checkAnswer}>Check Answer</button>
        <p className="feedback">{feedback}</p>
      </div>

      {/* Controls for Shuffle, Previous, Next */}
      <div className="controls">
        <button onClick={onShuffle} className="shuffle-btn">🔀 Shuffle</button>
        <button onClick={onPrevious} className="prev-btn">⬅️ Previous</button>
        <button onClick={onNext} className="next-btn">➡️ Next</button>
      </div>
    </div>
  );
};

export default Flashcard;
