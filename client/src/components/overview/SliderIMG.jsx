/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import AppContext from '../../hooks/context';

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
  position: 'absolute',
  height: '75vh',
};

const carousel = {
  justifyContent: 'flex-start',
  cursor: 'zoom-in',
  display: 'flex',
  width: '50vw',
  height: '75vh',
  flexDirection: 'left',
};

const carouselIndicators = {
  width: '50px',
  height: '50px',
  border: '1px solid black',
};

const miniCar = {
  flexDirection: 'column',
  position: 'absolute',
  listStyleType: 'none',
};

export default function Selector() {
  const currentId = String(useContext(AppContext).defaultItem.id);
  const currentItem = useContext(AppContext).defaultItem;
  const [productView, setProductView] = useState([]);
  useEffect(() => {
    axios.get(`/products/${currentId}/styles`).then(({ data }) => {
      setProductView(data.results);
    }, []);
  });

  console.log('everything from the current item', currentItem);
  // slider functions
  const defaultStyle = productView.filter(
    (item) => item['default?'] === true
  )[0];
  console.log('test', productView);

  const [current, setCurrent] = useState(0);
  const { length } = productView;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <div>
      <section style={slider}>
        <MdOutlineArrowBackIosNew onClick={prevSlide} style={leftArrow} />
        <MdOutlineArrowForwardIos onClick={nextSlide} style={rightArrow} />
        <div>
          <ul style={miniCar}>
            {productView.map((slide) => (
              <li style={carouselIndicators} key={slide.url}>
                <img
                  src={slide.url}
                  style={carouselIndicators}
                  alt="Clothing Img"
                />
              </li>
            ))}
          </ul>
        </div>
        {productView.map((slide, index) => (
          <div key={slide.url}>
            {index === current && (
              <img src={slide.url} style={carousel} alt="Clothing Img" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
