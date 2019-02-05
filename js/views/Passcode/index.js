import React from 'react';
import { connect } from 'react-redux';
import { Form, Item, Input, Button, Text } from 'native-base';

import PageTemplate from '../../components/PageTemplate';
import { Authenticate, Authorize } from '../../store/actions/auth';
import { DispatchAction } from '../../store/actions/application';

class Passcode extends React.Component {
  state = {
    failed: false,
    passcode: '',
  }

  submit = () => {
    const type = this.props.navigation.getParam('type');
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
    }
  }

  onSuccess = () => {
    const action = this.props.navigation.getParam('action');
    if (action) {
      this.props.DispatchAction({ dispatchingAction: action });
    }
    const toScreen = this.props.navigation.getParam('toScreen');
    if (toScreen) {
      this.props.navigation.navigate(toScreen);
    }
  }

  onFail = () => {
    this.setState({
      failed: true,
    })
  }

  onChangePasscode = (passcode) => {
    this.setState({
      passcode
    })
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const type = this.props.navigation.getParam('type');
    const { failed } = this.state;
    return (
      <PageTemplate>
        <Form>
          <Item last>
            <Input placeholder="Passcode" onChangeText={this.onChangePasscode} />
          </Item>
        </Form>
        <Button primary onPress={this.submit}><Text>{type}</Text></Button>
        {
          failed &&
          <Button primary onPress={this.goBack}><Text>Go Back</Text></Button>
        }
      </PageTemplate>
    )
  }
}

const mapDispatchToProps = {
  Authenticate,
  Authorize,
  DispatchAction
}

export default connect(null, mapDispatchToProps)(Passcode);