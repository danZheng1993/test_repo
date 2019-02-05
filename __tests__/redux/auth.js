import {
  AuthActionTypes as types,
  Authenticate,
  Authorize
} from '../../js/store/actions/auth';

import authReducer from '../../js/store/reducer/auth';

import { authInitialState } from '../../testData';

describe('Auth Action Test', () => {
  it('Check Authenticate Action', () => {
    const expectedAction = {
      type: types.Authenticate,
      payload: { type: 'TouchID' }
    };
    expect(Authenticate({ type: 'TouchID' })).toEqual(expectedAction);
  });
  it('Check Authorize Action', () => {
    const expectedAction = {
      type: types.Authorize,
      payload: { type: 'TouchID' }
    };
    expect(Authorize({ type: 'TouchID' })).toEqual(expectedAction);
  });
})

describe('Auth Reducer Test', () => {
  it('Check Authenticate Success Action', () => {
    const expectedData = {
      authSuccess: true,
      error: '',
    };
    const action = { type: types.AuthenticationSuccess };
    expect(authReducer(authInitialState, action)).toEqual(expectedData);
  });
  it('Check Authenticate Failure Action', () => {
    const expectedData = {
      authSuccess: false,
      error: 'Test',
    };
    const action = { type: types.AuthenticationFailure, payload: { error: 'Test' } };
    expect(authReducer(authInitialState, action)).toEqual(expectedData);
  });
})