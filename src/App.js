import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import TypewriterText from './TypewriterText';
import DressUp from './Components/DressUp';
import Lottie from "lottie-react";
import balloonAnimation from "./Components/baloons.json";
import CandleCake from './Components/CandleCake'
import emailjs from 'emailjs-com';
import BirthdayForm from './Components/BirthdayForm';
import VirtualGift from './Components/VirtualGift';
import MemoryTimeline from './Components/MemoriesTimeline';


function App() {
  const dressUrlMap = {
    "/Birthday/dress1.jpg": "https://www.flipkart.com/tandul-women-fit-flare-pink-above-knee-mid-thigh-length-dress/p/itm0a675414f91ef?pid=DREGQP4GBAJFSNHG&lid=LSTDREGQP4GBAJFSNHGUPNVWG&marketplace=FLIPKART&q=dress%20for%20women%20pink&sattr[]=size&st=size",
    "/Birthday/dress2.jpg": "https://www.flipkart.com/dressar-top-pant-co-ords-set/p/itmc15b3548b54ed?pid=AZTH55FTNHVDVGZT&lid=LSTAZTH55FTNHVDVGZTCLC15A&marketplace=FLIPKART&q=women+cordset&store=clo%2Fl1l&srno=s_3_86&otracker=search&otracker1=search&fm=Search&iid=996aadc6-d6f8-4006-a700-f0838b37a64a.AZTH55FTNHVDVGZT.SEARCH&ppt=sp&ppn=sp&ssid=2ti2fkm1i8mhmry81746543826210&qH=82b868ca30fb51ec",
    "/Birthday/dress3.jpg": "https://www.flipkart.com/dream-tree-women-fit-flare-white-maxi-full-length-dress/p/itm36a50f67d2243?pid=DREH7YYHJCFXB8GQ&lid=LSTDREH7YYHJCFXB8GQDEJQFX&marketplace=FLIPKART&q=dress%20for%20women&sattr[]=size&st=size"
  };

  const birthdate = 'May 7';
  const [timeLeft, setTimeLeft] = useState({});
  const [phase, setPhase] = useState('countdown');
  const canvasRef = useRef(null);
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [showYes, setShowYes] = useState(false);
  const [selectedDress, setSelectedDress] = useState(null);
  const phaseRef = useRef(phase);
  const [answers, setAnswers] = useState({});
  const [shouldSendEmail, setShouldSendEmail] = useState(false);
  const [seenMemories, setSeenMemories] = useState(false);

  const [user, setUser] = useState({
    name: "Archi",
    age: 27,
    birthday: "July 7, 2025",
    location: "Kolkata, India",
    occupation: "Fashion Designer",
    memoriesSeen: null,
    giftClaimed: null,
    favoriteDress: null,
    favoriteUrl: null,
    driveOption: null,
    formAnswers: null
  });

  const requestAudioAndMicAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      await audioCtx.resume();
      console.log("Microphone and audio context access granted.");
      return stream;
    } catch (err) {
      console.error("Permission denied:", err);
      alert("Microphone and sound access are required for the full experience.");
    }
  };

  const sendEmail = () => {


    console.log("User data to be sent:", user);

    emailjs.send('service_uh2pczx', 'template_4r2i0uv', user, 'rQ0nyQ4UBr8rSIUrE')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  useEffect(() => {
    if (phase === 'driving') {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    phaseRef.current = phase;
  }, [phase]);


  const birthdayMessage = `
 Aaj ka din tumhara hai, aur main bas itna kehna chahta hoon — tum meri life ka sabse pyaara hissa ho. 😊 Tumhari smile sabse khaas hai, aur tumhara saath hi meri khushi hai. Chalo, aaj ka din milke enjoy karte hain. 🎂❤️
  `;

  useEffect(() => {
    if (shouldSendEmail) {
      sendEmail();
      setShouldSendEmail(false);
    }
  }, [shouldSendEmail]);


  useEffect(() => {

    requestAudioAndMicAccess();

    const updateCountdown = () => {

      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(`${birthdate}, ${currentYear} 22:32:00`);


      const diff = birthday - now;

      console.log("diff", diff, now > birthday);

      if (now > birthday) {
        setPhase('ready');

        setTimeout(() => setShowYes(true), 2000);

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

  const onDressSelected = () => {
    setPhase('sit');
    setUser(prevState => ({
      ...prevState,
      favoriteDress: selectedDress,
      favoriteUrl: dressUrlMap[selectedDress] || null
    }));
  }

  const setForm = () => {
    setPhase('form');
    setUser(prevState => ({
      ...prevState,
      giftClaimed: 'yes'
    }));
  }

  const setMemo = () => {
    setPhase('memories');
  }

  const setGift = () => {
    setPhase('giftbox');
      setUser(prevState => ({
      ...prevState,
      memoriesSeen: 'yes'
    }));
  }


  const moveNext = () => {
    setUser(prevState => ({
      ...prevState,
      formAnswers: JSON.stringify(answers, null, 2)
    }));
    setShouldSendEmail(true);
  };

  const showDress = () => {
    setPhase('dressup');
  }

  function setIsBlowing(x) {
    setIsBlown(x);
    const BALLOON_DELAY = 1000;
    const CELEBRATION_DELAY = 5000;

    setTimeout(() => {
      setPhase('baloon');
      setTimeout(() => {
        setShowCake(true);
        setPhase('celebration');
      }, CELEBRATION_DELAY);
    }, BALLOON_DELAY);
  }

  const startDrive = () => {
    console.log("startDrive-PHASE:", phaseRef.current);
    if (phaseRef.current !== 'ride') {
      setUser(prev => ({
        ...prev,
        driveOption: 'You 🙋🏻‍♂️',
      }));
    }
    setPhase('driving');
    const audio = document.getElementById("chalo-music");
    if (audio) {
      audio.play().catch(err => console.log("Autoplay failed:", err));
    }
    setTimeout(() => setPhase('prompt'), 5000);
  };

  const startDriving = () => {
    console.log("startDriving-PHASE:", phaseRef.current);
    setUser(prev => ({
      ...prev,
      driveOption: 'Me 💁🏼‍♀️',
    }));
    setPhase('ride');
    setTimeout(() => { startDrive(); }, 5000);
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
      {/* 1st Phase */}
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

      {/* 2nd  Phase */}
      {phase === 'ready' && (
        <div className="card">
          <TypewriterText text="Reeady for Surprise Baby?" lineDelay={1200} charDelay={40} />
          {showYes ?
            <button className="card clickable" onClick={showDress}>
              <h2>Haa 🥳</h2>
            </button> : null}
        </div>
      )}

      {/* 3rd  Phase */}
      {phase === 'dressup' && (
        <DressUp selectedDress={selectedDress} setSelectedDress={setSelectedDress} onDressSelected={onDressSelected} />
      )}

      {/* 4th  Phase */}
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

      {/* 5th  Phase */}
      {phase === 'ride' && (
        <div className="card">
          <TypewriterText text="Bkkolu, car chalane aata h tumko? Mujhe chalane do, tm araam kro jaan... 😂😘" lineDelay={1200} charDelay={40} />
        </div>
      )}

      {/* 6th  Phase */}
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

      {/* 7th  Phase */}
      {phase === 'prompt' && (
        <>
          <h1 className="card">Pahunch gae ghar,<br />Ready for Surprise Love? </h1>

          <button className="card clickable" onClick={openDoor}>
            <h2>Haa 🥳</h2>
          </button>
        </>
      )}

      {/* 8th  Phase */}
      {phase === 'sinchain' && (
        <>
          <img src={process.env.PUBLIC_URL + '/sin.gif'}></img>
        </>
      )}

      {/* 9th  Phase */}
      {phase === 'celebration' && (
        <>
          {showCake ? (
            <div className="card celebration-card">
              <h2 className="birthday-heading">🎉 Happy 27th Birthday, My Love! 🎂</h2>
              <TypewriterText text={birthdayMessage} lineDelay={1200} charDelay={100} />
              <button onClick={setMemo}>Next ➡️</button>
            </div>
          ) : (
            <CandleCake isBlown={isBlown} setIsBlowing={setIsBlowing} />
          )}

        </>
      )}

      {/* 10th  Phase */}
      {phase === 'baloon' && (
        <div style={{ width: 500, height: 1000, position: 'relative' }}>
          {/* Background balloon animation */}
          <Lottie animationData={balloonAnimation} loop={false} />

          {/* Image in between balloons (centered) */}
          <img
            src={process.env.PUBLIC_URL + '/dress1.jpg'}
            alt="Between Balloons"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 200,
              height: 200,
              borderRadius: '50%',
              zIndex: 1,
            }}
          />
        </div>
      )}

      {/* 11th  Phase */}
      {phase === 'memories' && (
        <MemoryTimeline setGift={setGift} />
      )}

      {/* 12th  Phase */}
      {phase === 'giftbox' && (
       <VirtualGift setForm={setForm}/>
      )}

      {/* 13th  Phase */}
      {phase === 'form' && (
        <BirthdayForm answers={answers} setAnswers={setAnswers} moveNext={moveNext} />
      )}


      <audio id="birthday-music">
        <source src="happy-birthday-song.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
}

export default App;