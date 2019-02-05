import get from 'lodash.get';
import keys from 'lodash.keys';
import set from 'lodash.set';

export const convertCurrency = (baseCurrency, targetCurrency, amount, rates) => {
  if (baseCurrency !== targetCurrency) {
    const baseRate = get(rates, baseCurrency, 1);
    const targetRate = get(rates, targetCurrency, 1);
    const targetAmount = amount / baseRate * targetRate;
    return targetAmount;
  }
  return amount;
}

export const getRate = (baseCurrency, targetCurrency, rates) => {
  if (baseCurrency !== targetCurrency) {
    const baseRate = get(rates, baseCurrency, 1);
    const targetRate = get(rates, targetCurrency, 1);
    const conversionRate = targetRate / baseRate;
    return conversionRate;
  }
  return 1;
}

export const getBalanceTotal = (balance, defaultCurrency, rates) => {
  const currencies = keys(balance);
  const balanceTotal = currencies.reduce((prev, currency) => {
    const balance = get(balance, `${currency}.balance`, 0);
    const targetBalance = convertCurrency(currency, defaultCurrency, balance, rates);
    return prev + targetBalance;
  }, 0);
  return balanceTotal
}

export const convertAllBalance = (balance, defaultCurrency, rates) => {
  const currencies = keys(balance);
  const convertedBalance = {};
  currencies.forEach((currency) => {
    const balance = get(balance, `${currency}.balance`, 0);
    const targetBalance = convertCurrency(currency, defaultCurrency, balance, rates);
    const conversionRate = getRate(currency, defaultCurrency, rates);
    set(convertedBalance, `${currency}`, { balance, convertedValue: targetBalance, conversionRate });
  })
  return convertedBalance;
}
