import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../views/Home';
import PasscodeScreen from '../views/Passcode';
import OverviewScreen from '../views/Overview';
import CurrencyDetailScreen from '../views/CurrencyDetail';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    PasscodeScreen: { screen: PasscodeScreen },
    OverviewScreen: { screen: OverviewScreen },
    CurrencyDetailScreen: { screen: CurrencyDetailScreen },
  }, {
    headerMode: 'none'
  }
);

export default AppNavigator;
