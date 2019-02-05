import {
  convertCurrency,
  getRate,
  getBalanceTotal,
  convertAllBalance
} from '../../js/utils/currency';

import { balance, rates } from '../../testData';

describe('Currency Utility Functions Test', () => {
  it('convertCurrency function', () => {
    const expected = 8.764848749387555;
    expect(convertCurrency('USD', 'EUR', 10, rates)).toEqual(expected);
  });
  it('getRate function', () => {
    const expected = 1.140921;
    expect(getRate('EUR', 'USD', rates)).toEqual(expected);
  });
  it('getBalanceTotal function', () => {
    const expected = 29.02248617753708;
    expect(getBalanceTotal(balance, 'USD', rates)).toEqual(expected);
  });
  it('convertAllBalance function', () => {
    const expected = {
      CAD: {
        balance: 10,
        conversionRate: 0.7613276177537078,
        convertedValue: 7.613276177537078,
      },
      EUR: {
        balance: 10,
        conversionRate: 1.140921,
        convertedValue: 11.409210000000002,
      },
      USD: {
        balance: 10,
        conversionRate: 1,
        convertedValue: 10,
      }
    };
    console.log(convertAllBalance(balance, 'USD', rates));
    expect(convertAllBalance(balance, 'USD', rates)).toEqual(expected);
  });
})
