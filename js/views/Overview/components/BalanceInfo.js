import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { H1, H2, H3, Text } from 'native-base';

const styles = {
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftPart: {
    flex: 1,
    flexDirection: 'column',
  },
  rightPart: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontalTexts: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
}

export default ({ balance, conversionRate, convertedValue, currency, isDefault, defaultCurrency, onPress }) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <View style={styles.leftPart}>
      <H1>{currency}</H1>
      <View style={styles.horizontalTexts}>
        <H2>Balance:</H2><H2>{balance.toFixed(2)}</H2>
      </View>
    </View>
    {
      isDefault ? (
        <H1>Default Currency</H1>
      ) : (
        <View style={styles.rightPart}>
          <View style={styles.horizontalTexts}>
            <Text>Conversion Rate(with {defaultCurrency}):</Text>
            <H3>{conversionRate.toFixed(2)}</H3>
          </View>
          <View style={styles.horizontalTexts}>
            <Text>In {defaultCurrency}:</Text>
            <H3>{convertedValue.toFixed(2)}</H3>
          </View>
        </View>
      )
    }
  </TouchableOpacity>
)