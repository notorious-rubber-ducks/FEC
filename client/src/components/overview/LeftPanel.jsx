/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../hooks/context';

export default function LeftPanel({ currentStyle }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [currentStyle]);

  return (
    <span className="leftPanel" style={{ display: 'flex' }}>
      <div id="vertical-carousel-container" style={{ position: 'relative', top: '0' }}>
        {currentImage === 0 ? '' : <button type="button" onClick={() => {}}>Up</button>}
        {currentStyle.photos.map((item, index) => (
          <div
            role="button"
            tabIndex={0}
            onKeyPress={() => {}}
            onClick={() => { setCurrentImage(index); }}
            className="overview-carousel-photo"
            key={item.thumbnail_url.split('-')[1]}
          >
            <img
              src={item.thumbnail_url === null ? './assets/image-not-found.png' : item.thumbnail_url}
              alt={currentStyle.name}
              style={{
                width: '75px',
                height: '75px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
        {currentImage === currentStyle.photos.length - 1 ? '' : <button type="button" onClick={() => {}}>Down</button>}
      </div>

      <div id="main-overview-picture">
        <img
          src={currentStyle.photos[currentImage].thumbnail_url === null ? './assets/image-not-found.png' : currentStyle.photos[currentImage].thumbnail_url}
          alt={currentStyle.name}
          style={{
          // width: '100px',
          // height: '100px',
            objectFit: 'cover',
          }}
        />
      </div>
    </span>
  );
}
