import React from 'react';
import { View } from 'react-native';
import { H1, Text } from 'native-base';

const styles = {
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  currency: {
    marginRight: 5,
  }
}

export default ({ currency, balance }) => (
  <View style={styles.wrapper}>
    <Text style={styles.currency}>{currency}</Text><H1>{balance}</H1>
  </View>
)