import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

import Screen from './Header.js';

describe('The Header', () => {
  test('should match and pass the screenshot test', () => {
    const { container } = render(
      <Router>
        <Screen />
      </Router>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
