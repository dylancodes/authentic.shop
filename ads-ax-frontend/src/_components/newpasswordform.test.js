import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Form from './NewPasswordForm';

afterEach(cleanup);

describe('The New Password Form', () => {
  describe('should handle changes', () => {
    test('on user input', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, debug } = render(<Form errMsg={null} updatePassword={callbackFn}/>);
      const pw1_Input = getByLabelText('New Password');
      const pw2_Input = getByLabelText('Confirm New Password');
      const TEST_PASSWORD = 'testpassword1';

      pw1_Input.value = TEST_PASSWORD;
      fireEvent.change(pw1_Input);
      pw2_Input.value = TEST_PASSWORD;
      fireEvent.change(pw2_Input);

      expect(pw1_Input.value).toBe(TEST_PASSWORD);
      expect(pw2_Input.value).toBe(TEST_PASSWORD);
    });
  });

  describe('should display an error message', () => {
    test('when passwords do not match', () => {
      const callbackFn = jest.fn();
      const { queryByAltText, getByTestId, getByText, getByLabelText, debug} = render(<Form errMsg={null} updatePassword={callbackFn}/>);
      const pw1_Input = getByLabelText('New Password');
      const pw2_Input = getByLabelText('Confirm New Password');
      const updateButton = getByTestId('updatebtn');

      pw1_Input.value = 'therightpassword';
      fireEvent.change(pw1_Input);
      pw2_Input.value = 'thewrongpassword';
      fireEvent.change(pw2_Input);

      fireEvent.click(updateButton);
      const errMsg = getByText('Passwords do not match - Please try again to continue.');
      const loadingIcon = queryByAltText('Loading...');

      expect(loadingIcon).toBeNull();
      expect(errMsg).toBeInTheDocument();
      expect(callbackFn).not.toBeCalled()
    });

    test('when the errMsg prop is provided', () => {
      const callbackFn = jest.fn();
      const { queryByAltText, getByTestId, getByText, getByLabelText, queryByTestId, debug} = render(<Form errMsg={"Invalid Password"} updatePassword={callbackFn}/>);
      const pw1_Input = getByLabelText('New Password');
      const pw2_Input = getByLabelText('Confirm New Password');
      const updateButton = getByTestId('updatebtn');

      const errMsg = queryByTestId('errMsg');
      const loadingIcon = queryByAltText('Loading...');

      expect(loadingIcon).toBeNull();
      expect(errMsg).toBeInTheDocument();
      expect(errMsg).toHaveTextContent('Invalid Password');
      expect(callbackFn).not.toBeCalled();
    });

    test('each time an invalid update attempt is made', () => {
      const callbackFn = jest.fn();
      const { queryByAltText, getByTestId, getByText, getByLabelText, queryByTestId, debug} = render(<Form errMsg={"Invalid Password"} updatePassword={callbackFn}/>);
      const pw1_Input = getByLabelText('New Password');
      const pw2_Input = getByLabelText('Confirm New Password');
      const updateButton = getByTestId('updatebtn');

      // this doesn't really matter because we pass in a valid string for the errMsg prop
      pw1_Input.value = 'testpassword1';
      fireEvent.change(pw1_Input);
      pw2_Input.value = 'testpassword1';
      fireEvent.change(pw2_Input);

      fireEvent.click(updateButton);
      fireEvent.click(updateButton);
      const errMsg = queryByTestId('errMsg');
      expect(errMsg).not.toBeNull();
    });
  });

  describe('should successfully submit the form', () => {
    test('when passwords match', () => {
      const callbackFn = jest.fn();
      const { getByAltText, getByTestId, getByLabelText, queryByTestId, queryByText, debug} = render(<Form errMsg={''} updatePassword={callbackFn}/>);
      const pw1_Input = getByLabelText('New Password');
      const pw2_Input = getByLabelText('Confirm New Password');
      const updateButton = getByTestId('updatebtn');

      pw1_Input.value = 'therightpassword';
      fireEvent.change(pw1_Input);
      pw2_Input.value = 'therightpassword';
      fireEvent.change(pw2_Input);

      fireEvent.click(updateButton);
      const errMsg = queryByTestId('errMsg');
      const loadingIcon = getByAltText('Loading...');

      expect(loadingIcon).not.toBeNull();
      expect(errMsg).toBeNull();
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });
  });
});
