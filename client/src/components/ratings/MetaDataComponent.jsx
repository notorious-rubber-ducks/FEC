import React, { useEffect, useState } from 'react';
import StarRatings from '../sharedComponents/StarRatings.jsx';

const MetaDataComponent = ({ reviewDataProps, metaDataProps }) => {
  const [reviewData, setReviewData] = useState();
  const [metaData, setMetaData] = useState();

  const avgRating = () => (reviewData.results.reduce((a, b) => (a + b.rating), 0) / reviewData.count);

  useEffect(() => {
    setReviewData(reviewDataProps);
    setMetaData(metaDataProps);
  }, [reviewDataProps, metaDataProps]);

  return (
    <div>
      Ratings and Reviews
      {' '}

      <br />
      {reviewData ? <h1>{avgRating()}</h1> : null}
      {reviewData ? <StarRatings id={reviewData.product} /> : null}

      <br />
      { metaData
        ? (
          <div>

            <br />
            <label htmlFor="disk_c">5 stars</label>
            <meter id="disk_c" value={metaData.ratings[5]} min="0" max="10">2 out of 10</meter>
            <br />
            <label htmlFor="disk_c">4 stars</label>
            <meter id="disk_c" value={metaData.ratings[4]} min="0" max="10">2 out of 10</meter>
            <br />
            <label htmlFor="disk_c">3 stars</label>
            <meter id="disk_c" value={metaData.ratings[3]} min="0" max="10">2 out of 10</meter>
            <br />
            <label htmlFor="disk_c">2 stars</label>
            <meter id="disk_c" value={metaData.ratings[2]} min="0" max="10">2 out of 10</meter>
            <br />
            <label htmlFor="disk_c">1 stars</label>
            <meter id="disk_c" value={metaData.ratings[1]} min="0" max="10">2 out of 10</meter>
            <br />
            <br />
            <br />

            <br />

            <div className="slidecontainer">
              <input type="range" min="1" max="5" value={metaData.characteristics.Comfort.value} className="slider" id="myRange" />
              <br />
              <div className="left">Poor</div>
              <div className="middle">Average</div>
              <div className="right">Perfect</div>

              <br />
              <input type="range" min="1" max="5" value={metaData.characteristics.Length.value} className="slider" id="myRange" />
              <div className="left">Too Short</div>
              <div className="middle">Perfect</div>
              <div className="right">Too Long</div>
              <br />
              <input type="range" min="1" max="5" value={metaData.characteristics.Fit.value} className="slider" id="myRange" />
              <div className="left">Too Small</div>
              <div className="middle">Perfect</div>
              <div className="right">Too Large</div>
              <br />
              <input type="range" min="1" max="5" value={metaData.characteristics.Quality.value} className="slider" id="myRange" />
              <div className="left">Low</div>
              <div className="middle">Medium</div>
              <div className="right">High</div>
            </div>

          </div>
        )
        : null }
    </div>
  );
};

export default MetaDataComponent;
