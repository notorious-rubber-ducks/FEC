/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import StarRatings from '../sharedComponents/StarRatings.jsx';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext';
import RelatedModal from './RelatedModal.jsx';

export default function ProductCard({ product, setLocation, identifier }) {
// pull in state from other components to handle click
  const { setDefaultItem, defaultItem } = useContext(AppContext);
  const {
    related, outfits, setOutfits, setProductId,
  } = useContext(RelatedContext);

  // if product is empty then return a rendering card
  if (product === 'Add to Outfit') {
    const outfitCardStyle = {
      display: 'block',
      fontSize: '1.75em',
    };
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
        onClick={addNewOutfit}
        className="outfit-card"
      >
        <div style={{ fontSize: '4em', ...outfitCardStyle }}>+</div>
        <div style={outfitCardStyle}>Add to Outfit</div>
      </div>
    );
  }

  /* define a default style based on the default? property of the results object */
  let defaultStyle = product.results.filter((item) => item['default?'] === true)[0];
  // if there is no default style just use the first item in the results array
  if (defaultStyle === undefined) {
    [defaultStyle] = product.results;
  }

  const [modalShown, setModalShown] = useState(false);

  /* Event Handlers */

  function handleProductCardClick() {
    // change app level product id
    Promise.all([
      axios.get(`/products/${product.id}`)
        .then(({ data }) => data),
      axios.get(`products/${product.id}/styles`)
        .then(({ data }) => (data)),
    ])
      .then((values) => {
        // change the state of the horizontal carousel
        setLocation(0);
        // scroll all the way to the left
        document.getElementById(`carousel-inner-${identifier}`).scrollLeft -= (220 * related.length);

        // set default item to be a combination of both API call results
        setDefaultItem(Object.assign(values[0], values[1]));
        // set product id for related components to be the card's product.id
        setProductId(product.id);
      })
      .catch((err) => err);
  }

  function addNewOutfit() {
    // prevent adding the same item to the outfit list
    if (outfits.slice(1).find((item) => item.id === defaultItem.id) !== undefined) {
      return;
    }
    // set state and store it in browser cache
    setOutfits([...outfits, defaultItem]);
    window.localStorage.setItem('userOutfits', JSON.stringify([...outfits, defaultItem]));
  }

  function removeOutfit() {
    const index = outfits.indexOf(outfits.find((item) => item.id === product.id));

    const temp = [...outfits];
    temp.splice(index, 1);

    setOutfits(temp);
    window.localStorage.setItem('userOutfits', JSON.stringify(temp));

    // change the state of the horizontal carousel
    setLocation(0);
    document.getElementById(`carousel-inner-${identifier}`).scrollLeft -= (220 * outfits.length);
  }

  // create function to handle a modal opening
  function handleButtonClick() {
    setModalShown(true);
  }

  /* Conditional Rendering Variables */

  let cardButton = (
    <button type="button" onClick={handleButtonClick}>
      &#9733;
    </button>
  );

  if (identifier === 'outfit') {
    cardButton = (
      <button type="button" onClick={removeOutfit}>
        X
      </button>
    );
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

  /* Return statement */

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
      {cardButton}
    </div>
  );
}
