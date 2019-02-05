import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import get from 'lodash.get';
import takeRight from 'lodash.takeright';

import PageTemplate from '../../components/PageTemplate';
import Balance from './components/Balance';
import ConversionRate from './components/ConversionRate';

import { getConvertedBalance, getDefaultCurrency } from '../../store/selector/account';

import TransactionHistory from '../../components/TransactionHistory';

class CurrencyDetailScreen extends React.Component {
  getCurrencyBalance = () => {
    const { balance, defaultCurrency } = this.props;
    const currency = this.props.navigation.getParam('currency');
    return {...get(balance, currency), currency, isDefault: currency === defaultCurrency };
  }
  getHistory = () => {
    const { history } = this.props;
    const currency = this.props.navigation.getParam('currency');
    const result = history.filter((item) => {
      const tCurrency = get(item, 'currency');
      const baseCurrency = get(item, 'baseCurrency');
      const targetCurrency = get(item, 'targetCurrency');
      return currency === tCurrency || currency === baseCurrency || targetCurrency;
    })
    return takeRight(result, 5);
  }
  render() {
    const { defaultCurrency } = this.props;
    const balanceInfo = this.getCurrencyBalance();
    const history = this.getHistory();
    const {
      balance,
      conversionRate,
      convertedValue,
      currency,
      isDefault,
    } = balanceInfo;
    return (
      <PageTemplate>
        <Balance balance={balance} currency={currency} />
        {
          !isDefault && <ConversionRate conversionRate={conversionRate} convertedValue={convertedValue} defaultCurrency={defaultCurrency} />
        }
        <TransactionHistory history={history} />
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state) => ({
  defaultCurrency: getDefaultCurrency(state),
  balance: getConvertedBalance(state),
  history: state.transactionHistory.history
});

export default withNavigation(connect(mapStateToProps)(CurrencyDetailScreen));
