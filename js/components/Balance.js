import React from 'react';
import { View } from 'react-native';
import { H1, Text } from 'native-base';

import { highlightColor, valueColor, borderColor } from '../style/color';

const styles = {
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: borderColor
  },
  currency: {
    marginRight: 5,
    color: highlightColor
  },
  value: {
    color: valueColor,
  }
}

export default ({ currency, balance }) => (
  <View style={styles.wrapper}>
    <Text style={styles.currency}>{currency}</Text><H1 style={styles.value}>{balance.toFixed(2)}</H1>
  </View>
)