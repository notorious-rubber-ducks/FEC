/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext';
import HorizontalCarousel from './HorizontalCarousel.jsx';

function Related() {
  // state for related item array
  const [related, setRelated] = useState([]);
  const [outfits, setOutfits] = useState(['Add to Outfit']);

  const currentId = String(useContext(AppContext).defaultItem.id);
  // state for current productId
  const [productId, setProductId] = useState(currentId);

  // define variable to get the related item array
  function getRelated(id) {
    // get list of related items
    axios.get(`/products/${id}/related`)
      .then((response) => {
        // clean up related data coming in from API so related item array only has unique values
        const relatedArray = response.data.filter((el, i, arr) => arr.indexOf(el) === i);

        // create an array of promises for style data
        const stylePromise = relatedArray.map((item) => axios.get(`/products/${item}/styles`)
          .then(({ data }) => data));

        // create an array of promises for normal data
        const normalPromise = relatedArray.map((product) => axios.get(`/products/${product}`)
          .then(({ data }) => data));

        // return combined promise array which should be in order
        return stylePromise.concat(normalPromise);
      })
      .then((promiseArray) => {
        // use promise all on the array of promises so that when resolved the results
        // can be passed into the relatedItems state
        Promise.all(promiseArray)
          .then((values) => {
            const relatedItems = [];

            for (let i = 0; i < values.length / 2; i += 1) {
              // into related items array push an object which combines
              // the response from styles with the response from the normal product info call
              relatedItems.push({ ...values[i], ...values[i + (values.length / 2)] });
            }
            setRelated(relatedItems);
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    // get any user outfit data from server
    axios.get('/outfit')
      .then(({ data }) => {
        // copy current outfits and filter out unique outfits
        setOutfits(
          outfits.concat(data)
            .filter((item, index, container) => container.indexOf(item) === index),
        );
      });
  }, []);

  // when rendering component invoke the getRelated function with the productId state
  // also watch productId to re-render on it's change
  useEffect(() => {
    getRelated(productId);
  }, [productId]);

  return (
    <RelatedContext.Provider value={{ setProductId, outfits, setOutfits }}>
      <div id="related">
        <div id="related-products">
          <h3 style={{ marginLeft: '10px' }}>RELATED PRODUCTS</h3>
          <HorizontalCarousel items={related} />
        </div>
        <div id="your-outfit">
          <h3 style={{ marginLeft: '10px' }}>YOUR OUTFIT</h3>
          <HorizontalCarousel items={outfits} />
        </div>
      </div>
    </RelatedContext.Provider>
  );
}

export default Related;
