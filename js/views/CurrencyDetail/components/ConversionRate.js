import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { highlightColor, valueColor } from '../../../style/color';

const styles = {
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  field: {
    flex: 1,
    fontSize: 14,
  },
  balance: {
    fontSize: 16,
    color: highlightColor,
  },
  rate: {
    fontSize: 16,
    color: valueColor,
  }
}

export default ({ conversionRate, convertedValue, defaultCurrency }) => (
  <View style={styles.wrapper}>
    <Text style={styles.field}>
      {`In ${defaultCurrency}: `}
      <Text style={styles.balance}>{convertedValue.toFixed(2)}</Text>
    </Text>
    <Text style={styles.field}>
      {'Current Rate: '}
      <Text style={styles.rate}>{conversionRate.toFixed(2)}</Text>
    </Text>
  </View>
)