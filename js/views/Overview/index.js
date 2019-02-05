import React from 'react';
import { connect } from 'react-redux';

import PageTemplate from '../../components/pageTemplate';

import { getConvertedBalance, getTotal, getDefaultCurrency } from '../../store/selector/account';

class OverviewScreen extends React.Component {
  render() {
    const { balance, totalBalance, defaultCurrency } = this.props;
    console.log(balance, totalBalance, defaultCurrency);
    return (
      <PageTemplate />
    );
  }
}

const mapStateToProps = (state) => ({
  defaultCurrency: getDefaultCurrency(state),
  balance: getConvertedBalance(state),
  totalBalance: getTotal(state),
});

export default connect(mapStateToProps)(OverviewScreen);
