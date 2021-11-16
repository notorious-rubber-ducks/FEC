/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ProductCard from './ProductCard.jsx';
import AppContext from '../../hooks/context.js';
import RelatedContext from '../../hooks/relatedContext.js';

describe('product card', () => {
  let product;
  let related;
  beforeEach(() => {
    const products = require('../../mocks/productMocks');
    [product] = products;
    related = products;

    render(
      <AppContext.Provider value={{
        defaultItem: product,
        setDefaultItem: () => {},
      }}
      >
        <RelatedContext.Provider value={{
          outfits: ['Add to Outfit'],
          setOutfits: () => {},
          related,
          setProductId: () => {},
        }}
        >
          <ProductCard product={product} identifier="" setLocation={() => {}} />
        </RelatedContext.Provider>
      </AppContext.Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('product card should display product title', () => {
    expect(screen.queryByText('Camo Onesie').innerHTML).toMatch(product.name);
  });

  test('product card should display default product price', () => {
    expect(screen.queryByText('140', { exact: false }).innerHTML).toBe('$140.00');
  });

  test('product card should display default product price along with sales price if applicable', () => {
    // remove cards previously rendered
    cleanup();

    // render new component
    act(() => {
      render(
        <AppContext.Provider value={{
          defaultItem: product,
          setDefaultItem: () => {},
        }}
        >
          <RelatedContext.Provider value={{
            outfits: ['Add to Outfit'],
            setOutfits: () => {},
            related,
            setProductId: () => {},
          }}
          >
            <ProductCard
          // add one feature that is the same and another that is different
              product={{
                ...product,
                results: [{ ...product.results[0], sale_price: '100.00' }],
              }}
              identifier=""
              setLocation={() => {}}
            />
          </RelatedContext.Provider>
        </AppContext.Provider>,
      );
    });
    expect(screen.queryByText('140', { exact: false })).toBeInTheDocument();
    expect(screen.queryByText('100', { exact: false })).toBeInTheDocument();
  });

  test('product card should open modal on button click and close on modal click', () => {
    fireEvent.click(screen.queryByText('☆'));
    expect(screen.queryByText('COMPARISON').className).toBe('title');
    fireEvent.click(screen.queryByText('COMPARISON'));
    expect(screen.queryByText('COMPARISON')).toBeNull;
  });

  test('product card should not show repeated features', () => {
    // remove cards previously rendered
    cleanup();

    // render new component
    act(() => {
      render(
        <AppContext.Provider value={{
          defaultItem: product,
          setDefaultItem: () => {},
        }}
        >
          <RelatedContext.Provider value={{
            outfits: ['Add to Outfit'],
            setOutfits: () => {},
            related,
            setProductId: () => {},
          }}
          >
            <ProductCard
          // add one feature that is the same and another that is different
              product={{
                ...product,
                features: [
                  { feature: 'Buttons', value: 'Brass' },
                  { feature: 'Fabric', value: 'Leather' },
                ],
              }}
              identifier=""
              setLocation={() => {}}
            />
          </RelatedContext.Provider>
        </AppContext.Provider>,
      );
    });

    fireEvent.click(screen.queryByText('☆'));

    expect(screen.getAllByTestId('comparison-modal-line').length / 3).toBe(3);
  });
});
