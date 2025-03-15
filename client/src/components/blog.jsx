import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {

  const aboutus = useRef(null);
  const cofounder=useRef(null);
  const technology = useRef(null);
  const line= useRef(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const about = aboutus.current;
    const founder = cofounder.current;
    const tech = technology.current;
    const liss = line.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: liss,
        start: '50% 50%',  // Start the animation when the top of the element is at the top of the viewport
        end: '60% 60%', // End the animation when the bottom of the element reaches the top of the viewport
        scrub: 3,
      },
    });

    tl.to(about, {
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    })
      .to(founder, {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      })
      .to(founder,{
        opacity: 0,
        duration: 5,
        ease: 'power1.inOut',
      });
    const tll= gsap.timeline({
      scrollTrigger: {
        trigger: liss,
        start: '50% 15%',  // Start the animation when the top of the element is at the top of the viewport
        end: '60% 60%', // End the animation when the bottom of the element reaches the top of the viewport
        scrub: 3,
      },
    });
    tll.to(founder, {
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    })
      .to(tech, {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      });

    

  }, []);

  return (
    <div className=" h-full w-screen">
      <div className="h-full w-screen flex flex-wrap">
        <div className=" w-1/3 flex -z-50">
        
          <div ref={line} className="line h-[178%] w-[1.5%] bg-black rounded-2xl left-[17%] relative -z-40"></div>
          <div className="h-12 w-12 rounded-full absolute left-[4.42%] top-[45%] bg-green-500"></div>
          <div className="h-[12%] w-[20%] absolute top-[42%] rounded-2xl border-white border-[2px] left-[10%] pl-5 pt-3">
            <h1 className='text-[250%] font-mono font-extrabold text-white'>About's Us</h1>
          </div>
          <div className="h-12 w-12 rounded-full absolute left-[4.42%] top-[85%] bg-green-500"></div>
          <div className="h-[12%] w-[20%] absolute top-[82%] rounded-2xl border-white border-[2px] left-[10%] pl-5 pt-3">
            <h1 className='text-[250%] font-mono font-extrabold text-white'>Co-founder</h1>
          </div>
          <div className="h-12 w-12 rounded-full absolute left-[4.42%] top-[125%] bg-green-500"></div>
          <div className="h-[12%] w-[20%] absolute top-[122%] rounded-2xl border-white border-[2px] left-[10%] pl-5 pt-3">
            <h1 className='text-[225%] font-mono font-extrabold text-white'>Technology</h1>
          </div>
          
          <div className="h-52 w-full bg-[#181a2f] fixed"></div>
          <div className="h-52 w-full bg-[#181a2f] bottom-0 fixed"></div>
          <div className="h-screen w-[3.5%] absolute bg-[#181a2f]"></div>
          <div className="h-screen w-[25%] absolute bg-[#181a2f] right-0"></div>
        </div>
        <div className="right-box h-screen w-2/3 flex justify-center items-center">
          <div className=" h-3/4 w-[50%] rounded-2xl border-[2px] border-white fixed">
          <h1 ref={aboutus} className=' text-white p-4 text-xl absolute opacity-1'>
            <p>Welcome to our revolutionary learning platform, designed to make exam preparation smarter, faster, and more efficient. Our mission is to empower students and learners by providing a comprehensive system to test and strengthen their knowledge, one topic at a time.</p>
            <br />
            <p>Our project allows users to prepare for any exam by offering topic-wise MCQ tests tailored to specific subjects. Whether you want to master a single topic or assess your understanding across multiple areas, our platform ensures an engaging and focused learning experience. By testing concepts in bite-sized portions, you can identify areas of improvement and gain confidence in your knowledge.</p>
            <br />
            <p>We are dedicated to continuously expanding our platform by adding diverse topics to cater to a wide range of exams and disciplines. Our vision is to take this project to new heights, transforming the way learners prepare and helping them achieve their goals with ease. With user-friendly features, real-time feedback, and a growing library of questions, we strive to make learning accessible and effective for everyone.</p>
          </h1>
          <h1 ref={cofounder} className='text-white p-4 text-[17px] absolute opacity-0'>
            <p>As co-founders of this platform, We are driven by a shared vision to revolutionize the way students prepare for exams. We believe that effective learning starts with understanding your strengths and identifying areas for improvement, one step at a time. This belief is what inspired us to create a platform that empowers learners to test their concepts topic by topic, ensuring that no stone is left unturned in their journey toward success.</p>
            <br />
            <p>Our goal is to provide not just a tool but a complete learning experience—one that adapts to your needs, motivates you to push your limits, and helps you achieve your dreams. From curated topic-wise MCQ tests to a user-friendly interface, every aspect of this platform is designed with you in mind.</p>
            <br />
            <p>We are committed to continuously evolving and expanding this project, adding more topics, features, and innovations that make exam preparation accessible and effective for everyone. This is just the beginning. Together, with your feedback and support, we aim to take this platform to extraordinary heights and make it a trusted companion for learners worldwide.</p>
            <br />
            <p>Thank you for being part of this journey. Let’s redefine learning, together.</p>
            <p></p>
          </h1>
          <h1 ref={technology} className='text-white p-4 flex justify-center items-center gap-9 pt-16 flex-wrap opacity-0'>
            <img className='w-[20%] rounded-2xl object-contain' src="https://camo.githubusercontent.com/e7206b9bac704d30a9f61ede0b1ff6b6b927d0d61ce26719a81833ad4185f60f/68747470733a2f2f69636f6e732e69636f6e617263686976652e636f6d2f69636f6e732f636f726e6d616e7468653372642f706c65782f3531322f4f746865722d68746d6c2d352d69636f6e2e706e67"/>
            <img className='w-[20%] rounded-2xl object-contain' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Official_CSS_Logo.svg/1024px-Official_CSS_Logo.svg.png" />
            <img className='w-[20%] rounded-2xl object-contain' src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" />
            <img className='w-[20%] rounded-2xl object-contain' src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="" />
            <img className='w-[20%] rounded-2xl object-contain bg-red-50' src="https://img.icons8.com/color/512/express-js.png" alt="" />
            <img className='w-[20%] rounded-2xl object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Jqy_joxyuPEsHWadt48KNQE0WcRK4j40RQ&s" alt="" />
            <img className='w-[20%] rounded-2xl object-contain' src="https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png" alt="" />
            <img className='w-[20%] object-contain' src="https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo-thumbnail.png" alt="" />
          </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
