import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import Stalls from './components/Stalls.jsx';
import Gallery from './components/Gallery.jsx';
import Schedule from './components/Schedule.jsx';
import Footer from './components/Footer.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import FloatingRegister from './components/FloatingRegister.jsx';
import AudioToggle from './components/AudioToggle.jsx';

const App = () => {
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [audio] = useState(() => new Audio('https://cdn.pixabay.com/download/audio/2024/02/17/audio_7b3ce6c8b8.mp3?filename=neon-wave-191621.mp3'));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.35;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handleAudioReady = useCallback(() => setIsAudioReady(true), []);

  return (
    <div className="relative overflow-hidden">
      <CursorGlow />
      <AnimatePresence>{isAudioReady && <AudioToggle audio={audio} />}</AnimatePresence>
      <Hero onAudioReady={handleAudioReady} />
      <About />
      <Events />
      <Stalls />
      <Gallery />
      <Schedule />
      <Footer />
      <FloatingRegister />
    </div>
  );
};

export default App;
