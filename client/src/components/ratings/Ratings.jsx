import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import MetaDataComponent from './MetaDataComponent.jsx';
import AppContext from '../../hooks/context.js';

const Ratings = ({ captureMetaData }) => {
  const context = useContext(AppContext).defaultItem;
  const [reviewData, setReviewData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [metaData, setMetaData] = useState();
  const [firstTwo, setFirstTwo] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    Promise.all([
      axios
        .get(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}reviews?product_id=${context.id}`, {
          params: {
            count: 1000,
          },
        })
        .then(({ data }) => data),
      axios
        .get(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}reviews/meta?product_id=${context.id}`)
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
        marginLeft: '10px',
      }}
      >
        <h2>RATINGS AND REVIEWS</h2>
      </div>
      <div style={{
        display: 'flex', alignItems: 'stretch', flexDirection: 'row', margin: '2%',
      }}
      >

        <div style={{
          flexBasis: '40%', flex: '0 0 30%', width: '50%', paddingTop: 'none', marginTop: 'none',
        }}
        >
          <MetaDataComponent reviewDataProps={reviewData} metaDataProps={metaData} setData={setFilteredData} />
        </div>

        <div style={{ flex: '0 0 70%', maxHeight: '600px', maxWidth: '80%' }}>
          <ReviewsList
            reviewDataProps={reviewData}
            metaDataProps={metaData}
            filtered={filteredData}
            setFiltered={setFilteredData}
            size={size}
            firstTwo={firstTwo}
          />
        </div>

      </div>
    </div>

  );
};

export default Ratings;
