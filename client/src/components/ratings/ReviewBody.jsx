import React, { useEffect, useState, useContext } from 'react';
import UploadFile from '../sharedComponents/UploadFile.jsx';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import AppContext from '../../hooks/context.js';

const ReviewBody = ({ props }) => {
  const context = useContext(AppContext).defaultItem;
  const [data, setData] = useState();
  const [bodyLength, setBodyLength] = useState();
  const [body, setBody] = useState();
  const [summary, setSummary] = useState();

  const handleClick = () => {
    setBody(data.body);
  };

  useEffect(() => {
    setData(props);
    setBody(props.body.slice(0, 250));
    setBodyLength(props.body.length);
    setSummary(props.summary.slice(0, 60));
  }, [props]);

  return (
    <div>
      <StarRatings id={context.id} />
      <div
        className="Summary"
        style={{
          fontWeight: 'bold', paddingBottom: '1%', paddingTop: '1%', fontSize: '22px',
        }}
      >
        {summary}
      </div>
      <div className="Body" style={{ paddingBottom: '1%', paddingTop: '1%', borderBottom: '1px solid' }}>
        {body}
        {bodyLength > 250 ? <button type="submit" onClick={handleClick}>Show Full Review</button> : null}
      </div>
    </div>

  );
};

export default ReviewBody;
