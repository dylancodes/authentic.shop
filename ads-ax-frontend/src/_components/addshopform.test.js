import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Screen from './AddShopForm.js';

afterEach(cleanup);

describe('The Add Shop Form', () => {
  describe('should handle changes', () => {
    test('on user input', () => {
      const callbackFn = jest.fn();
      const { getByPlaceholderText, debug } = render(<Screen showForm={callbackFn} addShop={callbackFn}/>);

      const shopAccount_Input = getByPlaceholderText('Shop Account');
      const displayName_Input = getByPlaceholderText('Display Name');
      const description_Input = getByPlaceholderText('Description');
      const hq_Input = getByPlaceholderText('HQ');
      const contactName_Input = getByPlaceholderText('Contact Name');
      const contactEmail_Input = getByPlaceholderText('Contact Email');
      const contactTitle_Input = getByPlaceholderText('Contact Title');
      const contactPhone_Input = getByPlaceholderText('Contact Phone');

      const TEST_SHOPACCOUNT = 'Heaven Inc';
      const TEST_DISPLAYNAME = 'Godly Goods';
      const TEST_DESCRIPTION = 'All things you need';
      const TEST_HQ = 'Earth';
      const TEST_CONTACTNAME = 'God';
      const TEST_CONTACTEMAIL = 'god@heaveninc.com';
      const TEST_CONTACTTITLE = 'Earth Founder'
      const TEST_CONTACTPHONE = '7777777777';

      shopAccount_Input.value = TEST_SHOPACCOUNT;
      fireEvent.change(shopAccount_Input);
      displayName_Input.value = TEST_DISPLAYNAME;
      fireEvent.change(displayName_Input);
      description_Input.value = TEST_DESCRIPTION;
      fireEvent.change(description_Input);
      hq_Input.value = TEST_HQ;
      fireEvent.change(hq_Input);
      contactName_Input.value = TEST_CONTACTNAME;
      fireEvent.change(contactName_Input);
      contactEmail_Input.value = TEST_CONTACTEMAIL;
      fireEvent.change(contactEmail_Input);
      contactTitle_Input.value = TEST_CONTACTTITLE;
      fireEvent.change(contactTitle_Input);
      contactPhone_Input.value = TEST_CONTACTPHONE;
      fireEvent.change(contactPhone_Input);

      expect(shopAccount_Input.value).toBe(TEST_SHOPACCOUNT);
      expect(displayName_Input.value).toBe(TEST_DISPLAYNAME);
      expect(description_Input.value).toBe(TEST_DESCRIPTION);
      expect(hq_Input.value).toBe(TEST_HQ);
      expect(contactName_Input.value).toBe(TEST_CONTACTNAME);
      expect(contactEmail_Input.value).toBe(TEST_CONTACTEMAIL);
      expect(contactTitle_Input.value).toBe(TEST_CONTACTTITLE);
      expect(contactPhone_Input.value).toBe(TEST_CONTACTPHONE);

      expect(callbackFn).not.toBeCalled();
    });
  });

  describe('should display an error message', () => {
    test('when submission fails', () => {
      const callbackFn = jest.fn();
      callbackFn.mockImplementation(() => {
        throw new Error({type: 'test'});
      });
      const { queryByTestId, getByTestId, getByPlaceholderText, debug } = render(<Screen showForm={callbackFn} addShop={callbackFn}/>);

      const shopAccount_Input = getByPlaceholderText('Shop Account');
      const displayName_Input = getByPlaceholderText('Display Name');
      const description_Input = getByPlaceholderText('Description');
      const hq_Input = getByPlaceholderText('HQ');
      const contactName_Input = getByPlaceholderText('Contact Name');
      const contactEmail_Input = getByPlaceholderText('Contact Email');
      const contactTitle_Input = getByPlaceholderText('Contact Title');

      const TEST_SHOPACCOUNT = 'Heaven Inc';
      const TEST_DISPLAYNAME = 'Godly Goods';
      const TEST_DESCRIPTION = 'All things you need';
      const TEST_HQ = 'Earth';
      const TEST_CONTACTNAME = 'God';
      const TEST_CONTACTEMAIL = 'god@heaveninc.com';
      const TEST_CONTACTTITLE = 'Earth Founder'

      shopAccount_Input.value = TEST_SHOPACCOUNT;
      fireEvent.change(shopAccount_Input);
      displayName_Input.value = TEST_DISPLAYNAME;
      fireEvent.change(displayName_Input);
      description_Input.value = TEST_DESCRIPTION;
      fireEvent.change(description_Input);
      hq_Input.value = TEST_HQ;
      fireEvent.change(hq_Input);
      contactName_Input.value = TEST_CONTACTNAME;
      fireEvent.change(contactName_Input);
      contactEmail_Input.value = TEST_CONTACTEMAIL;
      fireEvent.change(contactEmail_Input);
      contactTitle_Input.value = TEST_CONTACTTITLE;
      fireEvent.change(contactTitle_Input);

      const createShopButton = getByTestId('addbtn');
      fireEvent.click(createShopButton);
      const errorMessage = queryByTestId('error-message');
      expect(errorMessage).toBeInTheDocument();
    });
  });

    describe('should successfully submit the form', () => {
      test('when all fields are valid', () => {
        const callbackFn = jest.fn();
        const { getByTestId, getByPlaceholderText, debug } = render(<Screen showForm={callbackFn} addShop={callbackFn}/>);

        const shopAccount_Input = getByPlaceholderText('Shop Account');
        const displayName_Input = getByPlaceholderText('Display Name');
        const description_Input = getByPlaceholderText('Description');
        const hq_Input = getByPlaceholderText('HQ');
        const contactName_Input = getByPlaceholderText('Contact Name');
        const contactEmail_Input = getByPlaceholderText('Contact Email');
        const contactTitle_Input = getByPlaceholderText('Contact Title');
        const contactPhone_Input = getByPlaceholderText('Contact Phone');

        const TEST_SHOPACCOUNT = 'Heaven Inc';
        const TEST_DISPLAYNAME = 'Godly Goods';
        const TEST_DESCRIPTION = 'All things you need';
        const TEST_HQ = 'Earth';
        const TEST_CONTACTNAME = 'God';
        const TEST_CONTACTEMAIL = 'god@heaveninc.com';
        const TEST_CONTACTTITLE = 'Earth Founder'
        const TEST_CONTACTPHONE = '7777777777';

        shopAccount_Input.value = TEST_SHOPACCOUNT;
        fireEvent.change(shopAccount_Input);
        displayName_Input.value = TEST_DISPLAYNAME;
        fireEvent.change(displayName_Input);
        description_Input.value = TEST_DESCRIPTION;
        fireEvent.change(description_Input);
        hq_Input.value = TEST_HQ;
        fireEvent.change(hq_Input);
        contactName_Input.value = TEST_CONTACTNAME;
        fireEvent.change(contactName_Input);
        contactEmail_Input.value = TEST_CONTACTEMAIL;
        fireEvent.change(contactEmail_Input);
        contactTitle_Input.value = TEST_CONTACTTITLE;
        fireEvent.change(contactTitle_Input);
        contactPhone_Input.value = TEST_CONTACTPHONE;
        fireEvent.change(contactPhone_Input);

        const createShopButton = getByTestId('addbtn');
        fireEvent.click(createShopButton);
        expect(callbackFn).toHaveBeenCalledTimes(2);
      });
    });
});
