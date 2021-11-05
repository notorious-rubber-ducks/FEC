/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard.jsx';
import AppContext from '../../hooks/context';
import RelatedContext from '../../hooks/relatedContext.js';
// import RelatedModal from './RelatedModal.jsx';

const product = {
  id: 44390,
  name: 'Morning Joggers',
  category: 'Pants',
  default_price: '40.00',
  features: [
    { feature: 'Fabric', value: '100% Cotton' },
    { feature: 'Cut', value: 'Skinny' },
  ],
  results: [
    {
      style_id: 266912,
      name: 'Black',
      original_price: '40.00',
      sale_price: null,
      'default?': false,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        }],
    },
    {
      style_id: 266913,
      name: 'Grey',
      original_price: '60.00',
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        }],
    },
  ],
};

const related = [44388];

beforeAll(() => {
  [...document.getElementsByClassName('product-card')].forEach((item) => {
    item.remove();
  });
});

test('product card should display product title', () => {
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

  expect(screen.queryByText('Morning Joggers').innerHTML).toMatch(product.name);
});

test('product card should display default product price', () => {
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

  expect(screen.queryByText('60', { exact: false }).innerHTML).toBe('$60.00');
});

test('product card should open modal on button click and close on modal click', () => {
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

  fireEvent.click(screen.queryByText('★'));
  expect(screen.queryByText('COMPARISON').className).toBe('title');
  fireEvent.click(screen.queryByText('COMPARISON'));
  expect(screen.queryByText('COMPARISON')).toBeNull;
});

test('product card should not show repeated features', () => {
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
              { feature: 'Cut', value: 'Skinny' },
              { feature: 'Fabric', value: 'Leather' },
            ],
          }}
          identifier=""
          setLocation={() => {}}
        />
      </RelatedContext.Provider>
    </AppContext.Provider>,
  );

  fireEvent.click(screen.queryByText('★'));

  expect(screen.getAllByTestId('comparison-modal-line').length / 3).toBe(3);
});
