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
  Picker,
  Label,
} from 'native-base';
import isEmpty from 'lodash.isempty';
import isNumber from 'lodash.isnumber';
import toNumber from 'lodash.tonumber';
import get from 'lodash.get';

import Passcode from './Passcode';

import { WithdrawAccount } from '../store/actions/account';
import { Authorize } from '../store/actions/auth';
import { getCurrencies, getDefaultCurrency } from '../store/selector/account';

class WithdrawModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: props.defaultCurrency,
      amount: '0.00',
      showPasscode: false,
    };
  }

  onConfirm = () => {
    const { amount } = this.state;
    const amountInNum = toNumber(amount);
    if (isNumber(amountInNum)) {
      const currency = isEmpty(this.props.currency) ? this.state.currency : this.props.currency;
      const { balance } = this.props;
      if (get(balance, `${currency}.balance`, 0) < amountInNum) {
        Alert.alert('Balance is not enough');
      } else {
        this.processPayment();
      }
    } else {
      Alert.alert('Invalid Amount');
    }
  }

  onSuccess = () => {
    const { amount } = this.state;
    const amountInNum = toNumber(amount);
    const currency = isEmpty(this.props.currency) ? this.state.currency : this.props.currency;
    this.props.WithdrawAccount({ currency, amount: amountInNum });
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
    const { onClose, show, currency, currencies } = this.props;
    const { amount, showPasscode } = this.state;
    return (
      <React.Fragment>
        <Modal visible={show && !showPasscode} onClose={onClose} animationType="slide">
          <Container>
            <Header>
              <Body><Title>Withdraw to your account</Title></Body>
            </Header>
            <Content>
              <Form>
                {
                  isEmpty(currency) && (
                    <Item>
                      <Label>Currency</Label>
                      <Picker placeholder="Select One" note mode="dropdown" selectedValue={this.state.currency} onValueChange={this.changeCurrency} >
                        { currencies.map((currency, idx) => (
                          <Picker.Item label={currency} value={currency} key={`value_${idx}`} />
                        )) }
                      </Picker>
                    </Item>
                  )
                }
                <Item last>
                  <Label>Withdraw Amount</Label>
                  <Input placeholder="10.00" placeholderTextColor="#8a8a8a" value={amount} onChangeText={this.changeAmount} />
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
  defaultCurrency: getDefaultCurrency(state),
  currencies: getCurrencies(state),
  balance: state.account.balance,
});

const mapDispatchToProps = {
  Authorize,
  WithdrawAccount
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(WithdrawModal));
