import React from 'react';
import { connect } from 'react-redux';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import PageTemplate from '../../components/PageTemplate';
import TotalBalance from './components/TotalBalance';
import BalanceOverview from './components/BalanceOverview';
import DepositModal from '../../templates/DepositModal';
import WithdrawModal from '../../templates/WithdrawModal';
import ExchangeModal from '../../templates/ExchangeModal';
import AddModal from '../../templates/AddModal';

import { getConvertedBalance, getTotal, getDefaultCurrency } from '../../store/selector/account';

class OverviewScreen extends React.Component {
  state = {
    showDeposit: false,
    showWithdraw: false,
    showExchange: false,
    showNewAccount: false,
  }

  addAccount = () => {
    this.setState({ showNewAccount: true });
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
    this.setState({ showDeposit: false, showWithdraw: false, showExchange: false, showNewAccount: false, });
  }

  renderFooter = () => {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.addAccount}>
            <Icon name="add" />
            <Text>New</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.deposit}>
            <Icon name="arrow-round-up" />
            <Text>Deposit</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.withdraw}>
            <Icon name="arrow-round-down" />
            <Text>Withdraw</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.exchange}>
            <Icon name="swap" />
            <Text>Exchange</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }

  render() {
    const { balance, totalBalance, defaultCurrency } = this.props;
    const { showDeposit, showExchange, showWithdraw, showNewAccount } = this.state;
    return (
      <PageTemplate footer={this.renderFooter()}>
        <TotalBalance currency={defaultCurrency} balance={totalBalance} />
        <BalanceOverview balance={balance} defaultCurrency={defaultCurrency} />
        <DepositModal show={showDeposit} onClose={this.closeModals} />
        <WithdrawModal show={showWithdraw} onClose={this.closeModals} />
        <ExchangeModal show={showExchange} onClose={this.closeModals} />
        <AddModal show={showNewAccount} onClose={this.closeModals} />
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state) => ({
  defaultCurrency: getDefaultCurrency(state),
  balance: getConvertedBalance(state),
  totalBalance: getTotal(state),
});

export default connect(mapStateToProps)(OverviewScreen);
