import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Load stored streak and mastered cards
const storedData = JSON.parse(localStorage.getItem("flashcardData")) || {
  currentStreak: 0,
  longestStreak: 0,
  masteredCards: [],
};

// Ensure app starts with stored values
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App storedData={storedData} />
  </StrictMode>
);
