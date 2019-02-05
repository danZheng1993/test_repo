import React from 'react';
import { Container, Content, Header } from 'native-base';

export default ({ children }) => (
  <Container>
    <Header />
    <Content>
      {children}
    </Content>
  </Container>
)