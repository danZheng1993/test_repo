import {
  ExchangeRateActionTypes as types,
  FetchRate,
} from '../../js/store/actions/exchangeRate';

import erReducer from '../../js/store/reducer/exchangeRate';

import { exchangeRateInitialState, rates } from '../../testData';

describe('ExchangeRate Action Test', () => {
  it('Check ExchangeRate Action', () => {
    const expectedAction = {
      type: types.FetchRate,
    };
    expect(FetchRate()).toEqual(expectedAction);
  });
})

describe('ExchangeRate Reducer Test', () => {
  it('Set Rate Action', () => {
    const expectedData = {
      rates,
    };
    const action = { type: types.SetRate, payload: { rates } };
    expect(erReducer(exchangeRateInitialState, action)).toEqual(expectedData);
  });
})