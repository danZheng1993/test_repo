import { all, fork } from 'redux-saga/effects';

import AuthSaga from './auth';
import ApplicationSaga from './application';
import AccountSaga from './account';
import ExchangeRateSaga from './exchangeRate';

export default function* mainSaga() {
  yield all([
    fork(ApplicationSaga),
    fork(AuthSaga),
    fork(AccountSaga),
    fork(ExchangeRateSaga)
  ]);
}
