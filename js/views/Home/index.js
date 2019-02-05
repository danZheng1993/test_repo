import React from 'react';
import { connect } from 'react-redux';
import { Animated, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Authenticate } from '../../store/actions/auth';
import { FetchRate } from '../../store/actions/exchangeRate';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.Authenticate({ type: 'TouchID', success: this.onSuccess, failure: this.onFailure });
    this.props.FetchRate();
  }

  onSuccess = () => {
    console.log('success');
  }

  onFailure = () => {
    this.props.navigation.navigate({
      routeName: 'PasscodeScreen',
      params: {
        type: 'Authenticate',
        toScreen: 'OverviewScreen',
      }
    });
  }

  render() {
    return (
      <View />
    );
  }
}

const mapDispatchToProps = { Authenticate, FetchRate }

export default withNavigation(connect(null, mapDispatchToProps)(HomeScreen));