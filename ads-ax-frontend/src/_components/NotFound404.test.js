import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Screen from './NotFound404.js';

describe('The NotFound404 Component', () => {
  test('should match and pass the screenshot test', () => {
    const { container } = render(<Screen />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
