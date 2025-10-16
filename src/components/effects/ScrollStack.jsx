import { useCallback, useLayoutEffect, useRef } from 'react';

import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const transformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);
  const tickingRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (!element) return 0;
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return element.offsetTop;
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cards.forEach((card, index) => {
      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * index;
      const pinEnd = endElementTop - containerHeight / 2;

      const progress = (() => {
        if (scrollTop <= triggerStart) return 0;
        if (scrollTop >= triggerEnd) return 1;
        return (scrollTop - triggerStart) / (triggerEnd - triggerStart || 1);
      })();

      const targetScale = baseScale + index * itemScale;
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * progress : 0;

      let blur = 0;
      if (blurAmount > 0) {
        let topCardIndex = 0;
        cards.forEach((candidate, candidateIndex) => {
          const candidateTop = getElementOffset(candidate);
          const candidateTriggerStart =
            candidateTop - stackPositionPx - itemStackDistance * candidateIndex;
          if (scrollTop >= candidateTriggerStart) {
            topCardIndex = candidateIndex;
          }
        });
        if (index < topCardIndex) {
          blur = Math.max(0, (topCardIndex - index) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const previous = transformsRef.current.get(card);
      const hasChanged =
        !previous ||
        Math.abs(previous.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previous.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previous.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previous.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.transform = transform;
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : '';
        transformsRef.current.set(card, nextTransform);
      }

      if (index === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const requestUpdate = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      tickingRef.current = false;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!useWindowScroll && !scroller) return undefined;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller?.querySelectorAll('.scroll-stack-card') ?? []
    );

    cardsRef.current = cards;
    transformsRef.current.clear();

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    const scrollTarget = useWindowScroll ? window : scroller;
    const handleScroll = () => requestUpdate();
    const handleResize = () => requestUpdate();

    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => requestUpdate());
    cards.forEach((card) => resizeObserver.observe(card));
    if (!useWindowScroll && scroller) {
      resizeObserver.observe(scroller);
    }

    requestUpdate();

    return () => {
      scrollTarget?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cardsRef.current = [];
      transformsRef.current.clear();
      stackCompletedRef.current = false;
      tickingRef.current = false;
    };
  }, [children, itemDistance, requestUpdate, useWindowScroll]);

  const scrollerClasses = `scroll-stack-scroller ${useWindowScroll ? 'use-window' : ''} ${className}`.replace(
    /\s+/g,
    ' '
  ).trim();

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
