import get from 'lodash.get';

import { convertAllBalance, getBalanceTotal } from '../../utils/currency';

export const getDefaultCurrency = state => get(state, 'account.defaultCurrency', 'USD');

export const getTotal = (state) => {
  const rates = get(state, 'exchangeRate.rates', {});
  const balance = get(state, 'account.balance', {});
  const defaultCurrency = getDefaultCurrency(state);
  const totalBalance = getBalanceTotal(balance, defaultCurrency, rates);
  return totalBalance;
}

export const getConvertedBalance = (state) => {
  const rates = get(state, 'exchangeRate.rates', {});
  const balance = get(state, 'account.balance', {});
  const defaultCurrency = getDefaultCurrency(state);
  return convertAllBalance(balance, defaultCurrency, rates);
}
