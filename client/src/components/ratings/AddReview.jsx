import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddReview = ({ props }) => {
  const [body, setBody] = useState();

  const handleChange = (e) => {

  };
  const handleSubmit = () => {

  };
  useEffect(() => {
    setBody(props);
  }, [props]);

  useEffect(() => {
    axios.post(`/reviews/?product_id=${id}`, body);
    // placeholder for new review post
  });

  return (
    <div>
      {props > 0 ? null : <button type="submit">Add Review</button>}
    </div>
  );
};

export default AddReview;
