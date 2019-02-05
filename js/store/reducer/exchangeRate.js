import { handleActions } from 'redux-actions';
import { produce } from 'immer';

import { ExchangeRateActionTypes as actions } from '../actions/exchangeRate';

const initialState = {
  rates: [],
}

export default handleActions({
  [actions.SetRate]: (state, action) =>
    produce(state, draft => {
      const { rates } = action.payload
      draft.rates = rates;
    }),
}, initialState)