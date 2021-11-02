/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

const buttonStyle = {
  margin: 'auto 10px',
  cursor: 'pointer',
  fontSize: '16pt',
  borderRadius: '4px',
  height: '100%',
  userSelect: 'none',
  backgroundColor: '#fff',
  border: '0',
};

export default function HorizontalCarousel({ items }) {
  // define constants
  const carouselHeight = 324;
  const cardWidth = 220;

  const [location, setLocation] = useState(0);

  function handleClick(e) {
    // scroll pictures in div and set location state depending on which button is clicked
    if (e.target.innerText === '<') {
      document.getElementById('carousel-inner').scrollLeft -= (location === 0 ? 0 : cardWidth);
      setLocation(location < 0 ? location : location - cardWidth);
    } else if (e.target.innerText === '>') {
      document.getElementById('carousel-inner').scrollLeft += (
        location > cardWidth * items.length ? 0 : cardWidth
      );
      setLocation(location > cardWidth * items.length ? location : location + cardWidth);
    }
  }

  // empty button used to ensure carousel boundaries is maintained - dummy component
  const emptyButton = (
    <button
      type="button"
      style={({ opacity: '0', color: '#fff', ...buttonStyle })}
    >
      _
    </button>
  );

  return (
  // Carousel
    <div
      id="carousel"
      className="carousel"
      style={{
        display: 'flex',
        width: '100%',
        maxHeight: `${carouselHeight}px`,
        margin: 'auto',
      }}
    >
      {/* Back Button */}
      {location < 5 ? emptyButton
        : (
          <button
            id="related-carousel-button-previous"
            onClick={handleClick}
            type="button"
            style={buttonStyle}
          >
            <span>{'<'}</span>
          </button>
        )}

      {/* Container */}
      <span
        id="carousel-inner"
        style={{
          display: 'flex',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {items.map((item) => (
          <ProductCard
            setLocation={setLocation}
            key={item.product_id}
            product={item}
          />
        ))}
      </span>

      {/* Forward Button */}
      {(location + document.getElementById('app').clientWidth) >= (items.length * cardWidth + 40) ? emptyButton : (
        <button
          id="related-carousel-button-next"
          onClick={handleClick}
          type="button"
          style={buttonStyle}
        >
          <span>{'>'}</span>
        </button>
      )}
    </div>
  );
}
