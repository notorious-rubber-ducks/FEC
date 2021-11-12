/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext';
import HorizontalCarousel from './HorizontalCarousel.jsx';

export default function Related({ captureMetaData }) {
  // state for related item array
  const [related, setRelated] = useState([]);
  const [outfits, setOutfits] = useState(['Add to Outfit']);

  const currentId = useContext(AppContext).defaultItem.id;
  // state for current productId
  const [productId, setProductId] = useState(currentId);

  // define variable to get the related item array
  function getRelated(id) {
    // get list of related items
    axios.get(`http://localhost:3000/products/${id}/related`)
      .then((response) => {
        // clean up related data coming in from API so related item array only has unique values
        const relatedArray = response.data.filter(
          (el, i, arr) => (arr.indexOf(el) === i && el !== currentId),
        );

        // create an array of promises for style data
        const stylePromise = relatedArray.map((item) => axios.get(`http://localhost:3000/products/${item}/styles`)
          .then(({ data }) => data));

        // create an array of promises for normal data
        const normalPromise = relatedArray.map((product) => axios.get(`http://localhost:3000/products/${product}`)
          .then(({ data }) => data));

        // use promise all on the array of promises so that when resolved the results
        // can be passed into the relatedItems state
        const promises = [stylePromise, normalPromise];
        Promise.all(promises.map((item) => Promise.all(item)))
          .then((values) => {
            // create array for related items
            const relatedItems = [];

            values[0].forEach((item, index) => {
              // into related items
              relatedItems.push({ ...item, ...values[1][index] });
            });

            setRelated(relatedItems);
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    // if there is no cache set on browser, then set starting cache
    if (window.localStorage.getItem('userOutfits') === null) {
      window.localStorage.setItem('userOutfits', JSON.stringify(outfits));
    }

    // // pull current browser cache and set state equal to it
    setOutfits(JSON.parse(window.localStorage.getItem('userOutfits')));
  }, []);

  // when rendering component invoke the getRelated function with the productId state
  // also watch productId to re-render on it's change
  useEffect(() => {
    getRelated(productId);
  }, [productId]);

  return (
    <RelatedContext.Provider value={{
      related, setProductId, outfits, setOutfits,
    }}
    >
      <div id="related" role="button" tabIndex={0} onKeyPress={() => {}} onClick={(e) => captureMetaData(e, 'related')}>
        <div id="related-products">
          <h2 style={{ marginLeft: '10px' }}>RELATED PRODUCTS</h2>
          <HorizontalCarousel items={related} />
        </div>
        <div id="your-outfit">
          <h2 style={{ marginLeft: '10px' }}>YOUR OUTFIT</h2>
          <HorizontalCarousel items={outfits} />
        </div>
      </div>
    </RelatedContext.Provider>
  );
}
