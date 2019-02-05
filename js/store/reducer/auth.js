import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import { AuthActionTypes as actions } from '../actions/auth';

const initialState = {
  authSuccess: false,
  error: ''
}

export default handleActions({
  [actions.AuthenticationSuccess]: (state) =>
    produce(state, draft => {
      draft.authSuccess = true;
    }),
  [actions.AuthenticationFailure]: (state, action) =>
    produce(state, draft => {
      const { error } = action.payload
      draft.authSuccess = false;
      draft.error = error;
    }),
}, initialState)