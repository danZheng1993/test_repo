import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import HistoryItem from '../../js/components/HistoryItem';

import { historyItems } from '../../testData';

it('renders correctly', () => {
  renderer.create(
    <HistoryItem info={historyItems[0]} />
  );
});
