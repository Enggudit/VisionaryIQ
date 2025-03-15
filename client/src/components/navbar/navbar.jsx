import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link from react-router-dom
import { gsap } from 'gsap';
// No need for ScrollTrigger in this code if you're not using it here

function Navbar() {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const section = useRef(null);
    const animate = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsHidden(scrollTop > lastScrollTop);
            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    useEffect(() => {
        const nvmenu = section.current;
        const ani = animate.current;

        // GSAP animation setup
        const tll = gsap.timeline();
        tll.to(ani, {
            height: '23vh',
            display: 'block',
            opacity: 1,
            duration: 0.5,
        }).to(ani, {
            opacity: 1,
            display: 'block',
            duration: 0.5,
        }, "-=0.5");

        tll.pause();

        // Show animation on hover
        const handleMouseEnter = () => {
            tll.play();
        };

        // Reverse the animation on mouse leave
        const handleMouseLeave = () => {
            tll.reverse();
        };

        nvmenu.addEventListener('mouseenter', handleMouseEnter);
        nvmenu.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            nvmenu.removeEventListener('mouseenter', handleMouseEnter);
            nvmenu.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <nav className={`fixed top-0 left-0 w-full z-[999] text-white p-4 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
                <ul className="navbar flex justify-center space-x-4 text-white text-xl gap-[4%] flex-wrap">
                    <li><Link to="/" className="border-zinc-500 border-[0.1px] rounded-full px-4">Home</Link></li>
                    <li ref={section} className="relative group">
                        <a className="sections border-zinc-500 border-[0.1px] rounded-full px-4 font-normal">Section's</a>
                        <div ref={animate} className="nav-con bg-transparent text-center mt-1 w-44 border-zinc-900 border-[2px] hidden rounded-lg h-[0] text-2xl pt-2 absolute overflow-hidden">
                            <Link to="/Aptitude/topic/question"><div className='app mb-3 font-light'>Aptitude</div></Link>
                            <Link to="/Coding"><div className='app mb-3 font-light'>Coding</div></Link>
                            <Link to="/Verbal"><div className='app mb-3 font-light'>Verbal</div></Link>
                            
                        </div>
                    </li>
                    <li><Link to="/AboutUs" className="border-zinc-500 border-[0.1px] rounded-full px-4">Blog's</Link></li>
                        <li><Link to="#" onClick={() => window.open('https://discord.com/channels/1289138672461156469/1289138672997761055', '_blank')} className="border-zinc-500 border-[0.1px] rounded-full px-4"> Community</Link>
</li>

                    <li><a href="/#footer" className="meetup border-zinc-500 border-[0.1px] rounded-full px-4">MeetUp</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
