/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../hooks/context';

const selector = {
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'relative',
  alignItems: 'center',
};
// const dropD = {
//   backgroundColor: 'transparent',
//   color: 'black',
//   borderColor: 'black',
//   minWidth: 'auto',
// };
const miniSelector = {
  width: '20px',
  height: '20px',
  boarderRadius: '50%',
  border: '1px solid black',
  marginBottom: '1rem',
};

export default function Selector() {
  const currentId = String(useContext(AppContext).defaultItem.id);
  const currentItem = useContext(AppContext).defaultItem;

  const [productName, setProductName] = useState();

  useEffect(() => {
    axios
      .get(`/products/${currentId}/styles`)
      .then(({ data }) => data.results.map((imgs) => setProductName(imgs)));
  }, []);
  // const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  // gets information for og price sale price skus name console.log(productName);
  console.log(productName);
  return (
    <div style={selector}>
      <div>
        <h5>CATEGORY</h5>
      </div>
      <div>
        <h1>{currentItem.name}</h1>
      </div>
      <div>
        <h5>${Math.round(currentItem.default_price)}</h5>
      </div>
      <div>
        <h4>
          <strong>Style &lt;</strong>SELECTED STYLE
        </h4>
        {/* {productName.map((img) => (
          <img src={img.url} style={miniSelector} alt="Clothing Img" />
        ))} */}
      </div>
      <div>
        {/* ask how to access skus better to team */}
        {/* {sizes.map((size) => (
              <Dropdown.Item>
                <button type="button" style={dropD}>
                  {size}
                </button> */}
        {/* </Dropdown.Item>
            ))} */}
      </div>
      <div>
        <h4>{currentItem.slogan}</h4>
        <i>{currentItem.description}</i>
      </div>
    </div>
  );
}
