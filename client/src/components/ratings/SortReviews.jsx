import React, { useState } from 'react';
import { render } from 'react-dom';

const SortReviews = ({
  data, setData, setRender, test,
}) => {
  const [newData, setNewData] = useState();
  const [firstTwo, setFirstTwo] = useState();

  const sortReviewsFunction = (filter) => {
    if (filter === 'Relevance') {
      return data.results.slice().sort((a, b) => {
        const newDateA = new Date(a.date);
        const newDateB = new Date(b.date);
        return newDateB - newDateA || b.helpfulness - a.helpfulness;
      });
    } if (filter === 'Helpful') {
      return data.results.slice().sort((a, b) => b.helpfulness - a.helpfulness);
    } if (filter === 'Newest') {
      return data.results.slice().sort((a, b) => {
        const newDateA = new Date(a.date);
        const newDateB = new Date(b.date);
        return newDateB - newDateA;
      });
    }
  };

  // const updateParent = (e) => sortReviewsFunction(e.target.value);

  return (

    <div>
      {' '}
      {/* {data ? console.log(updateParent(), ' right hurr') : null} */}
      <select
        name="filter"
        id="filter"
        onChange={(e) => setData(sortReviewsFunction(e.target.value))}
        style={{
          backgroundColor: 'transparent', border: '1px solid #d9bfb7', fontWeight: 'bold', fontSize: '18px',
        }}
      >
        <option value="Relevance">Relevance</option>
        <option value="Helpful">Helpful</option>
        <option value="Newest">Newest</option>
      </select>
    </div>
  );
};

export default SortReviews;
