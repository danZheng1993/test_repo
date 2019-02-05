import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import moment from 'moment';

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
    <View>
      <Text>{resultString}</Text>
      <Text>{moment(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}</Text>
    </View>
  )
}
