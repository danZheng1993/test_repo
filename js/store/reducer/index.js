import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import nav from './navigation';
import auth from './auth';
import account from './account';
import transactionHistory from './transactionHistory';
import exchangeRate from './exchangeRate';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav', 'auth'],
};

export default persistCombineReducers(persistConfig, {
  account,
  exchangeRate,
  transactionHistory,
  auth,
  nav,
});
