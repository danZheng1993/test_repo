import React from 'react';
import { H2 } from 'native-base';

export default ({ balance, currency }) => (
  <H2>{currency} {balance}</H2>
)