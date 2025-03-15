import React, { useState, useEffect } from "react";
import 'remixicon/fonts/remixicon.css';
import { motion } from "framer-motion";

function Home() {
    const [scrollDirection, setScrollDirection] = useState("down");

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        // Function to determine scroll direction
        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            if (scrollY > lastScrollY) {
                setScrollDirection("down");
            } else if (scrollY < lastScrollY) {
                setScrollDirection("up");
            }
            lastScrollY = scrollY;
        };

        // Add scroll event listener
        window.addEventListener("scroll", updateScrollDirection);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        };
    }, []);

    return (
        <div className="bg-green-900 w-full h-[50vh] rounded-xl overflow-hidden" data-scroll data-scroll-speed="0.1">
            <div className="group text-white text-[15vw] flex">
                <div className="h-[35vh] mt-[7vh] flex whitespace-nowrap justify-center items-center border-t-4 border-b-4">
                    <motion.h1
                        initial={scrollDirection === "down" ? { x: "0" } : { x: "-100%" }}
                        animate={scrollDirection === "down" ? { x: "-100%" } : { x: "0%" }} // Animate based on scroll direction
                        transition={{ repeat: Infinity, ease: "linear", duration: 4}}
                        className="flex"
                    >
                        VisionaryIQ
                        <motion.span
                            initial={{ rotate: 0, scale: 1 }}
                            animate={scrollDirection === "down" ? { rotate: 270, scale: 1 } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <i className="ri-arrow-right-up-fill"></i>
                        </motion.span>
                    </motion.h1>
                    <motion.h1
                        initial={scrollDirection === "down" ? { x: "0" } : { x: "-100%" }}
                        animate={scrollDirection === "down" ? { x: "-100%" } : { x: "0%" }} // Animate based on scroll direction
                        transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
                        className="flex"
                    >
                        VisionaryIQ
                        <motion.span
                            initial={{ rotate: 0, scale: 1 }}
                            animate={scrollDirection === "down" ? { rotate: 270, scale: 1 } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <i className="ri-arrow-right-up-fill"></i>
                        </motion.span>
                    </motion.h1>
                </div>
            </div>
        </div>
    );
}

export default Home;
