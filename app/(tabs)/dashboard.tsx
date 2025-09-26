import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Portfolio Summary */}
      <View style={styles.card}>
        <Text style={styles.title}>Portfolio Value</Text>
        <Text style={styles.value}>₹1,25,000</Text>
        <Text style={styles.change}>+2.3% Today</Text>
      </View>

      {/* Market Overview */}
      <View style={styles.card}>
        <Text style={styles.title}>Market Overview</Text>
        <Text style={styles.item}>NIFTY 50: 19,850 (+0.5%)</Text>
        <Text style={styles.item}>SENSEX: 66,200 (+0.8%)</Text>
        <Text style={styles.item}>Bank NIFTY: 45,120 (-0.3%)</Text>
      </View>

      {/* Watchlist Preview */}
      <View style={styles.card}>
        <Text style={styles.title}>Top Movers</Text>
        <Text style={styles.item}>INFY: ₹1,480 (+1.2%)</Text>
        <Text style={styles.item}>TCS: ₹3,520 (-0.6%)</Text>
        <Text style={styles.item}>RELIANCE: ₹2,420 (+0.9%)</Text>
      </View>
    </ScrollView>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2a9d8f',
  },
  change: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  item: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
});
