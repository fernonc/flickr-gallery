import React from 'react';
import PhotoSearch from '../components/PhotoSearch';

import {
  render,
  fireEvent
} from '@testing-library/react'
import '@testing-library/jest-dom';

describe('Photo loader notification', () => {
  it('starts loader', async () => {
    const {getByTestId, getByPlaceholderText} = render(<PhotoSearch />);
    const input = getByPlaceholderText('Search...');
    input.value= 'input text';
    fireEvent.change(input);
    fireEvent.click(getByTestId('searchButton'));
    expect(getByTestId('loaderAnimation').textContent).toBe('Loading...');
  })
});