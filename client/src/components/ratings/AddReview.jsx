import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UploadFile from '../sharedComponents/UploadFile.jsx';

const AddReview = ({ props, data }) => {
  const postObj = {
    product_id: parseInt(data.product_id),
    rating: null,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: 'hi@gmail.com',
    photos: [],
    characteristics: {
      [data.characteristics.Fit.id]: 0,
      [data.characteristics.Length.id]: 0,
      [data.characteristics.Comfort.id]: 0,
      [data.characteristics.Quality.id]: 0,
    },
  };
  const [showModal, setShowModal] = useState();
  const [postObject, setPostObject] = useState(postObj);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/reviews', postObject)
      .then(() => {
        console.log('success!!');
      });
  };

  const handleChange = (event) => {
    const newRequest = { ...postObject };
    if (event.target.name === 'rating') {
      newRequest[event.target.name] = parseInt(event.target.value, 10);
    } else if (event.target.name === 'recommend') {
      newRequest[event.target.name] = Boolean(event.target.value);
    } else {
      newRequest[event.target.name] = event.target.value;
    }
    setPostObject(newRequest);
  };

  const handleNestedChange = (event) => {
    const newRequest = { ...postObject };
    newRequest.characteristics[event.target.name] = parseInt(event.target.value, 10);
    setPostObject(newRequest);
  };

  const handleClick = () => {
    setShowModal(false);
  };
  useEffect(() => {
    setShowModal(props);
  }, [props]);

  return (
    <div>
      {showModal
        ? (
          <div className="modalBackground">
            <div className="modalContainer">
              <div className="scroller">
                <div className="titleCloseBtn">
                  <button type="submit" onClick={handleClick}>X</button>
                </div>
                <div className="title">
                  Add Review
                </div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="rating">Rate this product:</label>
                  <select name="rating" id="rating" onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <br />
                  <input type="text" id="fname" name="summary" placeholder="Add a brief summary here" onChange={handleChange} value={postObject.summary} />
                  <br />
                  <br />
                  <textarea className="a" name="body" value={postObject.body} onChange={handleChange} rows="15" cols="40" placeholder="Add your review here" style={{ resize: 'none', width: 'content-fit' }} />
                  <label htmlFor="recommend"> Would you recommend this product?</label>
                  <br />
                  <label htmlFor="recommendyes"> Yes</label>
                  <input type="checkbox" id="recommendyes" name="recommend" value={1} onChange={handleChange} />
                  <label htmlFor="recommendno"> No</label>
                  <input type="checkbox" id="recommendno" name="recommend" value={0} onChange={handleChange} />
                  <br />
                  <input type="text" id="fname" name="name" value={postObject.name} onChange={handleChange} placeholder="Your name here" />
                  <br />
                  <br />
                  <label htmlFor="fit">Fit(From 1 to 5):</label>
                  <br />
                  Loose
                  <input type="range" name={data.characteristics.Fit.id} value={postObject.characteristics[data.characteristics.Fit.id]} onChange={handleNestedChange} id="vol" min="0" max="5" />
                  Tight
                  <br />
                  <label htmlFor="length">Length (From 1 to 5):</label>
                  <br />
                  <input type="range" id="vol" name={data.characteristics.Length.id} value={postObject.characteristics[data.characteristics.Length.id]} onChange={handleNestedChange} min="0" max="5" />
                  <br />
                  <label htmlFor="comfort">Comfort (From 1 to 5):</label>
                  <br />
                  <input type="range" id="vol" name={data.characteristics.Comfort.id} value={postObject.characteristics[data.characteristics.Comfort.id]} onChange={handleNestedChange} min="0" max="5" />
                  <br />
                  <label htmlFor="quality">Quality (From 1 to 5):</label>
                  <br />
                  <input type="range" id="vol" name={data.characteristics.Quality.id} value={postObject.characteristics[data.characteristics.Quality.id]} onChange={handleNestedChange} min="0" max="5" />
                  <UploadFile />
                  <button type="button" onClick={handleSubmit}>Submit Review </button>
                  <div className="footer" />
                </form>
              </div>
            </div>
          </div>
        )
        : null }
    </div>
  );
};

export default AddReview;
