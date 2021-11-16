import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadFile from '../sharedComponents/UploadFile.jsx';
import { charObj } from './CharObj.js';
import ImageModal from '../shared/ImageModal.jsx';

const AddReview = ({ props, data, close }) => {
  const postObj = {
    product_id: parseInt(data.product_id),
    rating: null,
    summary: '',
    body: '',
    recommend: null,
    name: '',
    email: '',
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
      .post(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}reviews`, postObject);
  };

  const handleChange = (event) => {
    event.preventDefault();
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
              <div className="scrollable">
                <div className="titleCloseBtn">
                  <button type="submit" onClick={handleClick}>X</button>
                </div>
                <div className="title" style={{ marginBottom: '4%', fontWeight: 'bold', fontSize: 25 }}>
                  Add Review

                </div>
                <br />
                <div style={{ borderTop: '1px solid lightgray', maxWidth: '100%' }} />
                <br />
                <form onSubmit={handleSubmit}>
                  <label style={{ fontWeight: 'bold' }} htmlFor="rating">Rate this product:</label>

                  <div className="star-rating">
                    <input type="radio" name="rating" id="star-a" value="5" onClick={handleChange} />
                    <label htmlFor="star-a" value={postObject.rating} />

                    <input type="radio" name="rating" id="star-b" value="4" onClick={handleChange} />
                    <label htmlFor="star-b" value={postObject.rating} />

                    <input type="radio" name="rating" id="star-c" value="3" onClick={handleChange} />
                    <label htmlFor="star-c" value={postObject.rating} />

                    <input type="radio" name="rating" id="star-d" value="2" onClick={handleChange} />
                    <label htmlFor="star-d" value={postObject.rating} />

                    <input type="radio" name="rating" id="star-e" value="1" onClick={handleChange} />
                    <label htmlFor="star-e" value={postObject.rating} />
                  </div>
                  <label style={{ fontWeight: 'bold' }}> Add a brief summary of the product</label>
                  <br />
                  <input type="text" id="fname" name="summary" placeholder="Add a brief summary here" onChange={handleChange} value={postObject.summary} />
                  <br />
                  <br />
                  <label style={{ fontWeight: 'bold' }} htmlFor="rating">Add a detailed review of the product</label>
                  <br />
                  <textarea className="a" name="body" value={postObject.body} onChange={handleChange} rows="15" cols="40" placeholder="Add your review here" style={{ resize: 'none', width: 'content-fit' }} />
                  <br />
                  <br />
                  <label style={{ fontWeight: 'bold' }} htmlFor="recommend"> Would you recommend this product?</label>
                  <br />
                  <label htmlFor="recommendyes"> Yes</label>
                  <input type="radio" id="recommendyes" name="recommend" value={1} onChange={handleChange} />
                  <label htmlFor="recommendno"> No</label>
                  <input type="radio" id="recommendno" name="recommend" value={0} onChange={handleChange} />
                  <br />
                  <br />

                  <label style={{ fontWeight: 'bold' }} htmlFor="rating">What's your name?</label>
                  <br />
                  <input type="text" id="fname" name="name" value={postObject.name} onChange={handleChange} placeholder="Your name here" />
                  <br />
                  <br />
                  <label style={{ fontWeight: 'bold' }} htmlFor="rating">What's your e-mail?</label>
                  <br />
                  <input type="text" id="femail" name="email" value={postObject.email} onChange={handleChange} placeholder="Your e-mail here" />
                  <br />
                  <br />
                  {data ? Object.keys(data.characteristics).map((key) => (
                    <div>
                      <label htmlFor="ratings" style={{ fontWeight: 'bold' }}>
                        {key}
                      </label>
                      <br />

                      {
                          Object.entries(charObj).filter((item) => item[0] === key).flat().splice(1, 1)
                            .map((test) => (
                              <span>
                                <input type="radio" name={data.characteristics[key].id} value="1" onChange={handleNestedChange} />
                                <label htmlFor="html" name={key} value={postObject.characteristics[data.characteristics[key].id]} style={{ paddingRight: 5 }}>{test[1]}</label>
                                <input type="radio" name={data.characteristics[key].id} value="2" onChange={handleNestedChange} />
                                <label htmlFor="html" name={key} value={postObject.characteristics[data.characteristics[key].id]} style={{ paddingRight: 5 }}>{test[2]}</label>
                                <input type="radio" name={data.characteristics[key].id} value="3" onChange={handleNestedChange} />
                                <label htmlFor="html" name={key} value={postObject.characteristics[data.characteristics[key].id]} style={{ paddingRight: 5 }}>{test[3]}</label>
                                <input type="radio" name={data.characteristics[key].id} value="4" onChange={handleNestedChange} />
                                <label htmlFor="html" name={key} value={postObject.characteristics[data.characteristics[key].id]} style={{ paddingRight: 5 }}>{test[4]}</label>
                                <input type="radio" name={data.characteristics[key].id} value="4" onChange={handleNestedChange} />
                                <label htmlFor="html" name={key} value={postObject.characteristics[data.characteristics[key].id]} style={{ paddingRight: 5 }}>{test[5]}</label>
                                <br />
                              </span>
                            ))
}
                      <br />
                    </div>
                  )) : null}
                  <br />
                  <label style={{ fontWeight: 'bold' }} htmlFor="Upload"> Add images to your review</label>
                  <br />
                  <UploadFile />

                  <br />
                  <div style={{ borderTop: '1px solid lightgray', maxWidth: '100%' }} />

                  <br />

                  <div className="footer"><button type="button" onClick={handleSubmit}>Submit Review </button></div>
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
