import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Screen from './Button.js';

afterEach(cleanup);

describe('', () => {
  describe('', () => {
    test('', () => {
      const callbackFn = jest.fn();
      const { getByTestId, debug } = render(<Screen text={'test'} onClick={callbackFn} />);

      const button_element = getByTestId('btn-element');
      fireEvent.click(button_element);

      expect(button_element).toBeInTheDocument();
      expect(callbackFn).toBeCalled();
    });
  });
});
