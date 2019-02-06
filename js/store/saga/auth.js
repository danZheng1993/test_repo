import { call, put, takeEvery } from 'redux-saga/effects';
import TouchID from 'react-native-touch-id';
import { Alert } from 'react-native';

import { AuthActionTypes } from '../actions/auth';

export function* authenticate(action) {
  const { type, data, success, failure } = action.payload;
  if (type === 'TouchID') {
    try {
      const isSupported = yield call(TouchID.isSupported);
      console.log(isSupported);
      if (isSupported === 'FaceID' || isSupported === 'TouchID') {
        const result = yield call(TouchID.authenticate);
        if (result) {
          yield put({ type: AuthActionTypes.AuthenticationSuccess })
          if (success) {
            yield call(success)
          }
        } else {
          yield put({
            type: AuthActionTypes.AuthenticationFailure,
            payload: { error: 'TouchID Authentication Failed' }
          })
          if (failure) {
            yield call(failure)
          }   
        }
      } else {
        yield put({
          type: AuthActionTypes.AuthenticationFailure,
          payload: { error: 'TouchID is not Supported' }
        })
        if (failure) {
          yield call(failure)
        }
      }
    } catch (error) {
      yield put({
        type: AuthActionTypes.AuthenticationFailure,
        payload: { error: 'TouchID Authentication Failed' }
      })
      if (failure) {
        yield call(failure)
      }
    }
  } else {
    const { passcode } = data;
    if (passcode === '1111') {
      yield put({ type: AuthActionTypes.AuthenticationSuccess })
      if (success) {
        yield call(success)
      }
    } else {
      yield put({
        type: AuthActionTypes.AuthenticationFailure,
        payload: { error: 'Passcode Authentication Failed' }
      })
      if (failure) {
        yield call(failure)
      }
    }
  }
}

export function* authorize(action) {
  const { type, data, success, failure } = action.payload;
  if (type === 'TouchID') {
    try {
      const isSupported = yield call(TouchID.isSupported);
      if (isSupported === 'FaceID' || isSupported === 'TouchID') {
        const result = yield call(TouchID.authenticate);
        if (result) {
          if (success) {
            yield call(success)
          }
        }
      }
    } catch (error) {
      if (failure) {
        yield call(failure)
      }
    }
  } else {
    const { passcode } = data;
    if (passcode === '1111') {
      if (success) {
        yield call(success)
      }
    } else {
      if (failure) {
        yield call(failure)
      }
    }
  }
}

export default function* AuthSaga() {
  yield takeEvery(AuthActionTypes.Authenticate, authenticate);
  yield takeEvery(AuthActionTypes.Authorize, authorize);
}
