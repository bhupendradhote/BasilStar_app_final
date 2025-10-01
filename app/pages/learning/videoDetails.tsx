import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function VideoDetails() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const videos: { title: string; url: string; date: string }[] = [
    { title: 'Market Outlook Today', url: 'https://www.w3schools.com/html/mov_bbb.mp4', date: '23/09/2025' },
    { title: 'Top Stock Picks', url: 'https://www.w3schools.com/html/movie.mp4', date: '22/09/2025' },
    { title: 'Technical Analysis Basics', url: 'https://www.w3schools.com/html/mov_bbb.mp4', date: '21/09/2025' },
  ];

  return (
    <ScrollView
      style={styles.container}
      ref={scrollRef}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      {videos.map((video, index) => (
        <View key={index} style={styles.videoCard}>
          <Video
            source={{ uri: video.url }}
            style={styles.video}
            useNativeControls
            resizeMode={'cover' as ResizeMode}
          />
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.date}>{video.date}</Text>
        </View>
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
  videoCard: {
    width,
    alignItems: 'center',
    marginBottom: 20,
  },
  video: {
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
