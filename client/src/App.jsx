import React from 'react';
import Overview from './components/overview/Overview.jsx';
import Questions from './components/questions/Questions.jsx';
import Ratings from './components/ratings/Ratings.jsx';
import Related from './components/related/Related.jsx';

export default function App() {
  return (
    <div>
      <Overview />
      <Related />
      <Questions />
      <Ratings />
    </div>

  );
}
