import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import Footer from '../../js/components/Footer';

it('renders correctly', () => {
  renderer.create(
    <Footer />
  );
});
