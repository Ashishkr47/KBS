import React, { useState } from "react";
import Home from "./Home";
import Game from "./Game";
import GameOver from "./GameOver";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const endGame = (score) => {
    setFinalScore(score);
    setGameOver(true);
    setGameStarted(false);
  };

  return (
    <div>
      {!gameStarted && !gameOver && <Home startGame={startGame} />}
      {gameStarted && <Game playerName={playerName} endGame={endGame} />}
      {gameOver && <GameOver playerName={playerName} finalScore={finalScore} />}
    </div>
  );
}

export default App;
