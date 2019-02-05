import { put, takeEvery } from 'redux-saga/effects';
import get from 'lodash.get';

import { AccountActionTypes as actions } from '../actions/account';
import { TransactionHistoryActionTypes as thActions } from '../actions/transactionHistory';

export function* deposit(action) {
  const { currency, amount } = action.payload;
  yield put({
    type: thActions.AddHistory,
    payload: {
      type: 'deposit',
      currency,
      amount,
      timeStamp: new Date(),
    }
  })
}

export function* widthdraw(action) {
  const { currency, amount } = action.payload;
  yield put({
    type: thActions.AddHistory,
    payload: {
      type: 'withdraw',
      currency,
      amount,
      timeStamp: new Date(),
    }
  })
}

export function* addAccount(action) {
  const { currency } = action.payload;
  yield put({
    type: thActions.AddHistory,
    payload: {
      type: 'addAccount',
      currency,
      amount: get(action.payload, 'initialAmount', 0),
      timeStamp: new Date(),
    }
  })
}

export function* removeAccount(action) {
  const { currency } = action.payload;
  yield put({
    type: thActions.AddHistory,
    payload: {
      type: 'removeAccount',
      currency,
      timeStamp: new Date(),
    }
  })
}

export function* exchange(action) {
  const { baseCurrency, targetCurrency, amount } = action.payload;
  yield put({
    type: thActions.AddHistory,
    payload: {
      type: 'exchange',
      baseCurrency,
      targetCurrency,
      amount,
      timeStamp: new Date(),
    }
  })
}

export default function* ApplicationSaga() {
  yield takeEvery(actions.DepositAccount, deposit);
  yield takeEvery(actions.ExchangeBalance, exchange);
  yield takeEvery(actions.WithdrawAcccount, widthdraw);
  yield takeEvery(actions.AddAccount, addAccount);
  yield takeEvery(actions.RemoveAccount, removeAccount);
}
