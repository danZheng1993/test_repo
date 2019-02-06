import React from 'react';
import { Alert, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import isEmpty from 'lodash.isempty';
import isNumber from 'lodash.isnumber';
import toNumber from 'lodash.tonumber';

import Passcode from './Passcode';

import { AddAccount } from '../store/actions/account';
import { Authorize } from '../store/actions/auth';
import { getCurrencies, getDefaultCurrency } from '../store/selector/account';

class AddModal extends React.Component {
  state = {
    currency: '',
    amount: '0.00',
    showPasscode: false,
  }

  onConfirm = () => {
    const { amount, currency } = this.state;
    const amountInNum = toNumber(amount);
    const { currencies } = this.props;
    const pos = currencies.findIndex(val => val === currency);
    if (pos >= 0 && isEmpty(currency)) {
      Alert.alert('Invalid Account Info');
    } else {
      if (isNumber(amountInNum)) {
        this.processPayment();
      } else {
        Alert.alert('Invalid Amount');
      }
    }
  }

  onSuccess = () => {
    const { amount, currency } = this.state;
    const amountInNum = toNumber(amount);
    this.props.AddAccount({ currency, initialAmount: amountInNum });
    this.props.onClose();
  }

  onTouchIDFailure = () => {
    this.setState({ showPasscode: true });
  }

  processPayment = (currency, amount) => {
    this.props.Authorize({ type: 'TouchID', success: this.onSuccess, failure: this.onTouchIDFailure })
  }

  changeAmount = (amount) => {
    this.setState({ amount });
  }

  changeCurrency = (currency) => {
    this.setState({ currency });
  }

  closeAuthModal = () => {
    this.setState({ showPasscode: false });
  }

  render() {
    const { onClose, show } = this.props;
    const { amount, showPasscode, currency } = this.state;
    return (
      <React.Fragment>
        <Modal visible={show && !showPasscode} onClose={onClose} animationType="slide">
          <Container>
            <Header>
              <Body><Title>Add to your account</Title></Body>
            </Header>
            <Content>
              <Form>
                <Item>
                  <Label>Currency</Label>
                  <Input
                    value={currency}
                    onChangeText={this.changeCurrency}
                    placeholder="USD, CAD, ..."
                    placeholderTextColor="#8a8a8a"
                  />
                </Item>
                <Item last>
                  <Label>Add Amount</Label>
                  <Input
                    value={amount}
                    onChangeText={this.changeAmount}
                    placeholder="10.00"
                    placeholderTextColor="#8a8a8a"
                  />
                </Item>
              </Form>
            </Content>
            <Footer>
              <FooterTab>
                <Button onPress={onClose}><Text>Cancel</Text></Button>
              </FooterTab>
              <FooterTab>
                <Button onPress={this.onConfirm}><Text>Confirm</Text></Button>
              </FooterTab>
            </Footer>
          </Container>
        </Modal>
        <Passcode type='Authorize' show={showPasscode} onClose={this.closeAuthModal} onSuccess={this.onSuccess} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: getCurrencies(state),
});

const mapDispatchToProps = {
  Authorize,
  AddAccount
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddModal));
