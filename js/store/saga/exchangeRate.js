import { call, put, takeEvery, select } from 'redux-saga/effects';
import get from 'lodash.get';

import { ExchangeRateActionTypes as actions } from '../actions/exchangeRate';
import { fetchRate } from '../../api/exchangeRate';
import { selectCurrencies, selectDefaultCurrency } from './selectors';

export function* fetchRates(action) {
  const headers = {
    method: 'GET',
  }
  try {
    const currencies = yield select(selectCurrencies);
    const defaultCurrency = yield select(selectDefaultCurrency);
    const result = yield call(fetchRate, currencies, defaultCurrency);
    yield put({
      type: actions.SetRate,
      payload: {
        rates: get(result, 'rates')
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export default function* AuthSaga() {
  yield takeEvery(actions.FetchRate, fetchRates);
}
