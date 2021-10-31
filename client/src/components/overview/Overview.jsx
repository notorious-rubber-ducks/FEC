/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai';

import AppContext from '../../hooks/context';

const iconStyles = { fontSize: '1.5em', margin: '15px', float: 'right' };
const rightArrow = {
  position: 'absolute',
  top: '50%',
  right: '32px',
  color: '#000',
  fontSize: '3rem',
};

const leftArrow = {
  position: 'absolute',
  top: '50%',
  left: '32px',
  color: '#000',
  fontSize: '3rem',
};
const slider = {
  position: 'relative',
  height: '100vh',
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'left',
};
// const slide = {
//   opacity: '0',
//   transitionDuration: '1s ease,',
// };

// const slideActive = {
//   opacity: '1',
//   transitionDuration: '1s',
//   transform: 'scale(1.08)',
// };
export default function Overview() {
  const currentId = String(useContext(AppContext).defaultItem.id);
  const [productView, setProductView] = useState([]);

  useEffect(() => {
    axios
      .get(`/products/${currentId}/styles`)
      .then(({ data }) =>
        data.results.map((item) => setProductView(item.photos))
      );
  }, []);

  // slider functions
  const [current, setCurrent] = useState(0);
  const { length } = productView; // put in array of clothing photos.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div>
      <h3>test</h3>
      <section style={slider}>
        <MdOutlineArrowBackIosNew onClick={prevSlide} style={leftArrow} />
        <MdOutlineArrowForwardIos onClick={nextSlide} style={rightArrow} />
        {/* insert info from api */}
        {productView.map((slide, index) => (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={slide.url}
          >
            {index === current && <img src={slide.url} alt="Clothing Img" />}
          </div>
        ))}
      </section>
      <span>
        <AiFillFacebook id="faceBook" style={iconStyles} />
        <AiFillInstagram id="instagram" style={iconStyles} />
        <AiFillTwitterCircle id="twitter" style={iconStyles} />
      </span>
    </div>
  );
}
