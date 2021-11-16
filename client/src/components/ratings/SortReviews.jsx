import React, { useState } from 'react';
import { render } from 'react-dom';

const SortReviews = ({
  data, setData, setRender, test,
}) => {
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
    } if (filter === 'Rating') {
      return data.results.slice().sort((a, b) => b.rating - a.rating);
    }
  };

  return (

    <div>
      {' '}
      <select
        name="filter"
        id="filter"
        onChange={(e) => setData(sortReviewsFunction(e.target.value))}
        style={{
          backgroundColor: 'transparent', border: 'none', fontWeight: 'bold', fontSize: '18px',
        }}
      >
        <option value="Relevance">Relevance</option>
        <option value="Helpful">Helpful</option>
        <option value="Newest">Newest</option>
        <option value="Rating">Rating</option>
      </select>
    </div>
  );
};

export default SortReviews;
