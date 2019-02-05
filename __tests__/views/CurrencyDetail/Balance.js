import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import Balance from '../../../js/views/CurrencyDetail/components/Balance';

it('renders correctly', () => {
  renderer.create(
    <Balance balance={10} currency="USD" />
  );
});
