import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import get from 'lodash.get';
import takeRight from 'lodash.takeright';
import { Title } from 'native-base';

import PageTemplate from '../../components/PageTemplate';
import Footer from '../../components/Footer'
import Balance from '../../components/Balance';
import ConversionRate from './components/ConversionRate';
import TransactionHistory from '../../components/TransactionHistory';
import DepositModal from '../../templates/DepositModal';
import WithdrawModal from '../../templates/WithdrawModal';
import ExchangeModal from '../../templates/ExchangeModal';

import { getConvertedBalance, getDefaultCurrency } from '../../store/selector/account';

class CurrencyDetailScreen extends React.Component {
  state = {
    showDeposit: false,
    showWithdraw: false,
    showExchange: false,
  }

  onLeft = () => {
    this.props.navigation.goBack();
  }

  deposit = () => {
    this.setState({ showDeposit: true });
  }

  withdraw = () => {
    this.setState({ showWithdraw: true });
  }

  exchange = () => {
    this.setState({ showExchange: true });
  }

  closeModals = () => {
    this.setState({ showDeposit: false, showWithdraw: false, showExchange: false });
  }

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

  renderFooter = () => {
    return (
      <Footer
        onDeposit={this.deposit}
        onWithdraw={this.withdraw}
        onExchange={this.exchange}
      />
    )
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
    const { showDeposit, showExchange, showWithdraw } = this.state;
    return (
      <PageTemplate leftIcon="arrow-back" onLeft={this.onLeft} footer={this.renderFooter()}>
        <Balance balance={balance} currency={currency} />
        {
          !isDefault && <ConversionRate conversionRate={conversionRate} convertedValue={convertedValue} defaultCurrency={defaultCurrency} />
        }
        <Title style={{ marginVertical: 16 }}>Transaction History</Title>
        <TransactionHistory history={history} />
        <DepositModal show={showDeposit} onClose={this.closeModals} currency={currency} />
        <WithdrawModal show={showWithdraw} onClose={this.closeModals} currency={currency} />
        <ExchangeModal show={showExchange} onClose={this.closeModals} currency={currency} />
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
