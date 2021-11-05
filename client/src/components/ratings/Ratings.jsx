import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import MetaDataComponent from './MetaDataComponent.jsx';
import AppContext from '../../hooks/context.js';

const Ratings = () => {
  const context = useContext(AppContext).defaultItem;
  const [reviewData, setReviewData] = useState();
  const [metaData, setMetaData] = useState();
  const [firstTwo, setFirstTwo] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    Promise.all([
      axios
        .get(`/reviews?product_id=${context.id}`)
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
  }, []);

  return (
    <div>
      <ReviewsList
        reviewDataProps={reviewData}
        metaDataProps={metaData}
        size={size}
        firstTwo={firstTwo}
      />
      <MetaDataComponent reviewDataProps={reviewData} metaDataProps={metaData} />
    </div>
  );
};

export default Ratings;
