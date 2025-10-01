import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Intro / Splash Screens */}
        <Stack.Screen name="intro/screen1" options={{ headerShown: false }} />
        <Stack.Screen name="intro/screen2" options={{ headerShown: false }} />
        <Stack.Screen name="pages/todaysOutlook/todaysOutlook" options={{ headerShown: false }} />
        <Stack.Screen name="pages/todaysOutlook/todaysOutlookDetails" options={{ headerShown: false }} />
        <Stack.Screen name="pages/learning/learning" options={{ headerShown: false }} />
        <Stack.Screen name="pages/learning/blogDetails" options={{ headerShown: false }} />
        <Stack.Screen name="pages/learning/blogPostDetails" options={{ headerShown: false }} />
        <Stack.Screen name="pages/learning/videoDetails" options={{ headerShown: false }} />
        <Stack.Screen name="pages/news/newsDetails" options={{ headerShown: false }} />
        <Stack.Screen name="pages/profile/userProfile" options={{ headerShown: false }} />
        <Stack.Screen name="pages/calculator/calculator" options={{ headerShown: false }} />
        <Stack.Screen name="pages/profile/notificationandAlerts" options={{ headerShown: false }} />

  {/* Auth group */}
  <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Optional modal */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
