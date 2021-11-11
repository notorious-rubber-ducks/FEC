import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import MetaDataComponent from './MetaDataComponent.jsx';
import AppContext from '../../hooks/context.js';

const Ratings = ({ captureMetaData }) => {
  const context = useContext(AppContext).defaultItem;
  const [reviewData, setReviewData] = useState();
  const [metaData, setMetaData] = useState();
  const [firstTwo, setFirstTwo] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    Promise.all([
      axios
        .get(`/reviews?product_id=${context.id}`, {
          params: {
            count: 1000,
          },
        })
        .then(({ data }) => data),
      axios
        .get(`/reviews/meta?product_id=${context.id}`)
        .then(({ data }) => data),
    ])
      .then((data) => {
        setMetaData(data[1]);
        setReviewData(data[0]);
        setFirstTwo(data[0].results.slice(0, 2));
        setSize(data[0].count);
      })
      .catch((err) => err);
  }, [context.id]);

  return (
    <div id="ratings" onKeyPress={() => {}} onClick={(e) => { captureMetaData(e, 'ratings'); }} style={{ marginTop: '50px', paddingTop: '20px', borderTop: '2px solid' }}>
      <div style={{
        display: 'flex',
        flex: '0 0 30%',
        width: '50%',
        marginLeft: 10,
      }}
      >
        <h2>RATINGS AND REVIEWS</h2>
      </div>
      <div style={{
        display: 'flex', alignItems: 'stretch', flexDirection: 'row', width: '80%', margin: '2%',
      }}
      >

        <div style={{
          flexBasis: '40%', flex: '0 0 30%', width: '50%',
        }}
        >
          <MetaDataComponent reviewDataProps={reviewData} metaDataProps={metaData} />
        </div>

        <div className="scrollable" style={{ flex: '0 0 80%', overflowY: 'scroll', maxHeight: '600px', padding:10}}>
          <ReviewsList
            reviewDataProps={reviewData}
            metaDataProps={metaData}
            size={size}
            firstTwo={firstTwo}
          />
        </div>

      </div>
    </div>

  );
};

export default Ratings;
