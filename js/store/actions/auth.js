import { createAction } from 'redux-actions';

export const AuthActionTypes = {
  Authenticate: '[AUTH] - AUTHENTICATION',
  AuthenticationSuccess: '[AUTH] - SUCCESS',
  AuthenticationFailure: '[AUTH] - FAILURE',
  Authorize: '[AUTH] - AUTHORIZATION',
}

export const Authenticate = createAction(AuthActionTypes.Authenticate);
export const Authorize = createAction(AuthActionTypes.Authorize);