import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import takeRight from 'lodash.takeright';

import { TransactionHistoryActionTypes as actions } from '../actions/transactionHistory';

const initialState = {
  history: [],
}

export default handleActions({
  [actions.AddHistory]: (state) =>
    produce(state, draft => {
      const { transaction } = action.payload;
      const history = [...state.history];
      history.push(transaction);
      draft.history = takeRight(history, 100);
    }),
}, initialState)