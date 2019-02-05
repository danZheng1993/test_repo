export const balance = {
  USD: { balance: 10 },
  EUR: { balance: 10 },
  CAD: { balance: 10 }
};

export const parsedBalance = {
  CAD: {
    balance: 0,
    conversionRate: 0.7613276177537078,
    convertedValue: 0,
  },
  EUR: {
    balance: 0,
    conversionRate: 1.140921,
    convertedValue: 0,
  },
  USD: {
    balance: 0,
    conversionRate: 1,
    convertedValue: 0,
  }
};

export const rates = {
  USD: 1.140921,
  EUR: 1,
  CAD: 1.498594,
};

export const historyItems = [
  { type: 'withdraw', currency: 'USD', amount: 100, timeStamp: new Date() },
  { type: 'deposit', currency: 'USD', amount: 100, timeStamp: new Date() },
  { type: 'addAccount', currency: 'USD', amount: 100, timeStamp: new Date() },
  { type: 'removeAccount', currency: 'USD', timeStamp: new Date() },
  { type: 'exchange', baseCurrency: 'USD', targetCurrency: 'EUR', amount: 100, timeStamp: new Date() },
];

export const accountInitialState = {
  balance: {
    USD: { balance: 10 },
    EUR: { balance: 0 },
    CAD: { balance: 0 },
  },
  defaultCurrency: 'USD',
};

export const authInitialState = {
  authSuccess: false,
  error: ''
};

export const exchangeRateInitialState = {
  rates: {},
};

export const transactionHistoryInitialState = {
  history: [],
}