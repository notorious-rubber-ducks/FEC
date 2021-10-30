import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Questions from './components/questions/Questions.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Related from './components/related/Related.jsx';
import AppContext from './hooks/context';

export default function App() {
  const [defaultItem, setDefaultItem] = useState({});
  let id = '';
  useEffect(() => {
    if (defaultItem.id) {
      id = defaultItem.id;
    }
    axios
      .get(`/products/${id}`)
      .then(({ data }) => {
        let useData = data;
        if (Array.isArray(data)) {
          [useData] = data;
        }
        setDefaultItem(useData);
      })
      .catch((err) => err);
  }, []);
  return (
    <AppContext.Provider value={{ defaultItem, setDefaultItem }}>
      <div>
        <Overview />
        <Related />
        <Questions />
        <Ratings />
      </div>
    </AppContext.Provider>
  );
}
