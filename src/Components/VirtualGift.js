import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './VirtualGift.css';
import confetti from 'canvas-confetti';


const VirtualGift = ({ setForm }) => {
    const [opened, setOpened] = useState(false);
    const canvasRef = useRef(null);

    const photoUrls = [
        "https://giftbig.s3.amazonaws.com/microsite/product/EGVGBFLSCLPS001/d/small_image/109_spayapi.png?appId=974"
    ];

    const canvaConfetti = () => {
        const canvas = canvasRef.current;
        const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
        myConfetti({ particleCount: 300, spread: 180, origin: { y: 0.6 } });
    }

    return (

        <div className="gift-container">
            <canvas id="confetti-canvas" ref={canvasRef}></canvas>
            {!opened ? (
                <div className="gift-box" onClick={() => {
                    canvaConfetti();
                    setOpened(true)
                }}>
                    <img src="https://pixcap.com/cdn/library/templates/81d326d7-ce94-4bb2-ac48-4f664ddc4618/thumbnail/35c2ddd7-b890-4123-bdca-9915f29a1fd2_transparent_null_400.webp" alt="Gift Box" className="gift-image" />
                    <p className="tap-text" >🎁 Tap to Open Your Gift</p>
                </div>
            ) : (
                <>
                    <div className="carousel-wrapper">
                        <h2 className="carousel-heading">Yay! A gift coupan for you!</h2>
                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                        >
                            {photoUrls.map((url, index) => (
                                <SwiperSlide key={index}>
                                    <img src={url} alt={`Memory ${index + 1}`} className="carousel-image" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <button className="card clickable" onClick={() => {
                        setForm();
                    }
                    }>Next</button>
                </>
            )}
        </div>


    );
};

export default VirtualGift;