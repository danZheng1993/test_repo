import {
  AccountActionTypes as types,
  DepositAccount,
  WithdrawAccount,
  RemoveAccount,
  AddAccount,
  ExchangeBalance,
  SetDefaultCurrency
} from '../../js/store/actions/account';

import accountReducer from '../../js/store/reducer/account';

import { accountInitialState } from '../../testData';

describe('Account Action Test', () => {
  it('Check DepositAction', () => {
    const expectedAction = {
      type: types.DepositAccount,
      payload: { currency: 'USD', initialAmount: 10 }
    };
    expect(DepositAccount({ currency: 'USD', initialAmount: 10 })).toEqual(expectedAction);
  });
  it('Check WithdrawAction', () => {
    const expectedAction = {
      type: types.WithdrawAccount,
      payload: { currency: 'USD', amount: 10 }
    };
    expect(WithdrawAccount({ currency: 'USD', amount: 10 })).toEqual(expectedAction);
  });
  it('Check RemoveAccount', () => {
    const expectedAction = {
      type: types.RemoveAccount,
      payload: { currency: 'USD' }
    };
    expect(RemoveAccount({ currency: 'USD' })).toEqual(expectedAction);
  })
  it('Check AddAccount', () => {
    const expectedAction = {
      type: types.AddAccount,
      payload: { currency: 'USD', amount: 10 }
    };
    expect(AddAccount({ currency: 'USD', amount: 10 })).toEqual(expectedAction);
  });
  it('Check ExchangeBalance', () => {
    const expectedAction = {
      type: types.ExchangeBalance,
      payload: { baseCurrency: 'USD', targetCurrency: 'EUR', amount: 100 }
    };
    expect(ExchangeBalance({ baseCurrency: 'USD', targetCurrency: 'EUR', amount: 100 })).toEqual(expectedAction);
  });
  it('Check SetDefaultCurrency', () => {
    const expectedAction = {
      type: types.SetDefaultCurrency,
      payload: { currency: 'EUR' }
    };
    expect(SetDefaultCurrency({ currency: 'EUR' })).toEqual(expectedAction);
  });
})

describe('Account Reducer Test', () => {
  it('Check DepositAction', () => {
    const expectedData = {
      balance: {
        USD: { balance: 20 },
        EUR: { balance: 0 },
        CAD: { balance: 0 },
      },
      defaultCurrency: 'USD',
    };
    const action = DepositAccount({ currency: 'USD', amount: 10 });
    expect(accountReducer(accountInitialState, action)).toEqual(expectedData);
  });
  it('Check WithdrawAction', () => {
    const expectedData = {
      balance: {
        USD: { balance: 0 },
        EUR: { balance: 0 },
        CAD: { balance: 0 },
      },
      defaultCurrency: 'USD',
    };
    const action = WithdrawAccount({ currency: 'USD', amount: 10 });
    expect(accountReducer(accountInitialState, action)).toEqual(expectedData);
  });
  it('Check RemoveAccount', () => {
    const expectedData = {
      balance: {
        USD: { balance: 10 },
        CAD: { balance: 0 },
      },
      defaultCurrency: 'USD',
    };
    const action = RemoveAccount({ currency: 'EUR' });
    expect(accountReducer(accountInitialState, action)).toEqual(expectedData);
  })
  it('Check AddAccount', () => {
    const expectedData = {
      balance: {
        USD: { balance: 10 },
        EUR: { balance: 0 },
        CAD: { balance: 0 },
        GBP: { balance: 10 }
      },
      defaultCurrency: 'USD',
    };
    const action = AddAccount({ currency: 'GBP', initialAmount: 10 });
    expect(accountReducer(accountInitialState, action)).toEqual(expectedData);
  });
  it('Check SetDefaultCurrency', () => {
    const expectedData = {
      balance: {
        USD: { balance: 10 },
        EUR: { balance: 0 },
        CAD: { balance: 0 },
      },
      defaultCurrency: 'EUR',
    };
    const action = SetDefaultCurrency({ currency: 'EUR' });
    expect(accountReducer(accountInitialState, action)).toEqual(expectedData);
  });
})