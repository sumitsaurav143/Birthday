import React, { useState,useEffect } from 'react';
import './BirthdayForm.css'; // custom CSS for styling

const questions = [
  { key: 'feeling', question: "How do you feel today? 😍", options: ['Like a Queen 👑', 'Cake Monster 🎂', 'I demand gifts', 'All of the above'] },
  { key: 'celebration', question: "Preferred birthday celebration style? 🎉", options: ['Breakfast in bed', 'Surprise gifts', 'Endless compliments', 'Funny dance from you'] },
  { key: 'bfRating', question: "How amazing is your boyfriend on a scale of 1 to 10? 😎" },
  { key: 'wish', question: "What’s your birthday wish (besides more time with me 😘)?" }
];

const BirthdayForm = ({ answers, setAnswers, moveNext }) => {
  const [step, setStep] = useState(0);

  const [inputValue, setInputValue] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (step >= questions.length && !emailSent) {
      moveNext();
      setEmailSent(true);
    }
  }, [step, emailSent]);

  const handleNext = () => {
    if (inputValue.trim()) {
      setAnswers(prev => ({ ...prev, [questions[step].key]: inputValue }));
      setInputValue('');
      setStep(prev => prev + 1);
    }
  };

  const handleOptionClick = (option) => {
    setAnswers(prev => ({ ...prev, [questions[step].key]: option }));
    setStep(prev => prev + 1);
  };

  if (step >= questions.length) {
    return (
      <div className="form-container">
        <div className="card">
          <h2>🎉 Yay! Hogya finally.. 🎉</h2>
          {/* <p>Here’s what you filled:</p>
          <ul>
            {Object.entries(answers).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <button onClick={moveNext} className="next-button">Next ➡️</button> */}
        </div>
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div className="form-container">
      <div className="card">
        <h1>💌 Birthday Special Questions</h1>
        <p>{currentQ.question}</p>

        {currentQ.options ? (
          <div className="options">
            {currentQ.options.map(option => (
              <button key={option} onClick={() => handleOptionClick(option)}>{option}</button>
            ))}
          </div>
        ) : (
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your answer..."
            />
            <button onClick={handleNext}>Next ➡️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayForm;