import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Screen from './LoginScreenComponent';

afterEach(cleanup);

describe('The Login Screen Component', () => {
  describe('should handle changes', () => {
    test('on user input', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, debug } = render(<Screen onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const TEST_USERNAME = 'testuser';
      const TEST_PASSWORD = 'testpassword1';

      username_Input.value = TEST_USERNAME;
      fireEvent.change(username_Input);
      pw_Input.value = TEST_PASSWORD;
      fireEvent.change(pw_Input);

      expect(username_Input.value).toBe(TEST_USERNAME);
      expect(pw_Input.value).toBe(TEST_PASSWORD);
    });
  });

  describe('should display an error message', () => {
    test('when the username is empty', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByAltText, debug } = render(<Screen errMsg={""} onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const submitButton = getByTestId('submitBtn');

      pw_Input.value = 'testpassword1';
      fireEvent.change(pw_Input);

      fireEvent.click(submitButton);
      const errMsg = getByText('Please fill in all fields to continue');
      const loadingIcon = queryByAltText("Loading...");

      expect(errMsg).toBeInTheDocument();
      expect(loadingIcon).toBeNull();
      expect(callbackFn).not.toBeCalled();
    });

    test('when the password is empty', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByAltText, debug } = render(<Screen errMsg={""} onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const submitButton = getByTestId('submitBtn');

      username_Input.value = 'testuser';
      fireEvent.change(username_Input);

      fireEvent.click(submitButton);
      const errMsg = getByText('Please fill in all fields to continue');
      const loadingIcon = queryByAltText("Loading...");

      expect(errMsg).toBeInTheDocument();
      expect(loadingIcon).toBeNull();
      expect(callbackFn).not.toBeCalled();
    });

    test('when all fields are empty', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByAltText, debug } = render(<Screen errMsg={""} onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const submitButton = getByTestId('submitBtn');

      fireEvent.click(submitButton);
      const errMsg = getByText('Please fill in all fields to continue');
      const loadingIcon = queryByAltText("Loading...");

      expect(errMsg).toBeInTheDocument();
      expect(loadingIcon).toBeNull();
      expect(callbackFn).not.toBeCalled();
    });

    test('when the errMsg prop is provided', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByText, queryByAltText, queryByTestId, debug } = render(<Screen errMsg={"Incorrect Username and/or Password. Try again to continue"} onFormSubmission={callbackFn}/>);

      const errMsg = queryByTestId('errMsg');
      const loadingIcon = queryByAltText('Loading...');

      expect(loadingIcon).toBeNull();
      expect(errMsg).toBeInTheDocument();
      expect(callbackFn).not.toBeCalled();
    });

    test('each time an invalid login attempt is made', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByText, queryByTestId, queryByAltText, debug } = render(<Screen errMsg={"Incorrect Username and/or Password. Try again to continue"} onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const submitButton = getByTestId('submitBtn');

      username_Input.value = 'testuser';
      fireEvent.change(username_Input);
      pw_Input.value = 'testpassword1';
      fireEvent.change(pw_Input);

      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      const errMsg = queryByTestId('errMsg');
      expect(errMsg).not.toBeNull();
    });
  });

  describe('should successfully submit the form', () => {
    test('when all fields are valid', () => {
      const callbackFn = jest.fn();
      const { getByLabelText, getByText, getByTestId, queryByText, queryByAltText, queryByTestId, debug } = render(<Screen errMsg={""} onFormSubmission={callbackFn}/>);
      const username_Input = getByLabelText('Username');
      const pw_Input = getByLabelText('Password');
      const submitButton = getByTestId('submitBtn');

      username_Input.value = 'testuser';
      fireEvent.change(username_Input);
      pw_Input.value = 'testpassword1';
      fireEvent.change(pw_Input);

      fireEvent.click(submitButton);
      const errMsg = queryByTestId('errMsg');
      const loadingIcon = queryByAltText("Loading...");

      expect(errMsg).toBeNull();
      expect(loadingIcon).toBeInTheDocument();
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });
  });
});
