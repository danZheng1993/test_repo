import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

export default ({ conversionRate, convertedValue, defaultCurrency }) => (
  <View>
    <Text>Conversion Rate: {conversionRate}</Text>
    <Text>{defaultCurrency} {convertedValue}</Text>
  </View>
)