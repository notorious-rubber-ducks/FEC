import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import React, { useContext } from 'react';
import ReviewBody from './ReviewBody';
import AppContext from '../../hooks/context.js';
import Ratings from './Ratings';

test('renders a text body from a submitted review', async () => {
  let component;
  await act(async () => {
    const defaultItem = { id: '44388' };
    component = render(<AppContext.Provider value={{ defaultItem }}>
      <Ratings />
    </AppContext.Provider>);
    await component.findByText('Its a good idea, and I stand by it.');
  });

  expect(screen.queryByText('Its a good idea, and I stand by it.')).toBeInTheDocument();
});
