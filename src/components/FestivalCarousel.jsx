import { useCallback, useEffect, useMemo, useState } from 'react';

const FestivalCarousel = ({ items = [] }) => {
  const slides = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);

  const clampIndex = useCallback(
    (index) => {
      if (!slides.length) return 0;
      if (index < 0) return 0;
      if (index > slides.length - 1) return slides.length - 1;
      return index;
    },
    [slides.length]
  );

  useEffect(() => {
    setActiveIndex((prev) => clampIndex(prev));
  }, [clampIndex]);

  const goToIndex = useCallback(
    (index) => {
      setActiveIndex(clampIndex(index));
    },
    [clampIndex]
  );

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => clampIndex(prev - 1));
  }, [clampIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => clampIndex(prev + 1));
  }, [clampIndex]);

  if (!slides.length) {
    return null;
  }

  const atStart = activeIndex === 0;
  const atEnd = activeIndex === slides.length - 1;
  const progress = slides.length > 1 ? (activeIndex / (slides.length - 1)) * 100 : 0;

  return (
    <div className="festival-carousel" aria-live="polite">
      <div className="festival-carousel-viewport">
        <div
          className="festival-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((item, index) => (
            <article
              key={item.id ?? index}
              className="festival-carousel-slide"
              style={{ '--festival-slide-bg': item.color, '--festival-slide-text': item.textColor }}
            >
              <div className="festival-carousel-overlay" />
              <div className="festival-carousel-content">
                <span className="festival-carousel-count">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="festival-carousel-controls">
        <button
          type="button"
          className="festival-carousel-nav festival-carousel-nav--prev"
          onClick={handlePrev}
          disabled={atStart}
          aria-label="View previous festival"
        >
          <span aria-hidden="true">Prev</span>
        </button>
        <div className="festival-carousel-progress" role="presentation">
          <span className="festival-carousel-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <button
          type="button"
          className="festival-carousel-nav festival-carousel-nav--next"
          onClick={handleNext}
          disabled={atEnd}
          aria-label="View next festival"
        >
          <span aria-hidden="true">Next</span>
        </button>
      </div>

      <div className="festival-carousel-dots" role="tablist" aria-label="Festival slides">
        {slides.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id ?? index}
              type="button"
              className={`festival-carousel-dot${isActive ? ' is-active' : ''}`}
              onClick={() => goToIndex(index)}
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${item.title}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FestivalCarousel;
