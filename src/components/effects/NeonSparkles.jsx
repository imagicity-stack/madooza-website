import { motion } from 'framer-motion';
import { useMemo } from 'react';

const palette = ['#FF00E6', '#00FFFF', '#D0FF00'];

// Reactbits-inspired lightweight sparkle field for colourful motion without gradients.
const NeonSparkles = ({ count = 18, className = '' }) => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: index,
        size: 6 + Math.random() * 10,
        color: palette[index % palette.length],
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 4,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute rounded-full mix-blend-screen"
          style={{
            backgroundColor: sparkle.color,
            width: sparkle.size,
            height: sparkle.size,
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            opacity: 0.35,
            boxShadow: `0 0 12px ${sparkle.color}`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4 + sparkle.delay, repeat: Infinity, ease: 'easeInOut', delay: sparkle.delay }}
        />
      ))}
    </div>
  );
};

export default NeonSparkles;
