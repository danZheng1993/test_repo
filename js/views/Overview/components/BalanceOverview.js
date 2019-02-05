import React from 'react';
import { withNavigation } from 'react-navigation';
import { FlatList } from 'react-native';
import keys from 'lodash.keys';
import get from 'lodash.get';

import BalanceInfo from './BalanceInfo';

class BalanceOverview extends React.Component {
  parseBalance = () => {
    const { balance, defaultCurrency } = this.props;
    const result = [];
    const currencies = keys(balance);
    result.push({ currency: defaultCurrency, ...get(balance, defaultCurrency), isDefault: true, });
    currencies.forEach(currency => {
      if (currency !== defaultCurrency) {
        result.push({ currency, ...get(balance, currency) })
      }
    });
    return result;
  }
  moveToDetail = (currency) => () => {
    this.props.navigation.navigate({
      routeName: 'CurrencyDetailScreen',
      params: { currency }
    })
  }
  keyExtractor = (item, idx) => `balance_${idx}`
  renderItem = ({ item }) => {
    const { defaultCurrency } = this.props;
    return <BalanceInfo {...item} defaultCurrency={defaultCurrency} onPress={this.moveToDetail(item.currency)} />
  }
  render() {
    const balance = this.parseBalance();
    return (
      <FlatList
        data={balance}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}

export default withNavigation(BalanceOverview);