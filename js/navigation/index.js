import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../views/Home';
import OverviewScreen from '../views/Overview';
import CurrencyDetailScreen from '../views/CurrencyDetail';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    OverviewScreen: { screen: OverviewScreen },
    CurrencyDetailScreen: { screen: CurrencyDetailScreen },
  }, {
    headerMode: 'none'
  }
);

export default AppNavigator;
