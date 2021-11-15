import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../../App.jsx';
import AppContext from '../../hooks/context.js';
import Questions from './Questions.jsx';

describe('questions component unit tests', () => {
  test('clicking More Answered Questions should hide the button', async () => {
    let component;
    await act(async () => {
      const defaultItem = { id: '44388' };
      component = render(<AppContext.Provider value={{ defaultItem }}>
        <Questions captureMetaData={() => {}} />
      </AppContext.Provider>);
      await component.findByText('More Answered Questions');
      fireEvent.click(screen.getByText('More Answered Questions'));
    });
    expect(screen.queryByText('More Answered Questions')).toBeNull;
  });

  test('clicking Helpful should increase count by 1', async () => {
    let component;
    await act(async () => {
      const defaultItem = { id: '44388' };
      component = render(<AppContext.Provider value={{ defaultItem }}>
        <Questions captureMetaData={() => {}} />
      </AppContext.Provider>);
      await component.findByText('Yes(501)');
      fireEvent.click(screen.getByText('Yes(501)'));
    });
    expect(screen.queryByText('Yes(502)')).toBeInTheDocument;
  });

  test('clicking Ask a Question should open modal', async () => {
    let component;
    await act(async () => {
      const defaultItem = { id: '44388' };
      component = render(<AppContext.Provider value={{ defaultItem }}>
        <Questions captureMetaData={() => {}} />
      </AppContext.Provider>);
      await component.findByText('Ask a Question +');
      fireEvent.click(screen.getByText('Ask a Question +'));
    });
    expect(component.container.querySelector('.modalContainer')).toBeInTheDocument;
  });
});
