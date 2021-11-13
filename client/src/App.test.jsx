/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App.jsx';

describe('app level test', () => {
  beforeEach(() => {
    // mock the consoleWidth property
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
      await component.findByText('Camo Onesie');
    });

    expect(component.container.querySelector('#overview')).toBeInTheDocument();
    expect(component.container.querySelector('#related')).toBeInTheDocument();
    expect(component.container.querySelector('#questions')).toBeInTheDocument();
    expect(component.container.querySelector('#ratings')).toBeInTheDocument();
  });
});
