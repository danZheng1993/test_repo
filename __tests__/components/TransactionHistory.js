import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import TransactionHistory from '../../js/components/TransactionHistory';

import { historyItems } from '../../testData';

it('renders correctly', () => {
  renderer.create(
    <TransactionHistory history={historyItems} />
  );
});
