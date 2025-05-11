import React, { useState } from "react";
import "./MemoriesTimeline.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faPlay } from '@fortawesome/free-solid-svg-icons';

const memories = [
    {
        date: "July 6, 2018",
        message: "First time i saw you at this place and I felt something magical like never before.",
        media: process.env.PUBLIC_URL + "/memories/dance.mp4",
        type: "video",
    },
    {
        date: "Jan 21, 2020",
        message: "We met for the first time in Ranchi (Kake Dam) & did Boat Riding 💌",
        media: process.env.PUBLIC_URL + "/memories/met.jpg",
        type: "image",
    },
    {
        date: "Jan 21, 2020",
        message: "Our first lunch date 🍝 [Noodles & Manchurian]",
        media: process.env.PUBLIC_URL + "/memories/noodle2.jpg",
        type: "image",
    },
    {
        date: "Jan 21, 2020",
        message: "Went to O2 Park & had a great time together 🌳 (I secretly kissed you but you didn't noticed 😜)",
        media: process.env.PUBLIC_URL + "/memories/jhula.jpg",
        type: "image",
    },
    {
        date: "March 18, 2020",
        message: "Covid came and we can't meet again due to lockdown, you fight & blocked me as well for 2 weeks because i ask if you have feeling for me and some silly questions, you blocked me and told 'aisa kuch nhi hai, faltu ki bakwas nhi kro, mai ja rhi hu!' 🥲",
        media: null,
        type: "image",
    },
    {
        date: "Apr 14, 2020",
        message: "You Unblocked me and It was my birthday and you wished me, I was so happy to hear that. You told me that you like me but you are not sure about your feelings.",
        media: null,
        type: "image",
    },
        {
        date: "Apr 18, 2020",
        message: "We played funny games and shared each others view.",
        media: process.env.PUBLIC_URL + "/memories/game.jpg",
        type: "image",
    },
    {
        date: "Apr 20, 2020",
        message: "After 2days, I Proposed you on instagram and you accepted it, I was so happy that day. 😍🥰",
        media: null,
        type: "image",
    },
    {
        date: "Apr 21, 2020",
        message: "Our first video call after proposal, You looked so nervous and beautiful too on that day. I can't forget your smile. 😘",
        media: process.env.PUBLIC_URL + "/memories/vdoCall.jpg",
        type: "image",
    },
    {
        date: "Jun 13, 2020",
        message: "Started talking day and night, sharing our dreams and secrets. You are my best friend and my love. 💖, Our funny chat from that day..",
        media: process.env.PUBLIC_URL + "/memories/chat.jpg",
        type: "image",
    },
    {
        date: "Jun 20, 2020",
        message: "Our first online game together, we played ludo and you won. I was so happy to see you happy. 🎲",
        media: process.env.PUBLIC_URL + "/memories/ludo.jpg",
        type: "image",
    },
    {
        date: "Jan 31, 2021",
        message: "Lockdown ended, I booked ticket of Ranchi & so excited to meet you as my official girlfriend ❤️",
        media: process.env.PUBLIC_URL + "/memories/firstMeet.jpg",
        type: "image",
    },
    {
        date: "Feb 12, 2021",
        message: "Started missing each other already after meetup 🙂",
        media: process.env.PUBLIC_URL + "/memories/missing.jpg",
        type: "image",
    },
    {
        date: "March 10, 2021",
        message: "Your funny faces I loved the most over Videocalls 🙂",
        media: process.env.PUBLIC_URL + "/memories/funnyvc.jpg",
        type: "image",
    },
    {
        date: "Aug 22, 2021",
        message: "You shifted to Kolkata and we met again. We had a great time together. 🌳",
        media: process.env.PUBLIC_URL + "/memories/kol1.jpeg",
        type: "image",
    },
    {
        date: "Dec 14, 2021",
        message: "Again i came back to kolkata to meet again. Went to Isckon temple for krishna ji blessings and had this moment captured while clicking picture as sath me hamare koi nhi tha hamara sath me pic click krne k liye 😂 🥰",
        media: process.env.PUBLIC_URL + "/memories/iskon.MOV",
        type: "video",
    },
    {
        date: "Mar 20, 2022",
        message: "Tumne apna dance video share kiya tha and what i did with this 🤣😆",
        media: process.env.PUBLIC_URL + "/memories/bulludance.mp4",
        type: "video",
    },
    {
        date: "May 27, 2022",
        message: "Surprsie visit to Kolkata to meet you before going to hyderabad. Remembered?😍",
        media: null,
        type: "image",
    },
    {
        date: "May 28, 2022",
        message: "Went to waterpark first time with you and have enjoyed a lot.",
        media: null,
        type: "image",
    },
    {
        date: "Jul 7, 2022",
        message: "Celebrated you birthday online. Kyuki aa nhi sakta tha 😅🎂",
        media: process.env.PUBLIC_URL + "/memories/cake.jpg",
        type: "image",
    },
];

export default function MemoryTimeline({setGift}) {
    const [selectedMedia, setSelectedMedia] = useState(null);

    const handleMediaClick = () => {
        setGift();
    }

    return (
        <>
            <div className="timeline-container">
                <h2 className="timeline-title">💖 Our Journey Together 💖</h2>
                <div className="timeline">
                    {memories.map((item, index) => (
                        <div key={index} className="memory-wrapper">
                            <div className="timeline-line">
                                <div className="timeline-dot" />
                                {index !== memories.length - 1 && <div className="timeline-arrow">↓</div>}
                            </div>

                            <div className="memory-card">
                                <div className="memory-date">{item.date}</div>
                                <div className="memory-message">{item.message}</div>

                                {item.type === 'video' ? (
                                    <div className="memory-thumbnail-wrapper" onClick={() => setSelectedMedia(item)}>
                                        <video
                                            src={item.media}
                                            className="memory-thumbnail"
                                            muted
                                            loop
                                            playsInline
                                        />
                                        <div className="play-icon-overlay"><FontAwesomeIcon icon={faPlay} /></div>
                                    </div>
                                ) : (
                                    item.media !== null && (
                                        <>
                                        <div className="memory-thumbnail-wrapper" onClick={() => setSelectedMedia(item)}>
                                            <img
                                                src={item.media}
                                                alt="memory"
                                                className="memory-thumbnail"
                                            />
                                            <div className="play-icon-overlay"><FontAwesomeIcon icon={faEye} /></div>
                                        </div>
                                        
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="timeline-button" onClick={handleMediaClick}>Next</button>
            </div>

            {selectedMedia && (
                <div className="modal-overlay" onClick={() => setSelectedMedia(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setSelectedMedia(null)}>✖</button>
                        {selectedMedia.media.endsWith('.mp4') || selectedMedia.media.endsWith('.MOV') ? (
                            <video src={selectedMedia.media} controls className="modal-media" />
                        ) : (
                            <img src={selectedMedia.media} alt="full" className="modal-media" />
                        )}
                    </div>
                </div>
            )}

          
        </>
    );
}