import React, { useState, useEffect, useRef } from "react";
import questions from "./Q4";
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import countdownSound from './sounds/countdown.mp3';
import callSound from './sounds/call.mp3';
import questSound from './sounds/ques.wav';
import optionRevealSound from './sounds/option.mp3'; // Import sound
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Game.css";

const optionLabels = ["A", "B", "C", "D"];
const pointLadder = [100, 200, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000,100000];

function Game({ playerName, endGame }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [pollUsed, setPollUsed] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showPoll, setShowPoll] = useState(false);
  const [pollData, setPollData] = useState({});
  const [showReveal, setShowReveal] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [expertUsed, setExpertUsed] = useState(false);
  const [isCallingExpert, setIsCallingExpert] = useState(false);
  const [expertResponse, setExpertResponse] = useState("");

  // Sound Refs
  const correctRef = useRef(new Audio(correctSound));
  const wrongRef = useRef(new Audio(wrongSound));
  const countdownRef = useRef(new Audio(countdownSound));
  const callRef = useRef(new Audio(callSound));
  const questRef = useRef(new Audio(questSound));
  const optionRevealRef = useRef(new Audio(optionRevealSound)); // Ref for sound

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    questRef.current.play();
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timer === 0) endGame(pointLadder[score - 1] || 0);
    if (timer !== null && !locked && !isCallingExpert && !isTimerStopped) {
      countdownRef.current.play();
      countdownRef.current.loop = true;
      const interval = setInterval(() => {
        setTimer(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => {
        clearInterval(interval);
        countdownRef.current.pause();
        countdownRef.current.currentTime = 0;
      };
    }
  }, [timer, locked, isCallingExpert, isTimerStopped]);

  const revealOptions = () => {
    setShowOptions([]); // Reset shown options
    setOptionsVisible(true);
    setShowNext(false);
  
    // Reveal options one by one with a delay
    currentQuestion.options.forEach((option, index) => {
      setTimeout(() => {
        setShowOptions((prev) => [...prev, option]); // Add option to shown list
        optionRevealRef.current.currentTime = 0; // Reset sound to start
        optionRevealRef.current.play(); // Play sound
      }, (index + 1) * 1000); // Delay each option by 1 second
    });
  
    // Start the timer only after all options are revealed
    setTimeout(() => {
      setTimer(20); // Start the timer after all options are shown
    }, (currentQuestion.options.length + 1) * 1000); // Wait for all options to be revealed
  };

  const selectAnswer = (option) => {
    if (!locked) setSelectedAnswer(option);
  };

  const lockAnswer = () => {
    if (!selectedAnswer || locked) return;
    setLocked(true);
    setIsTimerStopped(true);
    setShowReveal(true);
    countdownRef.current.pause();
    countdownRef.current.currentTime = 0;
  };

  const revealAnswer = () => {
    setAnswerRevealed(true);
    setShowReveal(false);
    
    if (selectedAnswer === currentQuestion.correct) {
      correctRef.current.play();
      setShowNext(true);
      setScore(prev => prev + 1);
    } else {
      wrongRef.current.play();
      setTimeout(() => endGame(pointLadder[score - 1] || 0), 2000);
    }
  };

  const useFiftyFifty = () => {
    if (fiftyUsed || locked || !optionsVisible || currentQuestionIndex >= 2) return; // Prevent reuse
  
    const incorrectOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correct);
    const removedOptions = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
  
    const updatedFilteredOptions = currentQuestion.options.map(opt => removedOptions.includes(opt));
  
    setFilteredOptions(updatedFilteredOptions);
    setFiftyUsed(true); // Mark as used for future rounds
  };

  

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowOptions([]); // Reset shown options
      setSelectedAnswer(null);
      setTimer(null); // Reset timer (do not start it yet)
      setOptionsVisible(false);
      setLocked(false);
      setShowNext(false);
      setShowPoll(false);
      setFilteredOptions([]);
      setAnswerRevealed(false);
      setShowReveal(false);
      setIsTimerStopped(false); // Reset timer pause state
      // setFiftyUsed();
      setPollUsed(false);
      setExpertUsed(false);
    } else {
      endGame(pointLadder[score] || 0);
    }
  };
  const getOptionClass = (option) => {
    if (answerRevealed) {
      if (option === currentQuestion.correct) return "correct";
      if (option === selectedAnswer) return "incorrect";
    }
    if (locked && option === selectedAnswer) return "locked";
    return selectedAnswer === option ? "selected" : "";
  };

  return (
    <div className="game-container">
      <img src="jssl.png" alt="Left Decoration" className="side-image left" />
      <img src="jsl.png" alt="Right Decoration" className="side-image right" />
      <img src="kbs.png" alt="Center Decoration" className="center-image small" />
      {/* <h1 className="game-title">Kaun Banega Surakshapati</h1> */}
      <div className="main-content">
      <h2 className="player-name">Player: {playerName}</h2>
      

      </div>
      
      <div className="timer-container">
  <p className="timer">⏳ Time Left: {timer !== null ? `${timer}s` : "--"}</p>
  {timer !== null && !isTimerStopped && (
    <button className="timer-stop-btn" onClick={() => setIsTimerStopped(true)}>
      ⏸ Pause Timer
    </button>
  )}
  {timer !== null && isTimerStopped && (
    <button className="timer-resume-btn" onClick={() => setIsTimerStopped(false)}>
      ▶️ Resume Timer
    </button>
  )}
</div>
      <div className="spotlight spotlight1"></div>
      <div className="spotlight spotlight2"></div>
      <div className="spotlight spotlight3"></div>
      <div className="spotlight spotlight4"></div>
      <div className="spotlight spotlight5"></div>

      <div className="question-container">
        <p className="question">
          <strong>Q{currentQuestionIndex + 1}:</strong> {currentQuestion.question}
        </p>
        {!optionsVisible && (
          <button className="show-options-btn" onClick={revealOptions}>
            Show Options
          </button>
        )}
        <div className="options-container">
                {optionsVisible && currentQuestion.options.map((option, index) => (
          showOptions.includes(option) && !filteredOptions[index] && (
            <button
              key={index}
              className={`option-btn ${getOptionClass(option)}`}
              onClick={() => selectAnswer(option)}
              disabled={locked}
            >
              <strong>{optionLabels[index]}.</strong> {option}
            </button>
          )
        ))}
        </div>
        {selectedAnswer && !locked && (
          <button className="lock-btn" onClick={lockAnswer}>
            🔒 Lock Answer
          </button>
        )}

        {showReveal && (
          <button className="reveal-btn" onClick={revealAnswer}>
            🔍 Reveal Answer
          </button>
        )}

        {showNext && (
          <button className="next-btn" onClick={nextQuestion}>
            ➡️ Next Question
          </button>
        )}

      </div>

      <div className="lifeline-container">
  <button
    className={`lifeline-btn ${fiftyUsed || currentQuestionIndex >= 2 ? "used" : ""}`}
    onClick={useFiftyFifty}
    disabled={fiftyUsed || currentQuestionIndex >= 2 || !optionsVisible}
  >
   {fiftyUsed ? "50:50 ❌" : currentQuestionIndex >= 2 ? "50:50 ❌" : "50:50"}
  </button>
</div>


      <div className="point-ladder">
        <h3>🏆 Points Ladder</h3>
        <div className="ladder-list">
          {pointLadder.map((points, index) => (
            <div
              key={index}
              className={`ladder-step ${score > index ? "won" : ""} ${score === index ? "current" : ""}`}
            >
              {points}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
