import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ColorShiftText from './effects/ColorShiftText.jsx';
import NeonSparkles from './effects/NeonSparkles.jsx';

const TARGET_DATE = new Date('2025-02-15T09:00:00+05:30');

const getTimeLeft = () => {
  const total = TARGET_DATE.getTime() - new Date().getTime();
  const seconds = Math.max(Math.floor(total / 1000), 0);
  return {
    days: Math.floor(seconds / (3600 * 24)),
    hours: Math.floor((seconds % (3600 * 24)) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
};

const FlipNumber = ({ label, value }) => {
  const formatted = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2 h-20 w-20 overflow-hidden rounded-3xl border border-white/20 bg-black/60 text-4xl font-bold text-electric-blue shadow-neon sm:h-24 sm:w-24 sm:text-5xl">
        <motion.div
          key={formatted}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center font-headline"
        >
          {formatted}
        </motion.div>
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-white/70">{label}</span>
    </div>
  );
};

const Hero = ({ onAudioReady }) => {
  const heroRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [registrations, setRegistrations] = useState(() => 512 + Math.floor(Math.random() * 128));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setRegistrations((prev) => prev + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-orbits span', {
        rotate: () => gsap.utils.random(-180, 180),
        duration: () => gsap.utils.random(20, 32),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-blobs span', {
        xPercent: () => gsap.utils.random(-10, 10),
        yPercent: () => gsap.utils.random(-12, 12),
        duration: () => gsap.utils.random(8, 14),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    onAudioReady?.();

    return () => ctx.revert();
  }, [onAudioReady]);

  const countdown = useMemo(
    () => [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  const blobConfigs = useMemo(
    () => [
      { top: '8%', left: '12%', size: 220, color: '#FF00E6' },
      { top: '65%', left: '8%', size: 160, color: '#00FFFF' },
      { top: '20%', left: '68%', size: 200, color: '#D0FF00' },
      { top: '70%', left: '70%', size: 180, color: '#FF00E6' },
    ],
    []
  );

  const orbitConfigs = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) => ({
        size: 120 + index * 35,
        borderColor: index % 2 === 0 ? 'rgba(255, 0, 230, 0.3)' : 'rgba(0, 255, 255, 0.3)',
      })),
    []
  );

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden pb-24 pt-32" id="home">
      <div className="absolute inset-0 -z-10">
        <div className="hero-blobs absolute inset-0">
          {blobConfigs.map((blob, index) => (
            <span
              key={`blob-${blob.top}-${index}`}
              className="absolute rounded-full blur-3xl"
              style={{
                top: blob.top,
                left: blob.left,
                width: blob.size,
                height: blob.size,
                backgroundColor: `${blob.color}33`,
              }}
            />
          ))}
        </div>
        <div className="hero-orbits pointer-events-none absolute inset-0 flex items-center justify-center">
          {orbitConfigs.map((orbit, index) => (
            <span
              key={`orbit-${index}`}
              className="absolute rounded-full border"
              style={{
                width: orbit.size,
                height: orbit.size,
                borderColor: orbit.borderColor,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        <NeonSparkles className="absolute inset-0" count={28} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-14 px-6 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.4em] text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyber-lime animate-pulse" />
            Where Chaos Meets Creativity
          </div>

          <motion.h1
            className="font-headline text-4xl leading-tight text-white neon-text sm:text-6xl lg:text-7xl"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          >
            <ColorShiftText className="drop-shadow-[0_0_20px_rgba(255,0,230,0.45)]">Madooza 2025</ColorShiftText>
            <br />
            Hazaribagh’s Ultimate Pop-Culture Explosion
          </motion.h1>

          <p className="max-w-xl text-lg text-white/70">
            Crafted by <span className="text-electric-blue">IMAGICITY</span> for Mount Litera, Madooza is the neon-lit playground where anime dreams, cyber beats,
            and youth culture collide in a riot of color.
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <motion.a
              href="#tickets"
              className="glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Pass
            </motion.a>

            <div className="rounded-3xl border border-white/20 bg-white/5 px-6 py-4 backdrop-blur-lg shadow-neon">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Live Registrations</p>
              <p className="font-headline text-3xl text-cyber-lime">{registrations.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel relative flex flex-1 flex-col items-center gap-6 border-white/10 p-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-black/70 p-6">
            <h2 className="mb-6 font-headline text-2xl text-electric-blue">Countdown to the Chaos</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {countdown.map((item) => (
                <FlipNumber key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-black/60 p-6">
            <h3 className="font-headline text-xl text-neon-pink">Festival Intel</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <span className="text-electric-blue">02</span> Days of hyper-pop culture immersion — Feb 15 & 16, 2025.
              </li>
              <li>
                <span className="text-electric-blue">10+</span> Experience zones, glitch art installations, and neon food courts.
              </li>
              <li>
                <span className="text-electric-blue">24/7</span> Creator lounge, cosplay studio, and digital merch drops.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
