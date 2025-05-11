import React, { useEffect, useRef, useState } from 'react';
import './CandleCake.css';

const CandleCake = ({ isBlown, setIsBlowing }) => {
  const cakeRef = useRef(null);

  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let intervalId;

    function isBlowing() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      return average > 40;
    }

    function blowOutCandle() {
      if (!isBlown && isBlowing()) {
        setIsBlowing(true);
        clearInterval(intervalId); // 🛑 Stop checking once blown
      }
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          intervalId = setInterval(blowOutCandle, 200);
        })
        .catch(err => console.log("Microphone access denied:", err));
    }

    return () => {
      if (audioContext) audioContext.close();
      if (intervalId) clearInterval(intervalId); // 🧹 Cleanup on unmount
    };
  }, [isBlown]);

  return (
    <div>
      <div className="cake" ref={cakeRef}>
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className={`candle center-candle ${isBlown ? 'out' : ''}`}>
          {!isBlown && <div className="flame"></div>}
        </div>
      </div>
      <div className="candleBlowMsg">
        <h3>Candle blow kro baby,<br/> Its your birthday 😘🥳 </h3>
      </div>
    </div>
  );
};

export default CandleCake;