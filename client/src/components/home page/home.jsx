import React from "react";
import LocomotiveScroll from 'locomotive-scroll';


function home() {
    const locomotiveScroll = new LocomotiveScroll();
    return(
        <div className="relative navbar w-full h-screen flex justify-center"  data-scroll data-scroll-speed="-0.3">
                <div className="main-pic w-full top-[9vh] relative flex">
                    <img className="mainscreen w-[55vw] h-[60%] relative left-[21vw] opacity-0" src="./images/mainscreen.png" alt="" />
                    <img className="leftscreen w-[30vw] h-[40%] absolute  top-[28vh]" src="./images/leftscreen.png" alt="" />
                    <img className="rightscreen w-[27vw] h-[35%] absolute  top-[20vh]" src="./images/rightscreen.png" alt="" />
                    <img className="boy w-[15vw] h-[100%] absolute left-[42vw] top-[12vh]" src="./images/boy.png" alt="" />
                </div>
                <div className="abouts text-white bg-zinc-500/30 rounded-r-xl h-[13vh] absolute left-0 bottom-[8vh]">
                    <h1 className="text-5xl pl-[2vw] font-mono">Visionary<span className="">IQ &nbsp;</span></h1>
                    <h3 className="pl-[4vw] text-2xl leading-[18px]">It's for practice a Test's</h3>
                </div>
                <div className="bg-transparent h-screen w-full top-[9vh] absolute"></div>
        </div>
    )
}

export default home