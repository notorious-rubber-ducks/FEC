import React, { useState, useEffect } from 'react';

export default function StyleSelector ({ styles }) {
  console.log(styles);
  return (
    <div className='flexContainer' style={{flexWrap:'wrap', width:375}}>
      {styles.map(style => (<span key={style.style_id} style={{padding:10,width:55,height:55}}><img src={style.photos[0].thumbnail_url} className='styleSelector'/></span>))}
    </div>
  );
};