/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Questions from './components/questions/Questions.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Related from './components/related/Related.jsx';
import AppContext from './hooks/context';
import MetaData from './components/shared/MetaData.jsx';

export default function App() {
  const [defaultItem, setDefaultItem] = useState({});
  const [imageDirs, setImageDirs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => {
        // get first item
        const { id } = response.data[0];

        // generate promise array and pass into promise all
        Promise.all([
          axios.get(`http://localhost:3000/products/${id}`)
            .then(({ data }) => data),
          axios.get(`http://localhost:3000/products/${id}/styles`)
            .then(({ data }) => (data)),
        ])
          .then((values) => {
            // set default item to be a combination of both API call results
            setDefaultItem(Object.assign(values[0], values[1]));
            // set loading to false so page will render
            setLoading(false);
          })
          .catch(console.log);
      })
      .catch(console.log);
  }, []);

  // conditional render
  if (loading) {
    return (
      <div>Loading now...</div>
    );
  }

  return (

    <AppContext.Provider value={{
      defaultItem, setDefaultItem, imageDirs, setImageDirs,
    }}
    >
      <MetaData>
        <Overview key="overview" />
        <Related key="related" />
        <Questions key="questions" />
        <Ratings key="ratings" />
      </MetaData>
    </AppContext.Provider>
  );
}
