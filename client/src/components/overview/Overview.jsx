/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import LeftPanel from './LeftPanel.jsx';
import RightPanel from './RightPanel.jsx';



export default function Overview() {


  return (
    <div>
      <LeftPanel />
      <RightPanel />
    </div>
  );
}
