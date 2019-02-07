import React from 'react';
import { connect } from 'react-redux';
import { Animated, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Text } from 'native-base';

import { Authenticate } from '../../store/actions/auth';
import { FetchRate } from '../../store/actions/exchangeRate';

import Passcode from '../../templates/Passcode';

const style = {
  fontSize: 30,
}

class HomeScreen extends React.Component {
  state = {
    showModal: false,
  }

  aniVal = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(
      this.aniVal,
      {
        duration: 1000,
        toValue: 2,
      }
    ).start();
  }

  authenticate = () => {
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
      <View style={{ flex: 1 }}>
        <Animated.Text
          style={[style, {
            top: '30%',
            left: this.aniVal.interpolate({
              inputRange: [0, 1, 2],
              outputRange: ['-10%', '30%', '30%']
            }),
            position: 'absolute'
          }]}
        >
          Manage
        </Animated.Text>
        <Animated.Text
          style={[style, {
            top: '40%',
            left: this.aniVal.interpolate({
              inputRange: [0, 1, 2],
              outputRange: ['100%', '50%', '50%']
            }),
            position: 'absolute'
          }]}
        >
          Account
        </Animated.Text>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 120,
            right: 32,
            opacity: this.aniVal.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 0, 1]
            })
          }}
        >
          <Button primary onPress={this.authenticate}><Text>Authenticate</Text></Button>
        </Animated.View>
        <Passcode type="Authenticate" show={showModal} onClose={this.closeModal} onSuccess={this.onSuccess} />
      </View>
    );
  }
}

const mapDispatchToProps = { Authenticate, FetchRate }

export default withNavigation(connect(null, mapDispatchToProps)(HomeScreen));