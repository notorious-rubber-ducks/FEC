import React from 'react';


export default function StyleSelector ({ styles, setStyle, currStyle }) {
  return (
    <div className='flexContainer' style={{flexWrap:'wrap', maxWidth:300}}>
      {styles.map(style => {
        if (JSON.stringify(style) === JSON.stringify(currStyle)) {
          return (<span key={style.style_id} style={{padding:10,width:55,height:55}}>
            <img onClick={() => setStyle(style)}
             src={style.photos[0].thumbnail_url}
            alt={currStyle.name}
            className='styleSelector'
            style={{border:'2px solid red'}}/>
          </span>)
        } else {
          return (<span key={style.style_id} style={{padding:10,width:55,height:55}}>
            <img onClick={() => setStyle(style)}
            src={style.photos[0].thumbnail_url}
            alt={currStyle.name}
            className='styleSelector'/>
          </span>)
        }
        }
      )}
    </div>
  );
};