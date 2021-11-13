import React from 'react';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import { metaObj } from './CharObj.js';

const MetaDataComponent = ({
  reviewDataProps, metaDataProps, setData,
}) => {
  const avgRating = () => Math.round(
    (reviewDataProps.results.reduce(
      (a, b) => (a + b.rating), 0,
    ) / reviewDataProps.results.length) * 10,
  ) / 10;

  const filterRating = (num) => reviewDataProps.results.filter((item) => item.rating === num);

  return (
    <div>
      <div style={{
        display: 'flex', flexDirection: 'row', alignContent: 'stretch', alignItems: 'center',
      }}
      >
        <div style={{ fontSize: '35px', marginRight: '6%' }}>{reviewDataProps ? <h1>{avgRating()}</h1> : null}</div>
        <div>{reviewDataProps ? <StarRatings id={reviewDataProps.product} /> : null}</div>
      </div>

      { metaDataProps ? Object.keys(metaDataProps.ratings).reverse().map((key) => (
        <div style={{ margin: '2%' }}>
          <label
            htmlFor="ratings"
            style={{ fontWeight: 'bold' }}
            onClick={() => setData(filterRating(Number(key)))}
          >
            {Number(key)}
            {' '}
            {' '}
            stars
            {' '}
          </label>
          <meter className="ratings" value={metaDataProps.ratings[key]} min="0" max="10" style={{ width: '70%' }} optimum="1" />
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
            <input type="range" min="1" max="5" value={metaDataProps.characteristics[key].value} className="slider" />
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
