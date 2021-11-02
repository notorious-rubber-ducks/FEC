/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext';
import RelatedModal from './RelatedModal.jsx';

const imageStyle = { width: '200px', height: '200px', objectFit: 'cover' };

export default function ProductCard({ product, setLocation }) {
  const [modalShown, setModalShown] = useState(false);

  // define a default style based on the default? property of the results object
  let defaultStyle = product.results.filter(
    (item) => item['default?'] === true,
  )[0];
  // if there is no default style just use the first item in the results array
  if (defaultStyle === undefined) {
    [defaultStyle] = product.results;
  }

  // define price as original price but change if the item is on sale
  let price = (
    <span>{`$${defaultStyle.original_price}`}</span>
  );
  if (defaultStyle.sale_price !== null) {
    price = (
      <span style={{ color: '#f00' }}>
        {`$${defaultStyle.sale_price}`}
        {' '}
        <del style={{ color: '#000' }}>{`$${defaultStyle.original_price}`}</del>
      </span>
    );
  }

  // pull in state from other components to take care of the
  const { setDefaultItem } = useContext(AppContext);
  const { setProductId } = useContext(RelatedContext);

  function handleProductCardClick() {
    axios
      .get(`/products/${product.id}`)
      .then(({ data }) => {
        // change the state of the horizontal carousel
        setLocation(0);
        // scroll all the way to the left
        document.getElementById('carousel-inner').scrollLeft -= (220 * data.length);

        // set default item to be data on the app
        setDefaultItem(data);
        // set product id for related components to be the card's product.id
        setProductId(product.id);
      });
  }

  function handleButtonClick() {
    console.log('modal should open');
    setModalShown(true);
  }

  return (
    <div
      className="product-card"
      style={{
        border: '2px solid #000',
        width: '200px',
        height: '300px',
        margin: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {modalShown ? <RelatedModal closeModal={setModalShown} /> : ''}
      <div
        className="product-card-image"
        style={{
          width: 'inherit',
          height: '70%',
          textAlign: 'center',
        }}
        onClick={handleProductCardClick}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
      >
        <img
          src={defaultStyle.photos[0].url === null ? './assets/image-not-found.png' : defaultStyle.photos[0].thumbnail_url}
          alt={defaultStyle.name}
          style={imageStyle}
        />
      </div>
      <div
        className="product-card-text"
        onClick={handleProductCardClick}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
      >
        {product.category.toUpperCase()}
        <br />
        <span style={{ fontWeight: 'bold' }}>{product.name}</span>
        <br />
        {price}
        <br />
        <StarRatings id={product.id} />
      </div>
      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          fontSize: '20pt',
          position: 'relative',
          top: '-286px',
          left: '150px',
          width: '50px',
          height: '50px',
          margin: '0',
          borderRadius: '25px',
          border: '0',
          color: '#fff',
          backgroundColor: '#000',
        }}
      >
        &#9733;
      </button>
    </div>
  );
}
