import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import TotalBalance from '../../../js/views/Overview/components/TotalBalance';

it('renders correctly', () => {
  renderer.create(
    <TotalBalance balance={100} currency="USD" />
  );
});
