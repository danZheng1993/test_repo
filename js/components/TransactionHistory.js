import React from 'react';
import { withNavigation } from 'react-navigation';
import { Text } from 'native-base';
import { View, FlatList } from 'react-native';

import HistoryItem from './HistoryItem';
import { borderColor } from '../style/color';

const styles = {
  emptyWrapper: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8A8A8A'
  }
}

export default class TransactionHistory extends React.PureComponent {
  keyExtractor = (item, index) => `key_${index}`;
  renderItem = ({ item }) => (
    <HistoryItem info={item} />
  );
  renderEmptyState = () => (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyText}>No Transaction History</Text>
    </View>
  )
  render() {
    const { history } = this.props;
    return (
      <FlatList
        style={{ borderTopWidth: 1, borderTopColor: borderColor }}
        data={history}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmptyState}
      />
    )
  }
}
