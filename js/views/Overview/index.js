import React from 'react';
import { connect } from 'react-redux';

import PageTemplate from '../../components/PageTemplate';
import TotalBalance from './components/TotalBalance';
import BalanceOverview from './components/BalanceOverview';

import { getConvertedBalance, getTotal, getDefaultCurrency } from '../../store/selector/account';

class OverviewScreen extends React.Component {
  render() {
    const { balance, totalBalance, defaultCurrency } = this.props;
    return (
      <PageTemplate>
        <TotalBalance currency={defaultCurrency} balance={totalBalance} />
        <BalanceOverview balance={balance} defaultCurrency={defaultCurrency} />
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
