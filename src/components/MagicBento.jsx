import { useEffect, useMemo, useRef, useState } from 'react';

import './MagicBento.css';

const MOBILE_BREAKPOINT = 768;

const fallbackItems = [
  {
    id: 'default-1',
    title: 'Experience',
    label: 'Festival',
    copy: 'Immersive stories that celebrate creativity.',
    color: '#1f1b2c',
    textColor: '#ffffff',
  },
];

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const updateCardGlowProperties = (card, clientX, clientY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((clientX - rect.left) / rect.width) * 100;
  const relativeY = ((clientY - rect.top) / rect.height) * 100;

  card.style.setProperty('--magic-glow-x', `${relativeX}%`);
  card.style.setProperty('--magic-glow-y', `${relativeY}%`);
  card.style.setProperty('--magic-glow-intensity', glow.toString());
  card.style.setProperty('--magic-glow-radius', `${radius}px`);
};

const InteractiveCard = ({
  card,
  glowColor,
  enableTilt,
  enableMagnetism,
  enableBorderGlow,
  clickEffect,
  textAutoHide,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return undefined;
    const element = cardRef.current;

    const handleMouseMove = (event) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        element.style.setProperty('--magic-rotate-x', `${rotateX.toFixed(2)}deg`);
        element.style.setProperty('--magic-rotate-y', `${rotateY.toFixed(2)}deg`);
      }

      if (enableMagnetism) {
        const translateX = (x - centerX) * 0.1;
        const translateY = (y - centerY) * 0.1;
        element.style.setProperty('--magic-translate-x', `${translateX.toFixed(2)}px`);
        element.style.setProperty('--magic-translate-y', `${translateY.toFixed(2)}px`);
      }
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--magic-rotate-x', '0deg');
      element.style.setProperty('--magic-rotate-y', '0deg');
      element.style.setProperty('--magic-translate-x', '0px');
      element.style.setProperty('--magic-translate-y', '0px');
      element.style.setProperty('--magic-glow-intensity', '0');
    };

    const handleClick = (event) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.className = 'magic-card__ripple';
      ripple.style.left = `${x - maxDistance}px`;
      ripple.style.top = `${y - maxDistance}px`;
      ripple.style.width = `${maxDistance * 2}px`;
      ripple.style.height = `${maxDistance * 2}px`;
      ripple.style.setProperty('--magic-glow-rgb', glowColor);

      element.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
    };
  }, [clickEffect, enableMagnetism, enableTilt, glowColor]);

  const className = [
    'magic-card',
    textAutoHide ? 'magic-card--text-autohide' : '',
    enableBorderGlow ? 'magic-card--border-glow' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        backgroundColor: card.color,
        color: card.textColor,
        '--magic-card-text-color': card.textColor,
      }}
    >
      <div className="magic-card__header">
        {card.label ? <div className="magic-card__label">{card.label}</div> : null}
      </div>
      <div className="magic-card__content">
        <h3 className="magic-card__title">{card.title}</h3>
        <p className="magic-card__description">{card.copy}</p>
      </div>
    </div>
  );
};

const MagicBento = ({
  items,
  glowColor = '132, 0, 255',
  enableSpotlight = true,
  enableMagnetism = true,
  enableTilt = true,
  enableBorderGlow = true,
  clickEffect = true,
  textAutoHide = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();

  const cards = useMemo(() => {
    if (items && items.length) {
      return items;
    }
    return fallbackItems;
  }, [items]);

  useEffect(() => {
    if (!enableSpotlight || !gridRef.current || isMobile) return undefined;

    const spotlight = document.createElement('div');
    spotlight.className = 'magic-spotlight';
    spotlight.style.setProperty('--magic-glow-rgb', glowColor);
    document.body.appendChild(spotlight);

    const proximity = 0.5;
    const fadeDistance = 0.75;
    const radius = 300;

    const handleMouseMove = (event) => {
      const section = gridRef.current.closest('.magic-bento');
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const cardsEls = gridRef.current.querySelectorAll('.magic-card');

      if (!inside) {
        spotlight.style.opacity = '0';
        cardsEls.forEach((card) => card.style.setProperty('--magic-glow-intensity', '0'));
        return;
      }

      let minDistance = Infinity;

      cardsEls.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        const proximityPx = radius * proximity;
        const fadePx = radius * fadeDistance;

        if (effectiveDistance <= proximityPx) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadePx) {
          glowIntensity = (fadePx - effectiveDistance) / (fadePx - proximityPx);
        }

        updateCardGlowProperties(card, event.clientX, event.clientY, glowIntensity, radius);
      });

      spotlight.style.opacity = minDistance <= radius * proximity ? '0.8' : '0.4';
      spotlight.style.left = `${event.clientX}px`;
      spotlight.style.top = `${event.clientY}px`;
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
      gridRef.current?.querySelectorAll('.magic-card').forEach((card) => {
        card.style.setProperty('--magic-glow-intensity', '0');
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlight.remove();
    };
  }, [enableSpotlight, glowColor, isMobile]);

  return (
    <div className="magic-bento" style={{ '--magic-glow-rgb': glowColor }}>
      <div className="magic-card-grid" ref={gridRef}>
        {cards.map((card) => (
          <InteractiveCard
            key={card.id}
            card={card}
            glowColor={glowColor}
            enableTilt={!isMobile && enableTilt}
            enableMagnetism={!isMobile && enableMagnetism}
            enableBorderGlow={enableBorderGlow}
            clickEffect={clickEffect}
            textAutoHide={textAutoHide}
          />
        ))}
      </div>
    </div>
  );
};

export default MagicBento;
