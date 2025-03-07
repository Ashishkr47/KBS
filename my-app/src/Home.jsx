import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import homeSound from "./sounds/home.wav"; 

function Home({ startGame }) {
  const [name, setName] = useState("");
  const homeAudioRef = useRef(new Audio(homeSound));

  useEffect(() => {
    const playSound = () => {
      homeAudioRef.current.play().catch((error) => {
        console.log("Autoplay blocked, waiting for user interaction...");
        document.addEventListener("click", handleUserInteraction, { once: true });
      });
    };

    const handleUserInteraction = () => {
      homeAudioRef.current.play();
    };

    playSound(); // Try to autoplay the sound
    return () => {
      homeAudioRef.current.pause(); // Stop sound when component unmounts
    };
  }, []);

  return (
    <div className="home-container">
      {/* Background Light Effect */}
      <div className="light-effect"></div>

      {/* Left and Right Images */}
      <img src="jssl.png" alt="Left Decoration" className="side-image left" />
      <img src="jsl.png" alt="Right Decoration" className="side-image right" />

      {/* Center Image (Large) */}
      <img src="kbs.png" alt="Center Decoration" className="center-image large" />

      {/* Title & Subtitle */}
      <h1 className="title">Kaun Banega Surakshapati</h1>
      <p className="subtitle">Enter your name and start playing!</p>

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="name-input"
      />

      {/* Start Button */}
      <button
        className="start-btn"
        onClick={() => {
          if (name) {
            homeAudioRef.current.pause(); // Stop home sound when game starts
            startGame(name);
          }
        }}
        disabled={!name}
      >
        Start Game
      </button>

      {/* Footer Text */}
      <p className="footer-text">Get ready for an exciting game of knowledge and rewards!</p>
    </div>
  );
}

export default Home;
