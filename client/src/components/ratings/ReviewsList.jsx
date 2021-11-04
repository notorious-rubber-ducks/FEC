import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddReview from './AddReview.jsx';
import ReviewBody from './ReviewBody.jsx';

const ReviewsList = ({ id }) => {
  const ModalContext = React.createContext();
  const [list, setList] = useState();
  const [sliceIndex, setSliceIndex] = useState(2);
  const [renderList, setRenderList] = useState(null);
  const [listSize, setListSize] = useState();
  const [reviewModal, setReviewModal] = useState();

  const renderReview = () => renderList.map((item) => <div>{item.summary}</div>);

  const handleClick = () => {
    setListSize(listSize - 2);
    setSliceIndex(sliceIndex + 2);
    setRenderList(list.slice(0, sliceIndex + 2));
  };

  const openReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  useEffect(() => {
    axios
      .get(`/reviews/?product_id=${id}`)
      .then(({ data }) => {
        console.log(data);
        setList(data.results);
        setListSize(data.results.length);
        setRenderList(data.results.slice(0, sliceIndex));
      })
      .catch((err) => err);
  }, []);

  return (

    <div>
      <button type="submit" onClick={openReviewModal}>Add Review </button>
      {reviewModal ? <AddReview props={reviewModal} /> : null}
      {renderList ? renderList.map((review) => <ReviewBody props={review} />)
        : null}

      {renderList ? renderReview() : null}
      {listSize > 2 ? <button type="submit" onClick={handleClick}>Show More</button> : null }
    </div>

  );
};

export default ReviewsList;
