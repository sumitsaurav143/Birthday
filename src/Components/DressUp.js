import React, { useState } from 'react';
import './DressUp.css';

const DressUp = ({ onDressSelected }) => {
  const dresses = [
        process.env.PUBLIC_URL + '/dress1.jpg',
        process.env.PUBLIC_URL + '/dress2.jpg',
        process.env.PUBLIC_URL + '/dress3.jpg',
    //https://www.flipkart.com/dream-tree-women-fit-flare-white-maxi-full-length-dress/p/itm36a50f67d2243?pid=DREH7YYHJCFXB8GQ&lid=LSTDREH7YYHJCFXB8GQDEJQFX&marketplace=FLIPKART&q=dress%20for%20women&sattr[]=size&st=size
    //https://www.flipkart.com/tandul-women-fit-flare-pink-above-knee-mid-thigh-length-dress/p/itm0a675414f91ef?pid=DREGQP4GBAJFSNHG&lid=LSTDREGQP4GBAJFSNHGUPNVWG&marketplace=FLIPKART&q=dress%20for%20women%20pink&sattr[]=size&st=size
    //https://www.flipkart.com/dressar-top-pant-co-ords-set/p/itmc15b3548b54ed?pid=AZTH55FTNHVDVGZT&lid=LSTAZTH55FTNHVDVGZTCLC15A&marketplace=FLIPKART&q=women+cordset&store=clo%2Fl1l&srno=s_3_86&otracker=search&otracker1=search&fm=Search&iid=996aadc6-d6f8-4006-a700-f0838b37a64a.AZTH55FTNHVDVGZT.SEARCH&ppt=sp&ppn=sp&ssid=2ti2fkm1i8mhmry81746543826210&qH=82b868ca30fb51ec
  ];

  const [selectedDress, setSelectedDress] = useState(null);

  const handleSelect = (dress) => {
    setSelectedDress(dress);
  };

  return (
    <div className="dressup-container">
     
      {!selectedDress ? (
        <div className="dresses">
             <h2>👗 Let's get you ready first!</h2>
             <p>Choose your favourite dress among these...</p>
          {dresses.map((dress, index) => (
            <img
              key={index}
              src={dress}
              alt={`Dress ${index + 1}`}
              className="dress-option"
              onClick={() => handleSelect(dress)}
            />
          ))}
        </div>
      ) : (
        <div className="selected-dress-wrapper">
          <img src={selectedDress} alt="Selected Dress" className="selected-dress" />
          <p>You'll look pretty my love! 😘✨</p>
          <button className="card clickable" onClick={()=>onDressSelected()}>Lets go for ride in your favourite car 🚗</button>
        </div>
      )}
    </div>
  );
};

export default DressUp;