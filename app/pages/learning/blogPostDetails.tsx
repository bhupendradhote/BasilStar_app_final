import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function BlogPostDetails() {
  const router = useRouter();

  const blog = {
    title: "5 Key Metrics Every Investor Should Know Before Picking a Stock",
    date: "September 22, 2025",
    image: "https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: `Investing in the stock market isn’t about following trends or chasing tips — it’s about making informed decisions based on solid research. Whether you’re a beginner or an experienced investor, there are a few fundamental metrics that can help you evaluate a company before you add it to your watchlist or portfolio.

Here are five key ones:

1. Price-to-Earnings (P/E) Ratio
The P/E ratio tells you how much investors are willing to pay for every rupee (or dollar) of a company’s earnings. A high P/E might indicate growth expectations, while a low P/E could suggest undervaluation — or hidden risks.

2. Earnings Per Share (EPS)
EPS shows how much profit a company generates for each share. Consistently growing EPS is usually a sign of financial strength.

3. Debt-to-Equity Ratio
This measures how much a company relies on borrowed money versus its own funds. Too much debt can make a business risky, especially in volatile markets.

4. Dividend Yield
For income-focused investors, dividend yield shows how much cash return you get compared to the stock price. Stable or rising dividends often reflect financial health.

5. Return on Equity (ROE)
ROE reveals how efficiently a company uses shareholder money to generate profits. Higher ROE typically signals good management performance.`,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Blog Content */}
      <View style={styles.contentContainer}>
        <Image source={{ uri: blog.image }} style={styles.blogImage} />
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.date}>{blog.date}</Text>
        <Text style={styles.content}>{blog.content}</Text>
      </View>
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
    position: 'absolute',
    zIndex: 10,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
  },
  blogImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#123530',
    marginBottom: 8,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
