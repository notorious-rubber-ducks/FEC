import React from 'react';
import Overview from './components/overview/Overview';
import Questions from './components/questions/Questions';
import Ratings from './components/ratings/Ratings';
import Related from './components/related/Related';

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
