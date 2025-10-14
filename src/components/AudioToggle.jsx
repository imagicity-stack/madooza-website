import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';

const AudioToggle = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audio) return;
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnd);
    return () => audio.removeEventListener('ended', handleEnd);
  }, [audio]);

  const toggle = async () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Audio playback failed', error);
      }
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-xl text-white shadow-neon transition hover:bg-white/20"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Mute festival soundtrack' : 'Play festival soundtrack'}
    >
      {isPlaying ? <HiMiniSpeakerWave className="h-7 w-7 text-neon-pink" /> : <HiMiniSpeakerXMark className="h-7 w-7 text-electric-blue" />}
    </motion.button>
  );
};

export default AudioToggle;
