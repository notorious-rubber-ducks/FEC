/* eslint-disable react/prop-types */
import React from 'react';

export default function ScrollingButton({ text, clickHandler }) {
  // style variables
  const horizontalButtonStyle = { position: 'absolute', top: '300px' };

  const verticalButtonStyle = {
    position: 'absolute', width: '75px', padding: 0, margin: 0, fontSize: '16px', border: 0, left: '4px',
  };

  const styleVariable = {};

  if (text === 'Up') {
    Object.assign(styleVariable, verticalButtonStyle);
    styleVariable.top = '4px';
  } else if (text === 'Down') {
    Object.assign(styleVariable, verticalButtonStyle);
    styleVariable.bottom = '8px';
  } else if (text === '>') {
    Object.assign(styleVariable, horizontalButtonStyle);
    styleVariable.right = '16px';
  } else if (text === '<') {
    Object.assign(styleVariable, horizontalButtonStyle);
    styleVariable.left = '80px';
  }

  return (
    <button type="button" onClick={clickHandler} style={styleVariable}>{text}</button>
  );
}
