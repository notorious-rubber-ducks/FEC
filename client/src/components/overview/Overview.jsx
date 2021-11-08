/* eslint-disable import/extensions */
/* eslint-disable implicit-arrow-linebreak */
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../hooks/context.js';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';

export default function Overview() {
  const { defaultItem } = useContext(AppContext);

  function getDefaultStyle() {
    let defaultStyle = defaultItem.results.filter((item) => item['default?'] === true)[0];
    // if there is no default style just use the first item in the results array
    if (defaultStyle === undefined) {
      [defaultStyle] = defaultItem.results;
    }
    return defaultStyle;
  }

  const [currentStyle, setCurrentStyle] = useState(getDefaultStyle());

  useEffect(() => {
    setCurrentStyle(getDefaultStyle());
  }, [defaultItem]);

  return (
    <div id="overview">
      <h2 className="overview-title">Overview</h2>
      <div className="flexContainer">
        <LeftPanel currentStyle={currentStyle} />
        <RightPanel
          currItem={defaultItem}
          currentStyle={currentStyle}
          setCurrentStyle={setCurrentStyle}
        />
      </div>
      <div className="flexContainer">
        <span style={{ width: '60%' }}>
          <b>{defaultItem.slogan}</b>
          <br />
          <br />
          {defaultItem.description}
        </span>
        <span style={{ borderLeft: '1px solid black', paddingLeft: 10 }}>
          {defaultItem.features.map((feat) => (
            <div key={feat.feature}>
              <span>✓</span>
              {' '}
              {feat.feature}
              :
              {' '}
              {feat.value}
            </div>
          ))}
        </span>
      </div>
    </div>
  );
}
