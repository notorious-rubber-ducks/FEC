import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UploadFile from './UploadFile.jsx';

const AddReview = ({ props }) => {
  const [showModal, setShowModal] = useState();
  const [postObject, setPostObject] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/reviews', postObject);
  };

  const handleChange = () => {

  };

  const handleClick = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setShowModal(props);
  }, [props]);

  // useEffect(() => {
  //   axios.post(`/reviews/?product_id=${id}`, body);
  //   // placeholder for new review post
  // });

  return (
    <div>
      {showModal
        ? (
          <div className="modalBackground">
            <div className="modalContainer">
              <div className="titleCloseBtn">
                <button type="submit" onClick={handleClick}>X</button>
              </div>
              <div className="title">
                Add Review
              </div>
              <form onSubmit={handleSubmit}>
              <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
                <textarea className="body" rows="15" cols="40" placeholder="Add your review here" style={{ resize: 'none', width: '100%' }} />
                <br />
                <UploadFile />
                <div className="footer" />
              </form>
            </div>

          </div>
        )
        : null }
    </div>
  );
};

export default AddReview;
