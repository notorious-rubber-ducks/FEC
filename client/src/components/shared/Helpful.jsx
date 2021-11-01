import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Helpful ({ helpfulness, calledFrom, id}) {
  let apiEndPoint;

  let [helpful, setHelpful] = useState(helpfulness);


  if (calledFrom === 'q') {
    apiEndPoint = `/qa/questions/${id}`
  } else if (calledFrom === 'a') {
    apiEndPoint = `/qa/answers/${id}`
  } else if (calledFrom === 'review') {
    apiEndPoint = `/reviews/${id}`
  }


  function isHelpful() {

    setHelpful(helpfulness + 1);

    axios.put(`${apiEndPoint}/helpful`);
  }

  function report() {
    console.log('reported');
    axios.put(`${apiEndPoint}/report`);
  }

  let linkStyling = {
    'textDecoration': 'underline',
    color: 'blue'
  };

  if(calledFrom === 'q') {
    return (
      <span style={{'float':'right'}}>
        Helpful? <a onClick={isHelpful} style={linkStyling}>Yes({helpful})</a>
      </span>
    )
  } else {
    return (
      <span style={{'float':'right'}}>
        Helpful? <a onClick={isHelpful} style={linkStyling}>Yes({helpful})</a> <a onClick={report} style={linkStyling}>Report</a>
      </span>
    )
  }

};