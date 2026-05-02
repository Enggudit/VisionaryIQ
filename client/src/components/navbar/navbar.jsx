import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        let lastScrollTop = window.scrollY;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsHidden(scrollTop > lastScrollTop && scrollTop > 20);
            lastScrollTop = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const linkClass = 'block rounded-full border border-zinc-500/70 px-4 py-1 text-white transition-colors duration-300 hover:border-blue-400 hover:text-blue-300';

    return (
        <div className="desktop-nav">
            <nav className={`fixed left-0 top-0 z-[999] w-full px-4 py-3 text-white transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
                <ul className="mx-auto flex w-fit flex-wrap items-center justify-center gap-4 rounded-full border border-white/10 bg-[#181a2f]/75 px-5 py-2 text-xl shadow-lg backdrop-blur-md playwrite-is">
                    <li><Link to="/" className={linkClass}>Home</Link></li>
                    <li className="group relative">
                        <button type="button" className={`${linkClass} font-normal`}>Section&apos;s</button>
                        <div className="invisible absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 overflow-hidden rounded-lg border border-zinc-700 bg-[#181a2f]/95 py-2 text-center text-lg opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:opacity-100">
                            <Link to="/Aptitude/topic/question" className="app block px-4 py-2 font-light text-white transition-colors hover:text-blue-300">Aptitude</Link>
                            <Link to="/Coding" className="app block px-4 py-2 font-light text-white transition-colors hover:text-blue-300">Coding</Link>
                            <Link to="/Verbal" className="app block px-4 py-2 font-light text-white transition-colors hover:text-blue-300">Verbal</Link>
                        </div>
                    </li>
                    <li><Link to="/AboutUs" className={linkClass}>Blog&apos;s</Link></li>
                    <li><Link to="#" onClick={() => window.open('https://discord.com/channels/1289138672461156469/1289138672997761055', '_blank')} className={linkClass}>Community</Link></li>
                    <li><a href="/#footer" className={linkClass}>MeetUp</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
