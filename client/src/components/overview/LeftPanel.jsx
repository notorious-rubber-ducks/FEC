/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../hooks/context';
import ScrollingButton from './ScrollingButton.jsx';
import VerticalCarousel from './VerticalCarousel.jsx';

export default function LeftPanel({ currentStyle }) {
  const [currentImage, setCurrentImage] = useState(0);
  const { defaultItem } = useContext(AppContext);

  useEffect(() => {
    setCurrentImage(0);
  }, [defaultItem]);

  // event handlers
  function handleKeyUp(e) {
    if (e.key === 'ArrowRight' && currentImage !== currentStyle.photos.length - 1) {
      setCurrentImage(currentImage + 1);
    } else if (e.key === 'ArrowLeft' && currentImage !== 0) {
      setCurrentImage(currentImage - 1);
    }
  }

  useEffect(() => {}, [currentImage]);

  return (
    <span
      id="leftPanel"
      style={{
        minWidth: '300px', maxHeight: '600px', width: '60%', position: 'relative',
      }}
      onKeyUp={handleKeyUp}
      role="button"
      tabIndex={0}
    >
      {/* main overview picture */}
      <div id="main-overview-picture" onClick={() => {}}>
        <img
          src={currentStyle.photos[currentImage].url === null ? './assets/image-not-found.png' : currentStyle.photos[currentImage].url}
          alt={currentStyle.name}
          style={{
            width: '100%', height: '600px', objectFit: 'cover', cursor: 'zoom-in',
          }}
        />
      </div>
      {/* Vertical carousel */}
      <VerticalCarousel
        currentStyle={currentStyle}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
      {/* scrolling side buttons */}
      {currentImage !== 0
        ? (<ScrollingButton text="<" clickHandler={() => { setCurrentImage(currentImage - 1); }} />) : ''}
      {currentImage !== currentStyle.photos.length - 1
        ? (<ScrollingButton text=">" clickHandler={() => { setCurrentImage(currentImage + 1); }} />) : ''}

      {/* scrolling up and down buttons */}
      {currentImage === 0 ? ''
        : (<ScrollingButton text="Up" clickHandler={() => { setCurrentImage(currentImage - 1); }} />)}

      {currentImage === currentStyle.photos.length - 1 ? ''
        : (<ScrollingButton clickHandler={() => { setCurrentImage(currentImage + 1); }} text="Down" />)}
    </span>
  );
}
