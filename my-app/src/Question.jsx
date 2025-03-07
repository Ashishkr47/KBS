import React, { useState } from 'react';

function Question({ question, onAnswer, usedLifeline, onLifeline }) {
  const [options, setOptions] = useState(question.options);

  const handleClick = (option) => {
    onAnswer(option);
  };

  const handleLifelineClick = () => {
    const correctAnswer = question.correctAnswer;
    const incorrectOptions = question.options.filter(opt => opt !== correctAnswer);
    const randomIncorrectOptions = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    const remainingOptions = [correctAnswer, ...randomIncorrectOptions].sort(() => 0.5 - Math.random());
    setOptions(remainingOptions);
    onLifeline();
  };

  return (
    <div className="question">
      <h2>{question.question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleClick(option)}>
            {option}
          </button>
        ))}
      </div>
      {!usedLifeline && (
        <button className="lifeline" onClick={handleLifelineClick}>
          50:50 Lifeline
        </button>
      )}
    </div>
  );
}

export default Question;