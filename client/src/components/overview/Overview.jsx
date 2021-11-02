/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from 'react-icons/ai';

import AppContext from '../../hooks/context';
import SliderIMG from './SliderIMG.jsx';
import Selector from './Selectors.jsx';

const iconStyles = { fontSize: '1.5em', margin: '15px', float: 'right' };

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

  return (
    <div>
      <h3>test</h3>
      <SliderIMG />
      <Selector />
      <span>
        <AiFillFacebook id="faceBook" style={iconStyles} />
        <AiFillInstagram id="instagram" style={iconStyles} />
        <AiFillTwitterCircle id="twitter" style={iconStyles} />
      </span>
    </div>
  );
}
