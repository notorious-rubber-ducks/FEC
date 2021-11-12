/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

export default function VerticalCarousel({ currentImage, setCurrentImage, currentStyle }) {
  const [startImage, setStartImage] = useState(0);
  const [endImage, setEndImage] = useState(7);

  // ensure only 7 images are showing at a time
  useEffect(() => {
    const floor = Math.floor(currentImage / 7);

    setStartImage(floor * 7);
    setEndImage((floor * 7) + 7);
  }, [currentImage]);

  // style variables
  function setImageStyle(slideIndex, stateIndex) {
    const imageStyle = {
      width: '64px',
      height: '64px',
      objectFit: 'cover',
      paddingBottom: '2px',
      borderBottom: '3px solid transparent',
      borderTop: '3px solid transparent',
      margin: 0,
    };

    if (slideIndex === stateIndex % 7) {
      imageStyle.borderBottom = '3px solid green';
    }

    // set padding for margin at the top if button is hidden
    if (slideIndex === 0) {
      imageStyle.paddingTop = '24px';
    }

    return imageStyle;
  }

  return (
    <div
      id="vertical-carousel"
      style={{
        position: 'relative',
        top: '-600px',
        left: '4px',
        maxHeight: '100%',
        width: '75px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
      }}
      role="button"
      tabIndex={0}
    >
      {currentStyle.photos[0].url !== null ? (
        <div id="vertical-carousel-container" style={{ overflow: 'hidden', maxHeight: '600px' }}>
          {currentStyle.photos.slice(startImage, endImage).map((item, index) => (
            <div
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={() => { setCurrentImage(index); }}
              className="overview-carousel-photo"
              key={item.thumbnail_url.split('-')[1]}
              style={{ display: 'block' }}
            >
              <img
                src={item.thumbnail_url === null ? './assets/image-not-found.png' : item.thumbnail_url.split('w=')[0].concat('w=100&q=80')}
                alt={currentStyle.name}
                style={setImageStyle(index, currentImage)}
              />
            </div>
          ))}
        </div>
      ) : ''}
    </div>
  );
}
