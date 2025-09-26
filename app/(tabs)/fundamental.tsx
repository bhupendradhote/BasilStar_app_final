import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FundamentalScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fundamental Analysis</Text>

      {/* Company Overview */}
      <View style={styles.card}>
        <Text style={styles.title}>Company</Text>
        <Text style={styles.value}>Infosys Ltd (INFY)</Text>
      </View>

      {/* Key Ratios */}
      <View style={styles.card}>
        <Text style={styles.title}>PE Ratio</Text>
        <Text style={styles.value}>27.5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Market Cap</Text>
        <Text style={styles.value}>₹6.2 Trillion</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>EPS (TTM)</Text>
        <Text style={styles.value}>₹54.2</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Dividend Yield</Text>
        <Text style={styles.value}>1.8%</Text>
      </View>

      {/* Balance Sheet Highlights */}
      <View style={styles.card}>
        <Text style={styles.title}>Revenue (TTM)</Text>
        <Text style={styles.value}>₹1.45 Trillion</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Net Income</Text>
        <Text style={styles.value}>₹52,500 Cr</Text>
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
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#264653',
  },
});
