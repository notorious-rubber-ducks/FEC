/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../hooks/context.js';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';



export default function Overview() {
  let { defaultItem } = useContext(AppContext);

  /* define a default style based on the default? property of the results object */
  let defaultStyle = defaultItem.results.filter((item) => item['default?'] === true)[0];
  // if there is no default style just use the first item in the results array
  if (defaultStyle === undefined) {
    [defaultStyle] = defaultItem.results;
  }

  let [currentStyle, setCurrentStyle] = useState(defaultStyle);


  return (
    <div id="overview">
      <h2 className='overview-title'>Overview</h2>
      <div className='flexContainer'>
        <LeftPanel />
        <RightPanel />
      </div>
      <div className='flexContainer'>
        <span style={{width:'60%'}}>
          "Product slogan goes here"
        </span>
        <span style={{borderLeft:'1px solid black', paddingLeft: 10}}>
          Product features here
        </span>
      </div>
    </div>
  );
}
