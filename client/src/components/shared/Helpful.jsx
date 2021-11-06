import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Helpful ({ helpfulness, calledFrom, id}) {
  let apiEndPoint;

  let helpLinkStyling = {
    'textDecoration': 'underline',
    color: 'blue'
  };

  let reportLinkStyling;

  let [helpful, setHelpful] = useState(helpfulness);
  let [reported, setReported] = useState('Report');
  let [voted, setVoted] = useState(false);

  if (reported === 'Report') {
    reportLinkStyling = {
      'textDecoration': 'underline',
      color: 'blue'
    };
  } else {
    reportLinkStyling = {
      'textDecoration': 'none',
      color: 'black'
    };
  }

  if (calledFrom === 'q') {
    apiEndPoint = `/qa/questions/${id}`
  } else if (calledFrom === 'a') {
    apiEndPoint = `/qa/answers/${id}`
  } else if (calledFrom === 'review') {
    apiEndPoint = `/reviews/${id}`
  }

  let fontStyle = {
    fontSize: 12
  }

  function isHelpful() {
    if (!voted) {
      console.log('should only see this once');
      setHelpful(helpfulness + 1);
      setVoted(true);
      axios.put(`${apiEndPoint}/helpful`);
    }
  }

  function report() {
    if (reported === 'Report') {
      console.log('should only see this once');
      setReported('Reported');
      axios.put(`${apiEndPoint}/report`);
    }
  }

  if (calledFrom === 'q') {
    return (
      <span style={fontStyle} className='qHelpful'>
        Helpful? <a onClick={isHelpful} style={helpLinkStyling}>Yes({helpful})</a> {' | '} <a style={reportLinkStyling} onClick={report}>{reported}</a>{' | \u00A0'} {/* <- non-breaking space */}
      </span>
    )
  } else {
    return (
      <span style={fontStyle}>
        Helpful? <a onClick={isHelpful} style={helpLinkStyling}>Yes({helpful})</a>{' | '} {/* <- non-breaking space */}
        <a onClick={report} style={reportLinkStyling}>{reported}</a>
      </span>
    )
  }

};