import React, { useEffect, useState } from 'react';

const ReviewBody = ({ props }) => {
  const [data, setData] = useState();
  const [bodyLength, setBodyLength] = useState();
  const [body, setBody] = useState();
  const [summary, setSummary] = useState();

  useEffect(() => {
    setData(props);
    setBody(props.body.slice(0, 250));
    setBodyLength(props.body.length);
    setSummary(props.summary.slice(0, 60));
  }, [props]);

  return (
    <div>
      <div className="Summary" style={{ fontWeight: 'bold' }}>
        {summary}
      </div>
      <div className="Body">
        {body}
        {bodyLength > 250 ? <button type="submit">Show Full Review</button> : null}
      </div>
    </div>

  );
};

export default ReviewBody;
