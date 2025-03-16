import React, { useState } from "react";
import "./Flashcard.css";

const Flashcard = ({
  question,
  answer,
  onShuffle,
  onNext,
  onPrevious,
  updateStreak,
  currentStreak,
  longestStreak,
  markAsMastered,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [revealed, setRevealed] = useState(false); // 🔹 Controls if the answer should be shown

  const handleFlip = () => {
    setFlipped(!flipped);
    setFeedback(""); // Reset feedback when flipping
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return; // Prevent empty submissions

    const isCorrect = fuzzyMatch(userAnswer, answer);
    setRevealed(true); // 🔹 Show answer only after submission

    if (isCorrect) {
      setFeedback("✅ Correct!");
      updateStreak(true);
    } else {
      setFeedback(`❌ Incorrect! Correct answer: ${answer}`);
      updateStreak(false);
    }
  };

  // Basic Levenshtein Distance for fuzzy matching
  const fuzzyMatch = (input, correct) => {
    const normalizedInput = input.trim().toLowerCase();
    const normalizedCorrect = correct.toLowerCase();

    if (normalizedInput === normalizedCorrect) return true; // Exact match

    const threshold = Math.floor(correct.length * 0.3); // Allow 30% error
    return levenshteinDistance(normalizedInput, normalizedCorrect) <= threshold;
  };

  // Levenshtein Distance Algorithm (edit distance)
  const levenshteinDistance = (a, b) => {
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[a.length][b.length];
  };

  return (
    <div className="flashcard-container">
      {/* Streak Counter */}
      <div className="streaks">
        <p>🔥 Streak: {currentStreak}</p>
        <p>🏆 Best: {longestStreak}</p>
      </div>

      {/* Flashcard */}
      <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
        {!flipped ? (
          <div className="front">{question}</div>
        ) : (
          <div className="back">{revealed ? answer : "???"}</div> // 🔹 Shows answer only if revealed
        )}
      </div>

      {/* Answer Input */}
      <div className="answer-section">
        <input
          type="text"
          placeholder="Your answer..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={checkAnswer} disabled={!userAnswer.trim()}>Check Answer</button>
        <p className="feedback">{feedback}</p>
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={onShuffle}>🔀 Shuffle</button>
        <button onClick={onPrevious}>⬅️ Previous</button>
        <button onClick={onNext}>➡️ Next</button>
        <button onClick={markAsMastered} className="mastered-btn">✅ Mastered</button>
      </div>
    </div>
  );
};

export default Flashcard;
