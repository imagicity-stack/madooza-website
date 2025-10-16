import { useCallback, useLayoutEffect, useRef } from 'react';

import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({ children, className = '', useWindowScroll = false, onStackComplete }) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const tickingRef = useRef(false);
  const activeIndexRef = useRef(-1);
  const stackCompletedRef = useRef(false);

  const readCards = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      cardsRef.current = [];
      return [];
    }

    const nodes = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = nodes;
    return nodes;
  }, []);

  const applyActiveIndex = useCallback(
    (index) => {
      const cards = cardsRef.current;
      if (!cards.length) return;

      const clamped = Math.max(0, Math.min(cards.length - 1, index));
      if (clamped === activeIndexRef.current) return;

      activeIndexRef.current = clamped;

      cards.forEach((card, cardIndex) => {
        const isBefore = cardIndex < clamped;
        const isActive = cardIndex === clamped;
        card.classList.toggle('is-before', isBefore);
        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-after', cardIndex > clamped);
      });

      if (clamped === cards.length - 1) {
        if (!stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        }
      } else {
        stackCompletedRef.current = false;
      }
    },
    [onStackComplete]
  );

  const updateActiveIndex = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scroller = scrollerRef.current;
    const scrollerRect = scroller?.getBoundingClientRect();
    const viewportCenter = useWindowScroll
      ? window.innerHeight / 2
      : scrollerRect
      ? scrollerRect.top + scrollerRect.height / 2
      : window.innerHeight / 2;

    let bestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        bestIndex = index;
      }
    });

    applyActiveIndex(bestIndex);
  }, [applyActiveIndex, useWindowScroll]);

  const requestUpdate = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      tickingRef.current = false;
      updateActiveIndex();
    });
  }, [updateActiveIndex]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const cards = readCards();
    cards.forEach((card) => {
      card.classList.remove('is-before', 'is-active', 'is-after');
    });

    activeIndexRef.current = -1;
    requestUpdate();

    const scrollTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => requestUpdate()) : null;
    cards.forEach((card) => resizeObserver?.observe(card));
    resizeObserver?.observe(scroller);

    return () => {
      scrollTarget.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      resizeObserver?.disconnect();
      cardsRef.current = [];
      tickingRef.current = false;
      activeIndexRef.current = -1;
      stackCompletedRef.current = false;
    };
  }, [children, readCards, requestUpdate, useWindowScroll]);

  const scrollerClasses = `scroll-stack-scroller ${useWindowScroll ? 'use-window' : ''} ${className}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <div className={scrollerClasses} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
