import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../views/Home';

const AppNavigator = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
  }, {
    headerMode: 'none'
  }
);

export default AppNavigator;
