import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import moment from 'moment';

const styles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    padding: 8,
  },

}

export default ({ info }) => {
  let resultString = '';
  switch(info.type) {
    case 'withdraw': {
      const { currency, amount } = info;
      resultString = `You withdrew ${currency} ${amount}`;
      break;
    }
    case 'deposit': {
      const { currency, amount } = info;
      resultString = `You deposited ${currency} ${amount}`;
      break;
    }
    case 'exchange': {
      const { baseCurrency, targetCurrency, amount } = info;
      resultString = `You exchanged ${baseCurrency} ${amount} to ${targetCurrency}`;
      break;
    }
    case 'removeAccount': {
      const { currency } = info;
      resultString = `You removed ${currency}`;
      break;
    }
    case 'addAddount': {
      const { currency, amount } = info;
      resultString = `You added ${currency} with initial deposit of ${amount}`;
      break;
    }
    default:
      resultString = 'Invalid History';
  }
  const { timeStamp } = info;
  return (
    <View style={styles.wrapper}>
      <Text>{resultString}</Text>
      <Text>{moment(timeStamp).format('YYYY-M-D hh:mm:ss')}</Text>
    </View>
  )
}
