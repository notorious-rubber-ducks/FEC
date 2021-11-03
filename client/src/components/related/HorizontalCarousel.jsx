/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function HorizontalCarousel({ items }) {
  // define constants
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
    <button type="button" className="carousel-button" style={({ opacity: '0' })}>
      _
    </button>
  );

  return (
  // Carousel
    <div id="carousel">
      {/* Back Button */}
      {location < 5 ? emptyButton
        : (
          <button className="carousel-button" onClick={handleClick} type="button">
            <span>{'<'}</span>
          </button>
        )}

      {/* Container */}
      <span id="carousel-inner">
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
        <button className="carousel-button" onClick={handleClick} type="button">
          <span>{'>'}</span>
        </button>
      )}
    </div>
  );
}
