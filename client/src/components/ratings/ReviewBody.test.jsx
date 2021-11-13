import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { useContext } from 'react';
import ReviewBody from './ReviewBody';
import AppContext from '../../hooks/context.js';

xtest('renders a text body from a submitted review', () => {
  const defaultItem = { id: 44388 };

  render(<AppContext.Provider value={{ defaultItem }}>
    <ReviewBody />

  </AppContext.Provider>);
  screen.debug();
});
