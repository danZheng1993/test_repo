import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import { BalanceOverview } from '../../../js/views/Overview/components/BalanceOverview';

import { parsedBalance } from '../../../testData';

it('renders correctly', () => {
  renderer.create(
    <BalanceOverview balance={parsedBalance} defaultCurrency="USD" />
  );
});
