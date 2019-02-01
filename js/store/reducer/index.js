import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import nav from './navigation';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav'],
};

export default persistCombineReducers(persistConfig, {
  nav,
});
