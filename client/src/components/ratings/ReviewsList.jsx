import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
import ReviewBody from './ReviewBody.jsx';

const ReviewsList = ({
  reviewDataProps, metaDataProps, size, firstTwo,
}) => {
  const [reviewList, setReviewList] = useState();
  const [sliceIndex, setSliceIndex] = useState(2);
  const [renderList, setRenderList] = useState(null);
  const [listSize, setListSize] = useState();
  const [reviewModal, setReviewModal] = useState(false);
  const [metaData, setMetaData] = useState();

  const renderReview = () => renderList.map((item) => <div>{item.summary}</div>);

  const handleClick = () => {
    setListSize(listSize - 2);
    setSliceIndex(sliceIndex + 2);
    setRenderList(reviewList.results.slice(0, sliceIndex + 2));
  };

  const openReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  useEffect(() => {
    setReviewList(reviewDataProps);
    setListSize(size);
    setRenderList(firstTwo);
    setMetaData(metaDataProps);
  }, [reviewDataProps, metaDataProps, size, firstTwo]);

  return (

    <div>
      <button type="submit" onClick={openReviewModal}>Add Review </button>
      {reviewModal ? <AddReview props={reviewModal} data={metaData} /> : null}
      {renderList ? renderList.map((review) => <ReviewBody props={review} />)
        : null}

      {renderList ? renderReview() : null}
      {listSize > 2 ? <button type="submit" onClick={handleClick}>Show More</button> : null }
    </div>

  );
};

export default ReviewsList;
