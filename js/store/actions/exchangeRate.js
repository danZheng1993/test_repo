import { createAction } from 'redux-actions';

export const ExchangeRateActionTypes = {
  FetchRate: '[EXCHANGERATE] - FETCH',
  SetRate: '[EXCHANGERATE] - SET'
}

export const FetchRate = createAction(ExchangeRateActionTypes.FetchRate);