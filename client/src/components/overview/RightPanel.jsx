import React, { useContext, useState, useEffect } from 'react';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import StyleSelector from './StyleSelector.jsx';
import Checkout from './Checkout.jsx';
import { FacebookIcon, TwitterIcon, PinterestIcon } from 'react-share';


export default function RightPanel ({currItem, currentStyle, setCurrentStyle}) {

  let price = currentStyle.sale_price
  ? (<p><strike>${currItem.default_price}</strike>  <span style={{color:'red'}}>${currentStyle.sale_price}</span></p>)
  : (<p>${currItem.default_price}</p>);

  return (
    <span className='rightPanel'>
      <div>
        <span>
          <StarRatings id={currItem.id} /> {'\u00A0'}
          <a href='#ratings'>Read all reviews</a>
        </span>
      </div>
      <div>
        <h4>{currItem.category}</h4>
        <h1>{currItem.name}</h1>
      </div>
      {price}
      <div>
        <span>
          <b>Style {'> '}</b>
          {currentStyle.name}
        </span>
        <StyleSelector styles={currItem.results} setStyle={setCurrentStyle} currStyle={currentStyle}/>
      </div>
      <br />
      <div>
        <Checkout currentStyle={currentStyle}/>
      </div>
      <div style={{padding:10}}>
        <span>
          <FacebookIcon size={32} />{'\u00A0'}
          <TwitterIcon size={32} />{'\u00A0'}
          <PinterestIcon size={32} />
        </span>
      </div>
    </span>
  );
}