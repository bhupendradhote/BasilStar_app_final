import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';
import Theme from '@/constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type NewsItem = {
  id: string;
  title: string;
  image: string;
  date: string;
};

const sampleNews: NewsItem[] = [
  {
    id: '1',
    title: 'Stock Market Hits New Record High Today',
    image: 'https://images.unsplash.com/photo-1649003515353-c58a239cf662?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Potential Interest Rate Cut',
    image: 'https://plus.unsplash.com/premium_photo-1726797964368-fdebed469d0f?q=80&w=1170&auto=format&fit=crop',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '3',
    title: 'Oil Prices Drop Amid Geopolitical Tension Easing',
    image: 'https://images.unsplash.com/photo-1593789198777-f29bc259780e?q=80&w=1170&auto=format&fit=crop',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '4',
    title: 'Tech Giants Report Better Than Expected Earnings',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1170&auto=format&fit=crop',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '5',
    title: 'Cryptocurrency Market Shows Extreme Volatility Today',
    image: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '6',
    title: 'Global Supply Chain Shows Significant Improvements',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop',
    date: 'September 22, 2025 • 12.27AM IST',
  },
  {
    id: '7',
    title: 'Investments in Renewable Energy Continue Rising Rapidly',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1170&auto=format&fit=crop',
    date: 'September 22, 2025 • 12.27AM IST',
  },
];

export default function NewsScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Theme.Colors.dark : Theme.Colors.light;

  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text, fontFamily: Theme.Fonts.heading }]}>
            {item.title}
          </Text>
          <Text style={[styles.date, { color: colors.icon, fontFamily: Theme.Fonts.body }]}>
            {item.date}
          </Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Filled Dashboard Icon */}
        <MaterialCommunityIcons name="view-dashboard" size={28} color="#123530" />
        {/* Filled Notifications Icon */}
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="#123530" />
        </TouchableOpacity>
      </View>

      {/* Trending News Header */}
      <View style={styles.trendingContainer}>
        <Text style={[styles.trendingHeader, { color: colors.text }]}>
          Trending News
        </Text>
      </View>

      <FlatList
        data={sampleNews}
        keyExtractor={(item) => item.id}
        renderItem={renderNewsItem}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
  },
  trendingContainer: {
    marginBottom: 16,
  },
  trendingHeader: {
    ...Theme.Typography.heading,
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    padding: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: Theme.Typography.subHeading.fontSize,
    fontWeight: Theme.Typography.subHeading.fontWeight,
    lineHeight: Theme.Typography.subHeading.lineHeight,
    marginBottom: 10,
  },
  date: {
    fontSize: Theme.Typography.small.fontSize,
  },
});
