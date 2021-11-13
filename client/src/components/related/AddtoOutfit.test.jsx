/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AppContext from '../../hooks/context.js';
import RelatedContext from '../../hooks/relatedContext.js';
import HorizontalCarousel from './HorizontalCarousel.jsx';

describe('Add to outfit carousel', () => {
  const products = require('../../mocks/productMocks');
  // outfit storage will take place of window.localStorage and/or outfits state variable
  // both variables are updated at the same time.
  // In this case setOutfits is mocked to update variable.
  let outfitStorage;
  const scrollMock = jest.fn();
  beforeEach(() => {
    outfitStorage = ['Add to Outfit', products[1]];
    // mock the consoleWidth and scroll left
    jest
      .spyOn(Document.prototype, 'getElementById')
      .mockImplementation(() => ({
        clientWidth: 500,
        scrollLeft: scrollMock(),
      }));

    render(
      <AppContext.Provider value={{
        defaultItem: products[0],
        setDefaultItem: () => {},
      }}
      >
        <RelatedContext.Provider value={{
          outfits: outfitStorage,
          setOutfits: (input) => {
            outfitStorage = [...input];
          },
          related: [],
          setProductId: () => {},
        }}
        >
          <HorizontalCarousel items={[...outfitStorage]} />
        </RelatedContext.Provider>
      </AppContext.Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('add to outfit carousel should have one Add to Outfit card and other items passed in', () => {
    expect(screen.queryAllByText('ADD TO OUTFIT')).toHaveLength(1);
    expect(screen.queryByText('YEasy 350')).toBeInTheDocument();
  });

  test('clicking on the Add to Outfit card should update a storage state variable', () => {
    expect(outfitStorage).toHaveLength(2);
    fireEvent.click(screen.queryByText('ADD TO OUTFIT'));
    // length should be three because carousel was started with two items and then one was added
    expect(outfitStorage).toHaveLength(3);
  });

  test('clicking on the X in the product card should update a storage state variable', () => {
    expect(outfitStorage).toHaveLength(2);
    fireEvent.click(screen.queryByText('X'));
    // length should be one because there is always the 'ADD TO OUTFIT' card
    expect(screen.queryAllByText('ADD TO OUTFIT')).toHaveLength(1);
    expect(outfitStorage).toHaveLength(1);
  });

  test('horizontal carousel should render the scroll right button when clientWidth is 500', () => {
    // the scroll right button is conditionally rendered when
    // the sum of the location, which starts at 0, and the clientWidth, mocked at 500
    // is greater than or equal to the number of items, 2 in this case, times each card width,
    // which is set to 220px, plus 42.5 times 2 (which is the spacing for the empty buttons)
    expect(screen.queryByText('>')).toBeInTheDocument();
  });

  test('carousel should scroll to the right when the scroll button is clicked', () => {
    fireEvent.click(screen.queryByText('>'));
    expect(scrollMock).toHaveBeenCalled();
  });
});
