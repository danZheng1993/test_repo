/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';

import './ReactotronConfig';
import store, { persistor } from './js/store';
import AppNavigator from './js/navigation';

const ReduxifiedNavigator = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
})

const AppWithNavigationState = connect(mapStateToProps)(ReduxifiedNavigator);

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}
