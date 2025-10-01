import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function TodaysOutlookDetails() {
  const router = useRouter();

  const date = '23/09/2025';

  // Images for "Global Cues" cards
  const globalCuesImages = [
    { image: 'https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0' },
  ];

  const domesticSentiment = [
    'Nifty opened positive; support at 19,800, resistance at 20,200',
    'Sectors in focus: Banking, IT, Pharma',
    'Key data/events today: RBI meet, earnings from XYZ Ltd.',
  ];

  const stockTip = {
    name: 'Honasa Consumer Limited (HONAS)',
    cmp: '₹1,250',
    target: '₹1,450',
    duration: 'Short Term / Positional (1–3 months)',
    view: 'Buy on dips',
    reason: 'Strong Q1 numbers and technical breakout',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
  

      {/* Global Cues as Image Cards */}
      {globalCuesImages.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
        </View>
      ))}

      {/* Domestic Sentiment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Domestic Sentiment</Text>
        {domesticSentiment.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Ionicons name="ellipse" size={10} color="#123530" style={{ marginRight: 8 }} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Stock Tip of the Day */}
      <View style={styles.stockTipCard}>
        <View style={styles.stockHeader}>
          <MaterialIcons name="emoji-events" size={28} color="#ffffff" />
          <Text style={styles.stockTitle}>📈 Stock Tip of the Day</Text>
        </View>
        <Text style={styles.stockName}>{stockTip.name}</Text>
        <Text style={styles.stockDetail}>CMP: {stockTip.cmp}</Text>
        <Text style={styles.stockDetail}>Target: {stockTip.target}</Text>
        <Text style={styles.stockDetail}>Duration: {stockTip.duration}</Text>
        <Text style={styles.stockDetail}>View: {stockTip.view}</Text>
        <Text style={styles.stockReason}>Why this Stock? {stockTip.reason}</Text>
      </View>
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why this stock</Text>
        {domesticSentiment.map((item, idx) => (
          <View key={idx} style={styles.listItem}>
            <Ionicons name="ellipse" size={10} color="#123530" style={{ marginRight: 8 }} />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
      {/* Extra bottom spacing */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.Colors.light.background || '#fffbf5',
    paddingTop: 40,
  },

  backButton: {
    marginRight: 12,
    marginBottom: 16,
    backgroundColor: '#123530',
    padding: 6,
    borderRadius: 8,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#123530',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#123530',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: width - 32,
    height: 180,
    resizeMode: 'cover',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  stockTipCard: {
    backgroundColor: '#123530',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,

  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  stockName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  stockDetail: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  stockReason: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
