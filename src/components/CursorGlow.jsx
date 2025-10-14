import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    >
      <div
        className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-madooza-gradient blur-3xl opacity-40 transition-transform duration-200"
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
};

export default CursorGlow;
