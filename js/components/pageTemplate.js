import React from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Content, Header, Left, Button, Icon } from 'native-base';

export default class PageTemplate extends React.PureComponent {
  render() {
    const { onLeft, leftIcon, children, footer } = this.props;
    return (
      <Container>
        {
          onLeft ? (
            <Header>
              <Left>
                <Button transparent onPress={onLeft}>
                  <Icon name={leftIcon} />
                </Button>
              </Left>
            </Header>   
          ) : (
            <Header />
          )
        }
        <Content>
          {children}
        </Content>
        {
          footer
        }
      </Container>
    )
  }
}
