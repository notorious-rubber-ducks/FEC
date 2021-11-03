/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext';
import RelatedModal from './RelatedModal.jsx';

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

  // pull in state from other components to handle click
  const { setDefaultItem, defaultItem } = useContext(AppContext);
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

  // create function to handle a modal opening
  function handleButtonClick() {
    setModalShown(true);
  }

  return (
    <div className="product-card">
      {modalShown ? <RelatedModal currentItem={defaultItem} productCardItem={product} closeModal={setModalShown} /> : ''}
      <div
        className="product-card-image"
        onClick={handleProductCardClick}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
      >
        <img
          src={defaultStyle.photos[0].url === null ? './assets/image-not-found.png' : defaultStyle.photos[0].thumbnail_url}
          alt={defaultStyle.name}
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
        <strong>{product.name}</strong>
        <br />
        {price}
        <br />
        <StarRatings id={product.id} />
      </div>
      <button type="button" onClick={handleButtonClick}>
        &#9733;
      </button>
    </div>
  );
}
