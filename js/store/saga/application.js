import { put, takeEvery } from 'redux-saga/effects';

import { ApplicationActionTypes } from '../actions/application';

export function* dispatchAction(action) {
  const { dispatchingAction } = action.payload;
  yield put(dispatchingAction);
}

export default function* ApplicationSaga() {
  yield takeEvery(ApplicationActionTypes.DispatchAction, dispatchAction);
}
