import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { longStackTraces } from 'bluebird';
import AddReview from './AddReview.jsx';

const ReviewsList = ({ id }) => {
  const [list, setList] = useState();
  const [sliceIndex, setSliceIndex] = useState(2);
  const [renderList, setRenderList] = useState(null);
  const [listSize, setListSize] = useState();

  const renderReview = () => renderList.map((item) => <div>{item.summary}</div>);

  const handleClick = () => {
    setListSize(listSize - 2);
    setSliceIndex(sliceIndex + 2);
    setRenderList(list.slice(0, sliceIndex + 2));
  };

  useEffect(() => {
    axios
      .get(`/reviews/?product_id=${id}`)
      .then(({ data }) => {
        setList(data.results);
        setListSize(data.results.length);
        setRenderList(data.results.slice(0, sliceIndex));
      })
      .catch((err) => err);
  }, []);

  return (
    <div>
      <AddReview props={listSize} />
      {renderList ? renderReview() : null}
      {listSize > 2 ? <button type="submit" onClick={handleClick}>Show More</button> : null }
    </div>
  );
};

export default ReviewsList;
