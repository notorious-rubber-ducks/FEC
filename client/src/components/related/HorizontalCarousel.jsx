/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

const buttonStyle = {
  margin: '10px',
  cursor: 'pointer',
  fontSize: '16pt',
  transition: '0.4s ease',
  borderRadius: '4px 0 0 4px',
  userSelect: 'none',
  border: '0',
};

export default function HorizontalCarousel({ items }) {
  // define constants
  const carouselWidth = window.innerWidth * 0.80;
  const carouselHeight = 324;
  const cardWidth = 222;
  console.log(carouselWidth);

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

  const emptyButton = (
    <button
      type="button"
      style={({ backgroundColor: '#fff', color: '#fff', ...buttonStyle })}
    >
      _
    </button>
  );

  return (
    // Carousel
    <div
      id="carousel"
      className="carousel slide"
      style={{
        display: 'flex',
        maxWidth: `${carouselWidth}px`,
        width: `${carouselWidth}px`,
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
          // border: '1px solid #000',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          // borderRadius: '4px',
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
      {(location + window.innerWidth * 0.8) >= (items.length * cardWidth + 40) ? emptyButton : (
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
