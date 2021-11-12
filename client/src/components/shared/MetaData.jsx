/* eslint-disable func-names */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { Fragment } from 'react';

export default function MetaData({ children }) {
  const captureMetaData = function (e, target) {
    axios.post('http://localhost:3000/interactions', {
      element: e.target.localName,
      widget: target,
      time: new Date(),
    })
      .catch((err) => err);
  };

  return (
    <>
      {children.map((child) => React.cloneElement(child, { captureMetaData }))}
    </>
  );
}
