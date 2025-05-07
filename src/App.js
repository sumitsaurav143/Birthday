import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import TypewriterText from './TypewriterText';
import DressUp from './Components/DressUp';
import Lottie from "lottie-react";
import balloonAnimation from "./Components/baloons.json";
import CandleCake from './Components/CandleCake'

function App() {
  const birthdate = 'May 4';
  const [timeLeft, setTimeLeft] = useState({});
  const [phase, setPhase] = useState('countdown'); // countdown | dressup | sit | driving | prompt | celebration
  const canvasRef = useRef(null);
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isBlown, setIsBlown] = useState(false);

  const requestAudioAndMicAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      await audioCtx.resume();
      console.log("Microphone and audio context access granted.");
      return stream; // You can use this stream later
    } catch (err) {
      console.error("Permission denied:", err);
      alert("Microphone and sound access are required for the full experience.");
    }
  };

  useEffect(() => {
    if (phase === 'driving') {
      setShowMessage(true);
      const audio = document.getElementById("chalo-music");
      if (audio) {
        audio.play().catch((err) => {
          console.log("Autoplay failed:", err);
        });
      }
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

  }, [phase]);

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

    requestAudioAndMicAccess();

    const updateCountdown = () => {

      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(`${birthdate}, ${currentYear} 11:36:00`);


      const diff = birthday - now;

      console.log("diff", diff, now > birthday);

      if (now > birthday) {
        setPhase('dressup');
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

  function setIsBlowing(x) {
    setIsBlown(x);
    console.log("cake blowed!")
    const BALLOON_DELAY = 1000;
    const CELEBRATION_DELAY = 3000;

    setTimeout(() => {
      setPhase('baloon');
      setShowCake(true);

      setTimeout(() => {
        setPhase('celebration');
      }, CELEBRATION_DELAY);
    }, BALLOON_DELAY);
  }

  const startDrive = () => {
    setPhase('driving');
    setTimeout(() => setPhase('prompt'), 5000); // slow drive, wait longer
  };

  const startDriving = () => {
    setPhase('ride');
    setTimeout(() => startDrive(), 5000); // slow drive, wait longer
  };

  const openDoor = () => {
    setPhase('sinchain');
    setTimeout(() => {
      setPhase('celebration');
      const audio = document.getElementById('birthday-music');
      if (audio) {
        audio.play().catch((err) => console.log("Playback failed:", err));
      }
      const canvas = canvasRef.current;
      const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
      myConfetti({ particleCount: 300, spread: 180, origin: { y: 0.6 } });
    }, 3000);
  };

  return (
    <div className="App">
      <canvas id="confetti-canvas" ref={canvasRef}></canvas>

      {phase === 'countdown' && (
        <div className="card">
          <h1>🎉 Surprise Countdown 🎉</h1>
          <p>Wait till {birthdate}...</p>
          <div className="countdown">
            <div className="time-box"><span>{timeLeft.days || 0}</span><span>Days</span></div>
            <div className="time-box"><span>{timeLeft.hours || 0}</span><span>Hours</span></div>
            <div className="time-box"><span>{timeLeft.minutes || 0}</span><span>Minutes</span></div>
            <div className="time-box"><span>{timeLeft.seconds || 0}</span><span>Seconds</span></div>
          </div>
        </div>
      )}

      {phase === 'dressup' && (
        <DressUp onDressSelected={() => setPhase('sit')} />
      )}

      {phase === 'sit' && (
        <>
          <h2>Will you drive or shall I? 🚗</h2>
          <div className="card clickable" onClick={startDrive}>
            <h2>You 🙋🏻‍♂️</h2>
          </div>
          <div className="card clickable" onClick={startDriving}>
            <h2>Me 💁🏼‍♀️</h2>
          </div>
        </>
      )}
      {phase === 'driving' && (
        <div className="road-container">
          <div className="road" />
          <img
            src="https://cdn-icons-png.freepik.com/512/3063/3063736.png"
            alt="Home"
            className="home-right"
          />

          <div className="car-wrapper moving">
            {showMessage && (
              <div className="speech-bubble">Chalo...</div>
            )}
            <img
              src="https://png.pngtree.com/png-vector/20240624/ourmid/pngtree-range-rover-png-image_12839620.png"
              alt="Car"
              className="car"
            />
          </div>

          <audio id="chalo-music" autoPlay>
            <source src="chalo.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}

      {phase === 'ride' && (
        <div className="card">
          <TypewriterText text="Bkkolu, car chalane aata h tumko? Mujhe chalane do, tm araam kro 😂😘" lineDelay={1200} charDelay={40} />
        </div>
      )}

      {phase === 'prompt' && (
        <>
          <h2>🚪 Pahunch gae ghar, gate kholu baby? 🚪 </h2>
          <div className="card clickable" onClick={openDoor}>
            <p>Haa! 🥳</p>
          </div>
        </>
      )}

      {phase === 'sinchain' && (
        <>
          <img src={process.env.PUBLIC_URL + '/sin.gif'}></img>
        </>
      )}

      {phase === 'baloon' && (
        <>
          <div style={{ width: 500, height: 1000 }}>
            <Lottie animationData={balloonAnimation} loop={false} />
          </div>
        </>
      )}



      {phase === 'celebration' && (
        <>
          {showCake ? (
            <div className="card celebration-card">
              <h2 className="birthday-heading">🎉 Happy 27th Birthday, My Love! 🎂</h2>
              <TypewriterText text={birthdayMessage} lineDelay={1200} charDelay={100} />
            </div>
          ) : (
            <CandleCake isBlown={isBlown} setIsBlowing={setIsBlowing} />
          )}

          <audio id="birthday-music" autoPlay>
            <source src="happy-birthday-song.mp3" type="audio/mpeg" />
          </audio>
        </>
      )}

    </div>
  );
}

export default App;