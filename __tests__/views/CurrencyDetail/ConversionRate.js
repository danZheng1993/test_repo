import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import ConversionRate from '../../../js/views/CurrencyDetail/components/ConversionRate';

it('renders correctly', () => {
  renderer.create(
    <ConversionRate conversionRate={10} convertedValue={100} defaultCurrency="USD" />
  );
});
