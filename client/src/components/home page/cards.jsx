import { motion, useAnimation } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

function Featured() {
    const cards = [useAnimation(), useAnimation()];
    const scrollRef = useRef(null);

    // Initialize Locomotive Scroll
    useEffect(() => {
        const locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
        });

        return () => {
            locomotiveScroll.destroy();
        };
    }, []);

    const handleHover = (index) => {
        cards[index].start({ y: "0" });
    };

    const handleHoverEnd = (index) => {
        cards[index].start({ y: "100%" });
    };

    return (
        <div ref={scrollRef} className="w-full py-10 text-white" data-scroll data-scroll-speed="-0.1">
            <div className="w-full px-20 border-b-[1px] border-zinc-700 pb-14">
                <h1 className="text-[5vw] tracking-tight font-[playpen-sans-uniuqe] font-light">GenrE</h1>
            </div>
            <div className="flex justify-center font-[Chicle]">
                <div className="cards w-[90vw] flex gap-5 mt-10">
                    {/* Aptitude Card */}
                    <motion.div 
                        onHoverStart={() => handleHover(0)} 
                        onHoverEnd={() => handleHoverEnd(0)} 
                        className="cardcontainer relative w-[48%] h-[80vh]"
                    >
                        <h1 className="apti absolute flex text-[green] font-medium overflow-hidden right-0 translate-x-1/2 top-1/2 -translate-y-1/2 leading-none z-[9] text-[3vw]">
                            {"AptiTude".split('').map((item, index) => (
                                <motion.span 
                                    key={index} // Add a unique key
                                    initial={{ y: "100%" }}
                                    animate={cards[0]}
                                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                                    className="inline-block"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="card w-[100%] h-full rounded-xl overflow-hidden">
                            <img className="w-[100%] h-full bg-cover" src="./images/apti.jpeg" alt="Aptitude" />
                        </div>
                    </motion.div>

                    {/* Coding Card */}
                    <motion.div 
                        onHoverStart={() => handleHover(1)} 
                        onHoverEnd={() => handleHoverEnd(1)} 
                        className="cardcontainer relative w-[48%] h-[80vh]"
                    >
                        <h1 className="coding absolute overflow-hidden flex text-[green] font-medium right-full translate-x-1/2 top-1/2 -translate-y-1/2 leading-none z-[9] text-[3vw]">
                            {"Coding".split('').map((item, index) => (
                                <motion.span 
                                    key={index} // Add a unique key
                                    initial={{ y: "100%" }}
                                    animate={cards[1]}
                                    transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                                    className="inline-block mix-blend-color"
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </h1>
                        <div className="card w-[100%] rounded-xl h-full overflow-hidden">
                            <img className="w-[100%] h-full bg-cover" src="./images/vscode.jpeg" alt="Coding" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
