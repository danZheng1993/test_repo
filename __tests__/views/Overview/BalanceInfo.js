import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import BalanceInfo from '../../../js/views/Overview/components/BalanceInfo';

it('renders correctly', () => {
  renderer.create(
    <BalanceInfo
      balance={10}
      conversionRate={1.625}
      convertedValue={16.25}
      currency="USD"
      defaultCurrency="EUR"
    />
  );
});
