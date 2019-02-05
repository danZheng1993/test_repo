import { createAction } from 'redux-actions';

export const AccountActionTypes = {
  DepositAccount: '[ACCOUNT] - DEPOSIT',
  WidthdrawAccount: '[ACCOUNT] - WIDTHDRAW',
  RemoveAccount: '[ACCOUNT] - REMOVE',
  AddAccount: '[ACCOUNT] - ADD',
  ExchangeBalance: '[ACCOUNT] - EXCHANGE',
  SetDefaultCurrency: '[ACCOUNT] - SET DEFAULT CURRENCY',
  SetExchangeResult: '[ACCOUNT] - SET EXCHANGE RESULT',
}

export const DepositAccount = createAction(AccountActionTypes.DepositAccount)
export const WidthdrawAccount = createAction(AccountActionTypes.WidthdrawAccount)
export const RemoveAccount = createAction(AccountActionTypes.RemoveAccount)
export const AddAccount = createAction(AccountActionTypes.AddAccount)
export const ExchangeBalance = createAction(AccountActionTypes.ExchangeBalance)
export const SetDefaultCurrency = createAction(AccountActionTypes.SetDefaultCurrency)