import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function Learning() {
  const router = useRouter();
  const date = '23/09/2025'; // sample date, can be dynamic

  const BLOG_DETAILS_LINK = '/pages/todaysOutlook/todaysOutlookDetails' as const;

  const videos: { title: string; url: string; date: string }[] = [
    { title: 'Market Outlook Today', url: 'https://www.w3schools.com/html/mov_bbb.mp4', date: '23/09/2025' },
    { title: 'Top Stock Picks', url: 'https://www.w3schools.com/html/movie.mp4', date: '22/09/2025' },
    { title: 'Technical Analysis Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', date: '21/09/2025' },
  ];

  const blogs: { title: string; image: string; link: typeof BLOG_DETAILS_LINK; date: string }[] = [
    { title: '5 Key Metrics Every Investor Should Know Before Picking a Stock', image: 'https://images.unsplash.com/photo-1707761918029-1295034aa31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0', link: BLOG_DETAILS_LINK, date: '23/09/2025' },
    { title: 'Top 5 Stocks to Watch', image: 'https://images.unsplash.com/photo-1516199423456-1f1e91b06f25?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0', link: BLOG_DETAILS_LINK, date: '22/09/2025' },
    { title: 'Understanding Market Trends', image: 'https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0', link: BLOG_DETAILS_LINK, date: '21/09/2025' },
  ];

  const renderVideoCard = (item: { title: string; url: string; date: string }, index: number) => (
    <View key={index} style={styles.videoCard}>
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        useNativeControls
        resizeMode={'cover' as ResizeMode}
      />
      <TouchableOpacity style={styles.playIconOverlay}>
        <MaterialIcons name="play-circle-outline" size={50} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.videoTitle}>{item.title}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  );

  const renderBlogCard = (item: { title: string; image: string; link: typeof BLOG_DETAILS_LINK; date: string }, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.blogCard}
      onPress={() => router.push(item.link)}
    >
      <Image source={{ uri: item.image }} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Learning</Text>

   {/* Videos Section */}
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Videos</Text>
  <TouchableOpacity onPress={() => router.push('/pages/learning/videoDetails')}>
    <Text style={styles.viewAll}>View All</Text>
  </TouchableOpacity>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {videos.map(renderVideoCard)}
</ScrollView>

{/* Blogs Section */}
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Blogs</Text>
  <TouchableOpacity onPress={() => router.push('/pages/learning/blogDetails')}>
    <Text style={styles.viewAll}>View All</Text>
  </TouchableOpacity>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {blogs.map(renderBlogCard)}
</ScrollView>


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
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#123530',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E90FF',
  },
  videoCard: {
    marginRight: 16,
    width: width * 0.9,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: '#fff',
    marginBottom: 20,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  playIconOverlay: {
    position: 'absolute',
    top: '28%',
    left: '40%',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    color: '#333',
  },
  blogCard: {
    marginRight: 16,
    width: width * 0.9,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: '#fff',
  },
  blogImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 8,
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#555',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
