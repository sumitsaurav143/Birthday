import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import TypewriterText from './TypewriterText';

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [phase, setPhase] = useState('countdown'); // countdown | sit | driving | prompt | celebration
  const canvasRef = useRef(null);
  const [showCake, setShowCake] = useState(false);

  const birthdayMessage = `
  Aaj ka din sirf tumhara hai... tum ho meri duniya 💖
  27 saal ke ho gaye ho, par tumhari muskurahat aaj bhi meri roshni hai ☀️
  Jab tum hasti ho, dil ko ek sukoon milta hai 😌
  Tumhari baatein hamesha mujhe tumse aur zyada pyaar karne par majboor karti hain ❤️
  🎵 'Tum hi ho... zindagi ab tum hi ho...' 🎶
  Tum ho toh sab kuch hai, tumhare bina sab kuch adhoora hai 💫
  Aaj tumhare liye ek chhoti si khushi lekar aaya hoon, chalo milke celebrate karte hain 🎂
  `;

  useEffect(() => {
    const timer = setTimeout(() => setShowCake(true), 40000); // after 40 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    const updateCountdown = () => {

      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(`July 6, ${currentYear} 23:59:59`);


      const diff = birthday - now;

      console.log("diff", diff, now > birthday);

      if (now > birthday) {
        setPhase('sit');
        clearInterval(timer);
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timer = setInterval(updateCountdown, 1000);

  }, []);

  const startDrive = () => {
    setPhase('driving');
    setTimeout(() => setPhase('prompt'), 5000); // slow drive, wait longer
  };

  const openDoor = () => {
    setPhase('celebration');
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    myConfetti({ particleCount: 300, spread: 180, origin: { y: 0.6 } });

  };

  return (
    <div className="App">
      <canvas id="confetti-canvas" ref={canvasRef}></canvas>

      {phase === 'countdown' && (
        <div className="card">
          <h1>🎉 Surprise Countdown 🎉</h1>
          <p>Wait till 7th July...</p>
          <div className="countdown">
            <div className="time-box"><span>{timeLeft.days || 0}</span><span>Days</span></div>
            <div className="time-box"><span>{timeLeft.hours || 0}</span><span>Hours</span></div>
            <div className="time-box"><span>{timeLeft.minutes || 0}</span><span>Minutes</span></div>
            <div className="time-box"><span>{timeLeft.seconds || 0}</span><span>Seconds</span></div>
          </div>
        </div>
      )}

      {phase === 'sit' && (
        <div className="card clickable" onClick={startDrive}>
          <h2> Let's go for a drive! 🚗</h2>
          <p>Click to begin the journey 🏡</p>
        </div>
      )}

      {(phase === 'driving') && (
        <div className="road-container">
          <div className="road" />
          <img
            src="https://cdn-icons-png.freepik.com/512/3063/3063736.png"
            alt="Home"
            className="home-right"
          />
          <img
            src="https://png.pngtree.com/png-vector/20240624/ourmid/pngtree-range-rover-png-image_12839620.png"
            alt="Car"
            className="car car-drive moving"
          />
        </div>
      )}

      {phase === 'prompt' && (
        <div className="card clickable" onClick={openDoor}>
          <h2>🚪 Shall we open the door madam?</h2>
          <p>Click to open!</p>
        </div>
      )}


      {phase === 'celebration' && (
        <div className="card celebration-card">
          <h2 className="birthday-heading">🎉 Happy 27th Birthday, My Love! 🎂</h2>
          <p>{showCake == true}</p>
          {!showCake ?
            <TypewriterText text={birthdayMessage} lineDelay={1200} charDelay={40} />
            :
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/9193d483500913.5d3ecfc94f929.gif"
              alt="Birthday Cake"
              className="cake glowing-cake"
            />
          }

          <div className="footer-message">Made just for you, with all my heart 💌</div>

          <audio id="birthday-music" autoPlay>
            <source src="happy-birthday-song.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;