import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import "remixicon/fonts/remixicon.css";

function Footer() {
    const [submitResponse, setSubmitResponse] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Three.js Background Animation
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: true });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        const light = new THREE.PointLight(0xffffff);
        light.position.set(5, 5, 5);
        scene.add(light);

        camera.position.z = 30;

        const animate = function () {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.02;
            torusKnot.rotation.y += 0.02;
            renderer.render(scene, camera);
        };
        animate();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setSubmitResponse(true);
        event.target.reset();
        setTimeout(() => setSubmitResponse(false), 3000);
    };

    return (
        <footer className="w-full h-screen relative flex flex-col items-center bg-black justify-center text-white overflow-hidden">
            <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
            <div className="relative z-10 container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left p-8">
                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-xl font-semibold">Quick Links</h1>
                    <ul className="space-y-2">
                        <li className="hover:text-gray-300 transition"><i className="ri-arrow-right-s-line"></i> Home</li>
                        <li className="hover:text-gray-300 transition"><i className="ri-arrow-right-s-line"></i> About</li>
                        <li className="hover:text-gray-300 transition"><i className="ri-arrow-right-s-line"></i> Sections</li>
                        <li className="hover:text-gray-300 transition"><i className="ri-arrow-right-s-line"></i> MeetUp</li>
                    </ul>
                </motion.div>
                <motion.div 
                    className="bg-gray-500/10 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-semibold mb-4">Feedback & Connect</h1>
                    <form onSubmit={onSubmit} className="space-y-3">
                        <input className="w-full p-3 bg-zinc-200/10 rounded-md text-black" type="text" name="name" required placeholder="Name" />
                        <input className="w-full p-3 bg-zinc-200/10 rounded-md text-black" type="email" name="email" required placeholder="Email" />
                        <textarea className="w-full bg-zinc-200/10 p-3 rounded-md text-black" name="message" placeholder="Your Message" required></textarea>
                        <button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Submit</button>
                    </form>
                </motion.div>
                
                <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-xl font-semibold">Follow Us</h1>
            <div className="flex flex-col space-y-2">
                {[
                    { href: "https://www.instagram.com/visionaryiq_/", icon: "ri-instagram-line", color: "pink-500" },
                    { href: "https://www.linkedin.com/company/visionaryiq-edutech", icon: "ri-linkedin-box-line", color: "blue-400" },
                    { href: "https://youtube.com", icon: "ri-youtube-line", color: "red-600" },
                    { href: "https://x.com/IqVisionar11663", icon: "ri-twitter-line", color: "zinc-100"}
                ].map(({ href, icon, color }, index) => (
                    <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-link flex items-center text-lg transition-transform duration-300 hover:text-${color} hover:scale-110`}
                    >
                        <i className={`${icon} mr-2 text-2xl transition-all duration-300 hover:text-${color} hover:glow`}></i>
                        <span className="transition-all duration-300 hover:text-${color} hover:text-2xl">{icon.split('-')[1]}</span>
                    </a>
                ))}
            </div>
        </motion.div>
            </div>
            
            <motion.h1 
                className="relative z-10 flex flex-col items-center text-white text-5xl font-['lobster-two-bold-italic'] font-bold mt-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                VisionaryIQ
                <br />
                <span className="text-[40%] py-4">© Copyright 2025 VisionaryIQ. All rights reserved.</span>
            </motion.h1>
            
            <AnimatePresence>
                {submitResponse && (
                    <motion.div 
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        Response Submitted Successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </footer>
    );
}

export default Footer;
