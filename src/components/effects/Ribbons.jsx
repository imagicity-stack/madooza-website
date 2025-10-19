import { useEffect, useRef } from 'react';

import './Ribbons.css';

const DEFAULT_COLOR = '255, 212, 0';

const Ribbons = ({
  colors = [DEFAULT_COLOR],
  maxAge = 500,
  baseThickness = 28,
  speedMultiplier = 0.6,
}) => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animationRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');

    const setSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      sizeRef.current = { width, height };
    };

    setSize();
    window.addEventListener('resize', setSize);

    const addPoint = (x, y) => {
      pointsRef.current.push({ x, y, time: performance.now() });
    };

    const handlePointerMove = (event) => {
      addPoint(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      if (!event.changedTouches?.length) return;
      const touch = event.changedTouches[0];
      addPoint(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const draw = () => {
      const now = performance.now();
      const { width, height } = sizeRef.current;

      context.clearRect(0, 0, width, height);

      const activePoints = pointsRef.current.filter((point) => now - point.time <= maxAge);
      pointsRef.current = activePoints;

      if (activePoints.length > 1) {
        context.lineCap = 'round';
        context.lineJoin = 'round';

        const colorCount = colors.length;

        for (let c = 0; c < colorCount; c += 1) {
          const rgb = colors[c];
          context.beginPath();
          for (let i = 0; i < activePoints.length; i += 1) {
            const point = activePoints[i];
            const progress = 1 - Math.min(1, (now - point.time) / maxAge);
            const thickness = baseThickness * (0.25 + progress * 0.75) * speedMultiplier;
            context.lineWidth = thickness;
            context.strokeStyle = `rgba(${rgb}, ${progress * 0.8})`;

            if (i === 0) {
              context.moveTo(point.x, point.y);
            } else {
              const prev = activePoints[i - 1];
              const midX = (prev.x + point.x) / 2;
              const midY = (prev.y + point.y) / 2;
              context.quadraticCurveTo(prev.x, prev.y, midX, midY);
            }
          }
          context.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseThickness, colors, maxAge, speedMultiplier]);

  return <canvas ref={canvasRef} className="ribbons-container" aria-hidden="true" />;
};

export default Ribbons;
