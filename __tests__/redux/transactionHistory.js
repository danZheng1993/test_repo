import {
  TransactionHistoryActionTypes as types,
  AddHistory,
} from '../../js/store/actions/transactionHistory';

import historyReducer from '../../js/store/reducer/transactionHistory';

import { transactionHistoryInitialState as initialState, historyItems } from '../../testData';

describe('TransactionHistory Action Test', () => {
  it('Check AddHistory Action', () => {
    const expectedAction = {
      type: types.AddHistory,
      payload: historyItems[0]
    };
    expect(AddHistory(historyItems[0])).toEqual(expectedAction);
  });
})

describe('ExchangeRate Reducer Test', () => {
  it('Set Rate Action', () => {
    const expectedData = {
      history: [historyItems[0]],
    };
    const action = AddHistory(historyItems[0]);
    expect(historyReducer(initialState, action)).toEqual(expectedData);
  });
})