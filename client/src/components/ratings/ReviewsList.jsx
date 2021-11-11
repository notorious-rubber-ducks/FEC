import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
import ReviewBody from './ReviewBody.jsx';
import SortReviews from './SortReviews.jsx';

const ReviewsList = ({
  reviewDataProps, metaDataProps, size, firstTwo,
}) => {
  const [reviewList, setReviewList] = useState();
  const [data, setData] = useState();
  const [sliceIndex, setSliceIndex] = useState(2);
  const [renderList, setRenderList] = useState(null);
  const [listSize, setListSize] = useState();
  const [reviewModal, setReviewModal] = useState(false);
  const [metaData, setMetaData] = useState();
  const [test, setTest] = useState();

  const handleClick = () => {
    setListSize(listSize - 2);
    setSliceIndex(sliceIndex + 2);
    setRenderList(reviewList.slice(0, sliceIndex + 2));
  };

  const openReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  useEffect(() => {
    setData(reviewDataProps);
    setListSize(size);
    reviewDataProps ? setRenderList(reviewDataProps.results.slice(0, 2)) : null;
    setMetaData(metaDataProps);
  }, [reviewDataProps, metaDataProps, size, firstTwo, reviewList]);

  return (

    <div>

      <div
        className="filter"
        style={{
          marginBottom: '5%', display: 'flex', flexDirection: 'row', fontWeight: 'bold', alignItems: 'center',
        }}
      >

        {data ? `${data.results.length} reviews, sorted by  ` : null}
        <SortReviews data={data} setData={setReviewList} setRender={setRenderList} test={setTest} />

      </div>
      {' '}

      {reviewModal ? <AddReview props={reviewModal} data={metaDataProps} /> : null}
      {reviewDataProps ? (reviewList ? reviewList.slice(0, sliceIndex).map((review) => <ReviewBody props={review} />) : reviewDataProps.results.slice(0, sliceIndex).map((review) => <ReviewBody props={review} />)) : null}
      <div style={{ marginTop: '2%' }}>
        {listSize > 2 ? <button type="submit" onClick={handleClick}>Show More</button> : null }
        <button type="submit" onClick={openReviewModal}>Add Review </button>
      </div>
    </div>

  );
};

export default ReviewsList;
