/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../../App.jsx';

// jest.mock('axios', () => {
//   const productMocks = require('../../mocks/productMocks');

//   return {
//     get: () => ({
//       then: (callback) => {
//         callback({ data: productMocks });
//         return { catch: () => {} };
//       },
//     }),
//   };
// });

describe('app level test', () => {
  beforeEach(() => {
    // mock the consoleWidth
    jest
      .spyOn(Document.prototype, 'getElementById')
      .mockImplementation(() => ({
        clientWidth: () => 500,
      }));
  });

  test('should render loading now screen and then should render individual widgets', async () => {
    let component;

    await act(async () => {
      component = render(<App />);
      expect(component.getByText('Loading now...')).toBeInTheDocument();
      // Camo Onesie is the title of the first product in the list
      await component.findByText('What I expected');
    });

    expect(component.container.querySelector('#overview')).toBeInTheDocument();
    expect(component.container.querySelector('#related')).toBeInTheDocument();
    expect(component.container.querySelector('#questions')).toBeInTheDocument();
    expect(component.container.querySelector('#ratings')).toBeInTheDocument();
  });
});

// describe('product card', () => {
//   beforeEach(() => {
//     render(
//       <AppContext.Provider value={{
//         defaultItem: product,
//         setDefaultItem: () => {},
//       }}
//       >
//         <RelatedContext.Provider value={{
//           outfits: ['Add to Outfit'],
//           setOutfits: () => {},
//           related,
//           setProductId: () => {},
//         }}
//         >
//           <ProductCard product={product} identifier="" setLocation={() => {}} />
//         </RelatedContext.Provider>
//       </AppContext.Provider>,
//     );
//   });

//   test('product card should display product title', () => {
//     expect(screen.queryByText('Morning Joggers').innerHTML).toMatch(product.name);
//   });
//   test();
// });

// test('product card should display default product price', () => {
//   render(
//     <AppContext.Provider value={{
//       defaultItem: product,
//       setDefaultItem: () => {},
//     }}
//     >
//       <RelatedContext.Provider value={{
//         outfits: ['Add to Outfit'],
//         setOutfits: () => {},
//         related,
//         setProductId: () => {},
//       }}
//       >
//         <ProductCard product={product} identifier="" setLocation={() => {}} />
//       </RelatedContext.Provider>
//     </AppContext.Provider>,
//   );

//   expect(screen.queryByText('60', { exact: false }).innerHTML).toBe('$60.00');
// });

// test('product card should open modal on button click and close on modal click', () => {
//   render(
//     <AppContext.Provider value={{
//       defaultItem: product,
//       setDefaultItem: () => {},
//     }}
//     >
//       <RelatedContext.Provider value={{
//         outfits: ['Add to Outfit'],
//         setOutfits: () => {},
//         related,
//         setProductId: () => {},
//       }}
//       >
//         <ProductCard product={product} identifier="" setLocation={() => {}} />
//       </RelatedContext.Provider>
//     </AppContext.Provider>,
//   );

//   fireEvent.click(screen.queryByText('★'));
//   expect(screen.queryByText('COMPARISON').className).toBe('title');
//   fireEvent.click(screen.queryByText('COMPARISON'));
//   expect(screen.queryByText('COMPARISON')).toBeNull;
// });

// test('product card should not show repeated features', () => {
//   render(
//     <AppContext.Provider value={{
//       defaultItem: product,
//       setDefaultItem: () => {},
//     }}
//     >
//       <RelatedContext.Provider value={{
//         outfits: ['Add to Outfit'],
//         setOutfits: () => {},
//         related,
//         setProductId: () => {},
//       }}
//       >
//         <ProductCard
//         // add one feature that is the same and another that is different
//           product={{
//             ...product,
//             features: [
//               { feature: 'Cut', value: 'Skinny' },
//               { feature: 'Fabric', value: 'Leather' },
//             ],
//           }}
//           identifier=""
//           setLocation={() => {}}
//         />
//       </RelatedContext.Provider>
//     </AppContext.Provider>,
//   );

//   fireEvent.click(screen.queryByText('★'));

//   expect(screen.getAllByTestId('comparison-modal-line').length / 3).toBe(3);
// });
