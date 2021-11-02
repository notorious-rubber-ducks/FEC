import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Overview from './components/overview/Overview.jsx';
import Questions from './components/questions/Questions.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Related from './components/related/Related.jsx';
import ReviewsList from './components/ratings/ReviewsList.jsx';
import AppContext from './hooks/context';
import StarRatings from './components/sharedComponents/StarRatings.jsx';

export default function App() {
  const [defaultItem, setDefaultItem] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => err);
  }, []);

  // conditional render
  if (loading) {
    return (
      <div>Loading now...</div>
    );
  }

  return (
    <AppContext.Provider value={{ defaultItem, setDefaultItem }}>
      <div id="test">
        <Overview />
        {/* <Related />
        <Questions /> */}
        {/* <Ratings /> */}
        <StarRatings id={defaultItem.id} />
        <ReviewsList id={defaultItem.id} />
      </div>
    </AppContext.Provider>
  );
}
