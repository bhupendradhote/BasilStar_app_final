import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function BlogDetails() {
  const router = useRouter();

  const blogs: { id: string; title: string; image: string; date: string; content: string }[] = [
    {
      id: '1',
      title: '5 Key Metrics Every Investor Should Know Before Picking a Stock',
      image: 'https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0',
      date: '23/09/2025',
      content: `Investing in the stock market isn’t about following trends or chasing tips — it’s about making informed decisions based on solid research. Whether you’re a beginner or an experienced investor, there are a few fundamental metrics that can help you evaluate a company before you add it to your watchlist or portfolio.

Here are five key ones:

1. Price-to-Earnings (P/E) Ratio
2. Earnings Per Share (EPS)
3. Debt-to-Equity Ratio
4. Dividend Yield
5. Return on Equity (ROE)`,
    },
    {
      id: '2',
      title: 'Top 5 Stocks to Watch',
      image: 'https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0',
      date: '22/09/2025',
      content: 'Full blog content for Top 5 Stocks to Watch...',
    },
    {
      id: '3',
      title: 'Understanding Market Trends',
      image: 'https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0',
      date: '21/09/2025',
      content: 'Full blog content for Understanding Market Trends...',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      {blogs.map((blog) => (
        <TouchableOpacity
          key={blog.id}
          style={styles.blogCard}
          onPress={() => router.push({
            pathname: '/pages/learning/blogPostDetails',
            params: { id: blog.id },
          })}
        >
          <Image source={{ uri: blog.image }} style={styles.blogImage} />
          <Text style={styles.title}>{blog.title}</Text>
          <Text style={styles.date}>{blog.date}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.light.background || '#fffbf5',
    paddingTop: 40,
  },
  backButton: {
    marginLeft: 16,
    marginBottom: 16,
    backgroundColor: '#123530',
    padding: 6,
    borderRadius: 8,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blogCard: {
    width,
    alignItems: 'center',
    marginBottom: 20,
  },
  blogImage: {
    width: width * 0.9,
    height: 250,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123530',
    marginTop: 12,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
