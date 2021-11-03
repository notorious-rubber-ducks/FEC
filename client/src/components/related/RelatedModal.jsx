/* eslint-disable react/prop-types */
import React from 'react';

const divStyle = { height: '1em', margin: '2px' };

export default function RelatedModal({ closeModal, currentItem, productCardItem }) {
  const combineFeatures = (element) => `${element.feature}: ${element.value}`;

  const currentFeatures = currentItem.features.map((item) => combineFeatures(item));
  const PCItem = productCardItem.features.map((item) => combineFeatures(item));

  const createCheckMarkDiv = (index, char) => {
    const key = `${index}-${char}`;
    return (<div style={divStyle} key={key}>&#x2714;</div>);
  };
  const createEmptyDiv = (index, char) => {
    const key = `${index}-${char}`;
    const empty = '\t';
    return (<div style={divStyle} key={key}>{empty}</div>);
  };
  const createCenterDiv = (element, index, char) => {
    const key = `${index}-${char}`;
    return (<div style={divStyle} key={key}>{element}</div>);
  };

  // combine features, fileter out for unique features and then create a 3 column array that
  const allFeatures = [...currentFeatures].concat([...PCItem])
    .filter((a, i, b) => b.indexOf(a) === i)
    .map((item, i) => [
      (currentFeatures.includes(item) ? createCheckMarkDiv(i, 'a') : createEmptyDiv(i, 'a')),
      createCenterDiv(item, i, 'b'),
      (PCItem.includes(item) ? createCheckMarkDiv(i, 'c') : createEmptyDiv(i, 'c')),
    ]);

  const nameLength = Math.max(currentItem.name.length, productCardItem.name.length);
  console.log(nameLength);

  return (
    <div className="modalBackground" onKeyPress={() => {}} tabIndex={0} role="button" onClick={() => { closeModal(false); }}>
      <div className="modalContainer" style={{ height: `${1.25 * (allFeatures.length + 2)}em` }}>
        <div className="titleCloseBtn" />
        <div className="title">COMPARISON</div>
        <div className="body" style={{ justifyContent: 'space-between' }}>
          <span style={{ width: `${nameLength}ch` }}>
            <strong>{currentItem.name}</strong>
            {allFeatures.map((item) => item[0])}
          </span>
          <span>
            <strong>{'\t'}</strong>
            {allFeatures.map((item) => item[1])}
          </span>
          <span style={{ width: `${nameLength}ch` }}>
            <strong>{productCardItem.name}</strong>
            {allFeatures.map((item) => item[2])}
          </span>
        </div>
      </div>
    </div>
  );
}
