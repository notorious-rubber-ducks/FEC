/* eslint-disable func-names */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';

export default function MetaData({ children }) {
  const captureMetaData = function (e, target) {
    axios.post('/interactions', {
      element: e.target.localName,
      widget: target,
      time: new Date(),
    })
      .then((response) => { console.log(response); })
      .catch((err) => err);
  };

  return (
    <div>
      {children.map((child) => React.cloneElement(child, { captureMetaData }))}
    </div>
  );
}
