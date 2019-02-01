import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import reducer from './reducer';
import mainSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware( "root", state => state.nav)

const store = createStore(reducer, applyMiddleware(sagaMiddleware, navMiddleware));

sagaMiddleware.run(mainSaga);

export default store;
export const persistor = persistStore(store);
