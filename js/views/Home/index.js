import React from 'react';
import { connect } from 'react-redux';
import { Animated, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Authenticate } from '../../store/actions/auth';
import { FetchRate } from '../../store/actions/exchangeRate';

import Passcode from '../../templates/Passcode';

class HomeScreen extends React.Component {
  state = {
    showModal: false,
  }
  componentDidMount() {
    this.props.Authenticate({ type: 'TouchID', success: this.onSuccess, failure: this.onFailure });
    this.props.FetchRate();
  }

  onSuccess = () => {
    this.props.navigation.navigate('OverviewScreen');
  }

  onFailure = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal } = this.state;
    return (
      <View>
        <Passcode type="Authenticate" show={showModal} onClose={this.closeModal} onSuccess={this.onSuccess} />
      </View>
    );
  }
}

const mapDispatchToProps = { Authenticate, FetchRate }

export default withNavigation(connect(null, mapDispatchToProps)(HomeScreen));