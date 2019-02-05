import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';

import { AccountActionTypes as actions } from '../actions/account';

const initialState = {
  balance: {
    USD: { balance: 0 },
    EUR: { balance: 0 },
    CAD: { balance: 0 },
  },
  defaultCurrency: 'USD',
}

export default handleActions({
  [actions.DepositAccount]: (state, action) =>
    produce(state, draft => {
      const { currency, amount } = action.payload;
      const balance = get(state, `balance.${currency}`, 0);
      set(draft, `balance.${currency}`, parseFloat(balance) + parseFloat(amount));
    }),
  [actions.WidthdrawAccount]: (state, action) =>
    produce(state, draft => {
      const { currency, amount } = action.payload;
      const balance = get(state, `balance.${currency}`, 0);
      set(draft, `balance.${currency}`, parseFloat(balance) - parseFloat(amount));
    }),
  [actions.RemoveAccount]: (state, action) =>
    produce(state, draft => {
      const { currency } = action.payload;
      const balance = {...state.balance };
      unset(balance, currency);
      draft.balance = balance;
    }),
  [actions.AddAccount]: (state, action) =>
    produce(state, draft => {
      const { currency } = action.payload;
      const initialAmount = get(action.payload, 'initialAmount', 0);
      set(draft, `balance.${currency}`, initialAmount);
    }),
  [actions.SetDefaultCurrency]: (state, action) =>
    produce(state, draft => {
      const { currency } = action.payload;
      set(draft, 'defaultCurrency', currency);
    }),
  [actions.SetExchangeResult]: (state, action) =>
    produce(state, draft => {
      const { balance } = action.payload;
      draft.balance=balance
    })
}, initialState)