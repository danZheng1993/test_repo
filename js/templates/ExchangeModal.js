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

import { ExchangeBalance } from '../store/actions/account';
import { Authorize } from '../store/actions/auth';
import { getCurrencies, getDefaultCurrency } from '../store/selector/account';

class ExchangeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: props.defaultCurrency,
      amount: '0.00',
      showPasscode: false,
      targetCurrency: null,
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
    const { amount, targetCurrency } = this.state;
    const amountInNum = toNumber(amount);
    const currency = isEmpty(this.props.currency) ? this.state.currency : this.props.currency;
    this.props.ExchangeBalance({ baseCurrency: currency, targetCurrency, amount: amountInNum });
    this.props.onClose();
  }

  onTouchIDFailure = () => {
    this.setState({ showPasscode: true });
  }

  getSelectableCurrencies = () => {
    const { currencies } = this.props;
    const currency = isEmpty(this.props.currency) ? this.state.currency : this.props.currency;
    return currencies.filter(item => item !== currency);
  }

  processPayment = (currency, amount) => {
    this.props.Authorize({ type: 'TouchID', success: this.onSuccess, failure: this.onTouchIDFailure })
  }

  changeAmount = (amount) => {
    this.setState({ amount });
  }

  changeTargetCurrency = (targetCurrency) => {
    this.setState({ targetCurrency })
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
    const selectableCurrencies = this.getSelectableCurrencies();
    return (
      <React.Fragment>
        <Modal visible={show && !showPasscode} onClose={onClose} animationType="slide">
          <Container>
            <Header>
              <Body><Title>Exchange Currency</Title></Body>
            </Header>
            <Content>
              <Form>
                {
                  isEmpty(currency) && (
                    <Item>
                      <Label>Base Currency</Label>
                      <Picker placeholder="Select One" note mode="dropdown" selectedValue={this.state.currency} onValueChange={this.changeCurrency} >
                        { currencies.map((item, idx) => (
                          <Picker.Item label={item} value={item} key={`value_${idx}`} />
                        )) }
                      </Picker>
                    </Item>
                  )
                }
                <Item>
                  <Label>Target Currency</Label>
                  <Picker placeholder="Select One" note mode="dropdown" selectedValue={this.state.targetCurrency} onValueChange={this.changeTargetCurrency} >
                    { selectableCurrencies.map((item, idx) => (
                      <Picker.Item label={item} value={item} key={`value_${idx}`} />
                    )) }
                  </Picker>
                </Item>
                <Item last>
                  <Label>Exchange Amount</Label>
                  <Input
                    placeholder="10.00"
                    placeholderTextColor="#8a8a8a"
                    value={amount}
                    onChangeText={this.changeAmount}
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
  defaultCurrency: getDefaultCurrency(state),
  currencies: getCurrencies(state),
  balance: state.account.balance,
});

const mapDispatchToProps = {
  Authorize,
  ExchangeBalance
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ExchangeModal));
