import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardItem } from 'native-base';

import { H3, Text, Icon } from 'native-base';
import { highlightColor, disabledColor } from '../../../style/color';

const styles = {
  wrapper: {
    padding: 16,
    flex: 1,
  },
  leftPart: {
    flex: 1,
    flexDirection: 'column',
  },
  rightPart: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontalAlign: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
}

export default ({ balance, conversionRate, currency, isDefault, defaultCurrency, onPress, onSetDefault }) => (
  <Card>
    <CardItem>
      <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <View style={[styles.horizontalAlign, { marginBottom: 16 }]}>
          <Text>
            <Text>Currency: </Text><H3>{currency}</H3>
          </Text>
          <TouchableOpacity onPress={onSetDefault}>
            <Icon name="star" style={{ color : isDefault ? highlightColor : disabledColor}} />
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalAlign}>
          <H3>{balance.toFixed(2)}</H3>
          {!isDefault && <Text>Rate: {conversionRate.toFixed(2)} ({defaultCurrency})</Text>}
        </View>
      </TouchableOpacity>
    </CardItem>
  </Card>
)