import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { Form, Item, Input, Button, Text, Footer, FooterTab, } from 'native-base';

import PageTemplate from '../components/PageTemplate';
import { Authenticate, Authorize } from '../store/actions/auth';

class Passcode extends React.Component {
  state = {
    failed: false,
    passcode: '',
  }

  submit = () => {
    const { type } = this.props;
    const { passcode } = this.state;
    this.setState({
      failed: false,
    })
    if (type === 'Authenticate') {
      this.props.Authenticate({
        type: 'Passcode',
        data: { passcode },
        success: this.onSuccess,
        failure: this.onFail
      })
    } else {
      this.props.Authenticate({
        type: 'Passcode',
        data: { passcode },
        success: this.onSuccess,
        failure: this.onFail
      })
    }
  }

  onSuccess = () => {
    this.props.onClose();
    this.props.onSuccess();
  }

  onFail = () => {
    this.setState({ passcode: '', failed: true });
  }

  onChangePasscode = (passcode) => {
    this.setState({
      passcode
    })
  }

  renderFooter = () => {
    const { type } = this.props;
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.submit}><Text>{type}</Text></Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.props.onClose}><Text>Cancel</Text></Button>
        </FooterTab>
      </Footer>
    )
  }

  render() {
    const { show, onClose } = this.props;
    const { failed } = this.props;
    return (
      <Modal visible={show} onClose={onClose}>
        <PageTemplate footer={this.renderFooter()}>
          <Form>
            <Item last error={failed}>
              <Input secureTextEntry placeholder="Passcode" onChangeText={this.onChangePasscode} />
            </Item>
          </Form>
        </PageTemplate>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  Authenticate,
  Authorize,
}

export default connect(null, mapDispatchToProps)(Passcode);