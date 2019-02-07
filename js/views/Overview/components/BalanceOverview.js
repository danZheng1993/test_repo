import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { FlatList } from 'react-native';
import keys from 'lodash.keys';
import get from 'lodash.get';

import BalanceInfo from './BalanceInfo';

import { SetDefaultCurrency } from '../../../store/actions/account';

export class BalanceOverview extends React.Component {
  parseBalance = () => {
    const { balance, defaultCurrency } = this.props;
    const result = [];
    const currencies = keys(balance);
    currencies.forEach(currency => {
      result.push({ currency, ...get(balance, currency), isDefault: defaultCurrency === currency });
    });
    return result;
  }

  moveToDetail = (currency) => () => {
    this.props.navigation.navigate({
      routeName: 'CurrencyDetailScreen',
      params: { currency }
    });
  }

  onSetDefault = (currency) => () => {
    this.props.SetDefaultCurrency({ currency });
  }

  keyExtractor = (item, idx) => `balance_${idx}`

  renderItem = ({ item }) => {
    const { defaultCurrency } = this.props;
    return <BalanceInfo {...item} defaultCurrency={defaultCurrency} onPress={this.moveToDetail(item.currency)} onSetDefault={this.onSetDefault(item.currency)} />
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

const mapDispatchToProps = {
  SetDefaultCurrency,
};

export default withNavigation(connect(null, mapDispatchToProps)(BalanceOverview));