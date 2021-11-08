/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';

export default function HorizontalCarousel({ items }) {
  useEffect(() => {}, [items]);

  let identifier = '';

  if (typeof items[0] === 'string') {
    identifier = 'outfit';
  }

  // define constants
  const cardWidth = 220;

  const [location, setLocation] = useState(0);

  function handleScrollClick(e) {
    // scroll pictures in div and set location state depending on which button is clicked
    if (e.target.innerText === '<') {
      document.getElementById(`carousel-inner-${identifier}`).scrollLeft -= (location === 0 ? 0 : cardWidth);
      setLocation(location < 0 ? location : location - cardWidth);
    } else if (e.target.innerText === '>') {
      document.getElementById(`carousel-inner-${identifier}`).scrollLeft += (
        location > cardWidth * items.length ? 0 : cardWidth
      );
      setLocation(location > cardWidth * items.length ? location : location + cardWidth);
    }
  }

  // empty button used to ensure carousel boundaries is maintained - dummy component
  const emptyButton = (
    <button type="button" className="carousel-button" style={({ opacity: '0' })}>
      {'<'}
    </button>
  );

  return (
    // Carousel
    <div id="carousel">
      {/* Back Button */}
      {location <= 0 ? emptyButton
        : (
          <button className="carousel-button" onClick={handleScrollClick} type="button">
            <span>{'<'}</span>
          </button>
        )}

      {/* Container */}
      <span
        className="carousel-inner"
        id={`carousel-inner-${identifier}`}
      >
        {// render product cards
        items.map((item) => {
          // need to define key and redefine if needed
          // so there are unique keys
          let key = item.id;

          if (!key) {
            key = 'add item';
          } else if (typeof items[0] === 'string') {
            key = `${key}-${identifier}`;
          }

          return (
            <ProductCard
              setLocation={setLocation}
              key={key}
              product={key === 'add item' ? {
                category: 'Add to Outfit',
                results: [{}],
              } : item}
              identifier={identifier}
            />
          );
        })
}
      </span>

      {/* Forward Button */}
      {(location + document.getElementById('app').clientWidth) >= (items.length * cardWidth + 42.5 * 2) ? emptyButton
        : (
          <button className="carousel-button" onClick={handleScrollClick} type="button">
            <span>{'>'}</span>
          </button>
        )}
    </div>
  );
}
