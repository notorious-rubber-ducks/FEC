import React, { useEffect, useState } from 'react';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import { metaObj } from './CharObj.js';

const MetaDataComponent = ({ reviewDataProps, metaDataProps }) => {
  const avgRating = () => (reviewDataProps.results.reduce((a, b) => (a + b.rating), 0) / reviewDataProps.count);

  return (
    <div>
      Ratings and Reviews
      <br />
      <span>
        {reviewDataProps ? <h1>{avgRating()}</h1> : null}
        {reviewDataProps ? <StarRatings id={reviewDataProps.product} /> : null}
      </span>
      <br />
      { metaDataProps ? Object.keys(metaDataProps.ratings).reverse().map((key) => (
        <div>
          <label htmlFor="ratings">
            {Number(key)}
            {' '}
            {' '}
            stars
          </label>
          <meter id="ratings" value={metaDataProps.ratings[key]} min="0" max="10" />
        </div>
      )) : null}
      <br />
      <br />

      <div className="slidecontainer">
        {metaDataProps ? Object.keys(metaDataProps.characteristics).map((key) => (
          <div>
            <label htmlFor="ratings">
              {key}
            </label>
            <br />
            <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
            <br />
            {Object.entries(metaObj).filter((item) => item[0] === key).flat().splice(1, 1)
              .map((newItem) => (
                <span>
                  <div className="left">{newItem[1]}</div>
                  <div className="middle">{newItem[3]}</div>
                  <div className="right">{newItem[5]}</div>
                </span>
              ))}
            <br />
          </div>

        )) : null}
      </div>
    </div>
  );
};

export default MetaDataComponent;
