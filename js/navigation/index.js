import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../views/Home';
import PasscodeScreen from '../views/Passcode';
import OverviewScreen from '../views/Overview';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    PasscodeScreen: { screen: PasscodeScreen },
    OverviewScreen: { screen: OverviewScreen },
  }, {
    headerMode: 'none'
  }
);

export default AppNavigator;
