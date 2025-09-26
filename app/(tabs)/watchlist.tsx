import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Stock = {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
};

const watchlistData: Stock[] = [
  { id: '1', symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,480', change: '+1.2%' },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹3,520', change: '-0.6%' },
  { id: '3', symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,420', change: '+0.9%' },
  { id: '4', symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,620', change: '-0.4%' },
];

export default function WatchlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>
      <FlatList
        data={watchlistData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text
                style={[
                  styles.change,
                  { color: item.change.startsWith('+') ? '#2a9d8f' : '#e63946' },
                ]}
              >
                {item.change}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbol: {
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
});
