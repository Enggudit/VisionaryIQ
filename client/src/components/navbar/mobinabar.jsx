import React, { useEffect, useRef } from "react";
import 'remixicon/fonts/remixicon.css';
import { gsap } from 'gsap';
import { Link } from "react-router-dom";

function Mob() {
    const menuIconRef = useRef(null);
    const fullMenuRef = useRef(null);
    const closeIconRef = useRef(null);
    const sectons = useRef(null);
    const secnav = useRef(null);

    useEffect(() => {
        const fullMenu = fullMenuRef.current;
        const menuIcon = menuIconRef.current;
        const closeIcon = closeIconRef.current;
        const menuItems = fullMenu.querySelectorAll("h1");
        const tl = gsap.timeline({});
        const sect = sectons.current;
        const secna = secnav.current;
        const tll = gsap.timeline({ paused: true });

        // Set initial state
        gsap.set(secna, { height: "0vh", opacity: 0, display: "none" });

        // Animation for expanding/collapsing the section
        tll.fromTo(secna, 
            { height: "0vh", opacity: 0, display: "none" }, 
            { height: "14vh", opacity: 1, display: "block", duration: 0.5 }
        ).reverse(); // Reverse at start so the first click expands it.

        let isReversed = true;  // Start with reversed state (collapsed)

        sect.addEventListener("click", () => {
            if (isReversed) {
                tll.play();  // Expand the section
            } else {
                tll.reverse();  // Collapse the section
            }
            isReversed = !isReversed;  // Toggle the state for the next click
        });

        // Timeline for the full menu animation
        tl.to(fullMenu, {
            opacity: 1,
            right: "0",
            duration: 0.2
        });
        tl.fromTo(menuItems, {
            x: 60,   // Start position
            opacity: 0 // Optional: Set initial opacity if needed
        }, {
            x: 0,    // End position
            opacity: 1, // Optional: End opacity
            duration: 0.2,
            stagger: 0.8
        });

        tl.from(closeIcon, {
            display: "block",
            opacity: 1
        });
        tl.pause();

        menuIcon.addEventListener("click", () => {
            tl.play();
        });
        closeIcon.addEventListener("click", () => {
            tl.reverse();
            tll.reverse();
            isReversed = !isReversed;
        });

    }, []);

    return (
        <>
            <div className="sideNab hidden overflow-hidden">
                <div className="navbar1 text-white relative grid justify-items-end pt-[1vh] pr-[2vw]">
                    <span ref={menuIconRef} className="material-symbols-outlined text-4xl cursor-pointer">menu_open</span>
                </div>
                <div ref={fullMenuRef} className="full bg-zinc-800/50 absolute w-[70vw] h-full p-16 opacity-0 top-0 z-50 backdrop-blur-lg">
                    <a href="/"><h1 className="text-2xl text-white pb-[4vh]">Home</h1></a>
                    <h1 ref={sectons} className="text-2xl text-white pb-[2vh] cursor-pointer">Section's</h1>
                        <div ref={secnav} className="hidden h-0">
                            <Link to="/Aptitude/topic/question"> <h2 className="text-2xl pb-2 text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aptitude</h2></Link>
                            <Link to="/Verbal"><h2 className="text-2xl pb-2 text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Verbal</h2></Link>
                            <Link to="/Coding"><h2 className="text-2xl pb-3 text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Coding</h2></Link>
                        </div>
                    <Link to="#" onClick={() => window.open('https://discord.com/channels/1289138672461156469/1289138672997761055', '_blank')}><h1 className="text-2xl text-white pb-[4vh] pt-[2vh]">Community</h1></Link>
                    <a href="/AboutUs"><h1 className="text-2xl text-white pb-[4vh]">Blogs</h1></a>
                    <a href="/#footer">
                        <h1 className="text-2xl text-white pb-[4vh]">MeetUp</h1>
                    </a>
                    <i ref={closeIconRef} className="ri-close-circle-fill absolute top-[4%] text-white text-5xl right-[15%] cursor-pointer hidden"></i>
                </div>
            </div>
        </>
    );
}

export default Mob;
