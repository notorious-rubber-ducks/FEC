import React, { useContext, useState, useEffect } from 'react';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import StyleSelector from './StyleSelector.jsx';


export default function RightPanel ({currItem, currentStyle, setCurrentStyle}) {

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
        <h2>{currItem.name}</h2>
      </div>
      <p>${currItem.default_price}</p>
      <div>
        <span>
          <b>Style {'> '}</b>
          {currentStyle.name}
        </span>
        <StyleSelector styles={currItem.results}/>
      </div>
      <div>
        {'< checkout mod goes here >'}
      </div>
    </span>
  );
}