import { useMemo } from 'react';

const FestivalCarousel = ({ items = [] }) => {
  const loopItems = useMemo(() => {
    if (!items.length) return [];
    return [...items, ...items];
  }, [items]);

  if (!loopItems.length) {
    return null;
  }

  return (
    <div className="festival-carousel" aria-label="Festival experiences carousel">
      <div className="festival-carousel-track">
        {loopItems.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="festival-card"
            tabIndex={0}
            style={{
              '--festival-card-bg': item.color,
              '--festival-card-text': item.textColor,
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FestivalCarousel;
