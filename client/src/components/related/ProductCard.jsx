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
  const { outfits, setOutfits, setProductId } = useContext(RelatedContext);

  // the axios call and promises can be moved to the app level
  function addNewOutfit() {
    // prevent adding the same item to the outfit list
    if (outfits.slice(1).find((item) => item.id === defaultItem.id) !== undefined) {
      return;
    }

    // generate promise array and pass into promise all
    Promise.all([
      axios.get(`/products/${defaultItem.id}`)
        .then(({ data }) => data),
      axios.get(`products/${defaultItem.id}/styles`)
        .then(({ data }) => (data)),
    ])
      .then((values) => {
        // combine the important information from both objects into one temp object
        const temp = values[0];
        temp.results = values[1].results;

        // change the state of outfits
        const container = [...outfits];
        container.push(temp);
        setOutfits(container);
        // return temp object to pass to development server
        return temp;
      })
      .then((item) => {
        // update the outfits on the server side
        axios.post('/outfit', item)
          .catch((err) => err);
      })
      .catch((err) => err);
  }

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
    axios
      .get(`/products/${product.id}`)
      .then(({ data }) => {
        // change the state of the horizontal carousel
        setLocation(0);
        // scroll all the way to the left
        document.getElementById(`carousel-inner-${identifier}`).scrollLeft -= (220 * data.length);

        // set default item to be data on the app
        setDefaultItem(data);
        // set product id for related components to be the card's product.id
        setProductId(product.id);
      });
  }

  function removeOutfit() {
    const index = outfits.indexOf(outfits.find((item) => item.id === product.id));
    const temp = [...outfits];

    axios.put('/outfit', { index })
      .then(() => {
        // change the state of the horizontal carousel
        setLocation(0);
        // scroll all the way to the left
        document.getElementById(`carousel-inner-${identifier}`).scrollLeft -= (220 * outfits.length);

        temp.splice(index, 1);
        setOutfits(temp);
      })
      .catch((err) => err);
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
        onClick={identifier === 'outfit' ? () => {} : handleProductCardClick}
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
        onClick={identifier === 'outfit' ? () => {} : handleProductCardClick}
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
