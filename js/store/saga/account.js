import { put, takeEvery, select } from 'redux-saga/effects';
import get from 'lodash.get';
import set from 'lodash.set';

import { AccountActionTypes as actions } from '../actions/account';
import { TransactionHistoryActionTypes as thActions } from '../actions/transactionHistory';
import { ExchangeRateActionTypes as erActions } from '../actions/exchangeRate';
import { convertCurrency } from '../../utils/currency';
import { selectRates, selectBalance } from './selectors';

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
  yield put({
    type: erActions.FetchRate,
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
  const rates = yield select(selectRates);
  const balance = yield select(selectBalance);
  const changingAmount = convertCurrency(baseCurrency, targetCurrency, amount, rates);
  const baseAmount = get(balance, `${baseCurrency}.balance`, 0);
  const targetAmount = get(balance, `${targetCurrency}.balance`, 0);
  set(balance, `${baseCurrency}.balance`, baseAmount - amount);
  set(balance, `${targetCurrency}.balance`, targetAmount + changingAmount);
  yield put({
    type: actions.SetExchangeResult,
    payload: { balance }
  })
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
  yield takeEvery(actions.WithdrawAccount, widthdraw);
  yield takeEvery(actions.AddAccount, addAccount);
  yield takeEvery(actions.RemoveAccount, removeAccount);
}
