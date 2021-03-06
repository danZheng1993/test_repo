import get from 'lodash.get';
import keys from 'lodash.keys';

export const selectCurrencies = (state) => {
  const balance = get(state, 'account.balance', {});
  const currencies = keys(balance);
  return currencies;
}

export const selectDefaultCurrency = state => state.account.defaultCurrency;

export const selectRates = state => state.exchangeRate.rates;

export const selectBalance = state => state.account.balance;