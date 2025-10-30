import React, { useState, useEffect } from 'react';
import Header from '../../components/user/Header';
import Hero from '../../components/user/Hero';
import About from '../../components/user/About';
import Products from '../../components/user/Products';
import Varieties from '../../components/user/Varieties';
import Knowledge from '../../components/user/Knowledge';
import ChatBot from '../../components/user/ChatBot';


function HomePage() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'products', 'varieties', 'knowledge'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
            <Header activeSection={activeSection} />
            <main>
                <Hero />
                <About />
                <Products />
                <Varieties />
                <Knowledge />
            </main>
            <ChatBot />
        </div>
    );
}

export default HomePage;