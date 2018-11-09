import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Screen from './confirmDeletionForm.js';

afterEach(cleanup);

describe('The Confirm Deletion Form', () => {
  describe('should execute the callback function', () => {
    test('when the delete button is clicked', () => {
      const callbackFn = jest.fn();
      const { getByText, getByTestId, debug } = render(<Screen cancel={callbackFn} confirm={callbackFn} item={'test'}/>);

      const delete_button = getByText('Delete');
      const displayMessage = getByTestId('display-message');
      fireEvent.click(delete_button);

      expect(callbackFn).toBeCalled();
      expect(displayMessage).toBeInTheDocument();
    });

    test('when the cancel button is clicked', () => {
      const callbackFn = jest.fn();
      const { getByText, getByTestId, ebug } = render(<Screen cancel={callbackFn} confirm={callbackFn} item={'test'}/>);

      const cancel_button = getByText('Cancel');
      const displayMessage = getByTestId('display-message');
      fireEvent.click(cancel_button);

      expect(callbackFn).toBeCalled();
      expect(displayMessage).toBeInTheDocument();
    });
  });
});
