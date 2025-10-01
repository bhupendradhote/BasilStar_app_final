import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function TodaysOutlook() {
  const router = useRouter();

  const date = '23/09/2025';

  type CardLink = '/pages/todaysOutlook/todaysOutlookDetails';

  const globalCues: { text: string; image: string; link: CardLink }[] = [
    {
      text: 'U.S. markets closed higher/lower on [reason – e.g., Fed rate decision, inflation data]',
      image: 'https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
    {
      text: 'Asian Markets are trading positive',
      image: 'https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
    {
      text: 'Crude oil at $85, INR at ₹82 vs USD',
      image: 'https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
  ];

  const domesticSentiment: { text: string; image: string; link: CardLink }[] = [
    {
      text: 'Nifty opened positive; support at 19,800, resistance at 20,200',
      image: 'https://images.unsplash.com/photo-1651340981821-b519ad14da7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
    {
      text: 'Sectors in focus: Banking, IT, Pharma',
      image: 'https://plus.unsplash.com/premium_photo-1661611255191-f68d5ad06cc5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
    {
      text: 'Key data/events today: RBI meet, earnings from XYZ Ltd.',
      image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0',
      link: '/pages/todaysOutlook/todaysOutlookDetails',
    },
  ];

  const renderCard = (item: { text: string; image: string; link: CardLink }, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.card}
      onPress={() => router.push(item.link)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Todays Outlook - {date}</Text>
      </View>

      {/* Global Cues */}
      <Text style={styles.sectionTitle}>Global Cues</Text>
      {globalCues.map(renderCard)}

      {/* Domestic Sentiment */}
      <Text style={styles.sectionTitle}>Domestic Sentiment</Text>
      {domesticSentiment.map(renderCard)}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 21,
    fontWeight: '700',
    color: '#123530',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123530',
    marginBottom: 26,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: width - 32,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  cardText: {
    padding: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
