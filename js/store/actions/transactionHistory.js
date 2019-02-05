import { createAction } from 'redux-actions';

export const TransactionHistoryActionTypes = {
  AddHistory: '[TRANSACTION HISTORY] - ADD HISTORY',
}

export const AddHistory = createAction(TransactionHistoryActionTypes.AddHistory);