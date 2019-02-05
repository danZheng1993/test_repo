import { apiUrl } from '../config';

export const fetchRate = (currencies, baseCurrency) => {
  const symbols = currencies.join(',');
  const url = `${apiUrl}&symbols=${symbols}&format=1`;
  return fetch(url, { method: 'GET' }).then(response => response.json())
}