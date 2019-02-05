import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import PageTemplate from '../../js/components/PageTemplate';

it('renders correctly', () => {
  renderer.create(
    <PageTemplate />
  );
});
