import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started!</Text>
      <Button title="Go to Tabs" onPress={() => router.replace('/(tabs)/dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
