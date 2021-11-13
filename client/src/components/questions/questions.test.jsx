import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import AppContext from '../../hooks/context.js';
import Questions from './Questions.jsx';


describe('questions component unit tests', () => {
  test('clicking More Answered Questions should hide the button', async () => {
    let component;
    await act(async () => {
      let defaultItem = {id:"44388"};
      component = render(<AppContext.Provider value={{defaultItem}}>
        <Questions captureMetaData={() => {}}/>
      </AppContext.Provider>);
      await component.findByText('More Answered Questions');
      fireEvent.click(screen.getByText('More Answered Questions'));
    });
    expect(screen.queryByText('More Answered Questions')).toBeNull;

  });

  test('clicking Helpful should increase count by 1', async () => {
    let component;
    let firstBtn;
    let before;
    let after;
    await act(async () => {
      let defaultItem = {id:"44388"};
      component = render(<AppContext.Provider value={{defaultItem}}>
        <Questions captureMetaData={() => {}}/>
      </AppContext.Provider>);
      firstBtn = await component.findAllByTestId('helpful');
      before = firstBtn[0].innerHTML;
      let getNum = before.split('(');
      before = getNum[1].slice(0, -1);
      fireEvent.click(firstBtn[0]);
      fireEvent.click(firstBtn[0]);
      after = firstBtn[0].innerHTML;
      getNum = after.split('(');
      after = getNum[1].slice(0, -1);
    });
    expect(parseInt(after) - parseInt(before)).toBe(1);

  });

  test('clicking Ask a Question should open modal', async () => {
    let component;
    await act(async () => {
      let defaultItem = {id:"44388"};
      component = render(<AppContext.Provider value={{defaultItem}}>
        <Questions captureMetaData={() => {}}/>
      </AppContext.Provider>);
      await component.findByText('Ask a Question +');
      fireEvent.click(screen.getByText('Ask a Question +'));
    });
    expect(component.container.querySelector('.modalContainer')).toBeInTheDocument;
  });



})