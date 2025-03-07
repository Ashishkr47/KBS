// useEffect(() => {
  //   startVoiceRecognition(); // Start voice recognition once the game starts
  // }, []);

  // const startVoiceRecognition = () => {
  //   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //   recognition.lang = "en-US";
  //   recognition.continuous = true; // Keeps listening
  //   recognition.interimResults = false;
  
  //   recognition.onresult = (event) => {
  //     const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  //     console.log("Recognized Speech:", transcript);

  //     // Select Answer
  //     if (transcript.includes("select option")) {
  //       const match = transcript.match(/select option ([a-d])/);
  //       if (match) {
  //         const optionIndex = ["a", "b", "c", "d"].indexOf(match[1]);
  //         if (optionIndex !== -1) {
  //           setSelectedAnswer(currentQuestion.options[optionIndex]);
  //         }
  //       }
  //     }

  //     // Lock Answer
  //     if (transcript.includes("lock option")) {
  //       const match = transcript.match(/lock option ([a-d])/);
  //       if (match) {
  //         const optionIndex = ["a", "b", "c", "d"].indexOf(match[1]);
  //         if (optionIndex !== -1 && selectedAnswer === currentQuestion.options[optionIndex]) {
  //           lockAnswer();
  //         }
  //       }
  //     }

  //     // Use 50:50 Lifeline
  //     if (transcript.includes("use 50:50")) {
  //       useFiftyFifty();
  //     }

  //     // Use Audience Poll
  //     if (transcript.includes("use audience poll")) {
  //       useAudiencePoll();
  //     }

  //     // Use Call Expert
  //     if (transcript.includes("use call expert")) {
  //       useCallExpert();
  //     }

  //     // Next Question
  //     if (transcript.includes("next question")) {
  //       nextQuestion();
  //     }

  //     recognition.start(); // Restart listening after each command
  //   };

  //   recognition.onerror = (event) => {
  //     console.error("Speech Recognition Error:", event.error);
  //     setTimeout(() => recognition.start(), 1000);
  //   };

  //   recognition.start();
  // };