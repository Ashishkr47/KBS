import React from "react";
import "./GameOver.css";

function GameOver({ playerName, finalScore }) {
  return (
    <div className="gameover-container">
      {/* Left and Right Images */}
      <img src="jssl.png" alt="Left Decoration" className="side-image left" />
      <img src="jsl.png" alt="Right Decoration" className="side-image right" />

      {/* Center Image (Small) */}
      <img src="kbs.png" alt="Center Decoration" className="center-image small" />

      <h1>Game Over!</h1>
      <h2>Player: {playerName}</h2>
      <h2>Your Final Score: {finalScore}</h2>
      <button onClick={() => window.location.reload()} className="restart-btn">
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
