import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Theme from "@/constants/theme";
import api from "@/services/_api"; // axios instance

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user from AsyncStorage
  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "Not Available",
          avatar: parsedUser.avatar || "https://i.pravatar.cc/150?img=12",
        });
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await api.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Clear storage
      await AsyncStorage.clear();

      // Redirect to login
      router.replace("/(auth)/AuthScreen");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#123530" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header: Avatar + Name + Back Button */}
      <View style={styles.headerRow}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user?.name}</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfoBox}>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Options List */}
      <View style={styles.optionsBox}>
        {/* Personal Info */}
        <TouchableOpacity
          style={styles.optionRow}
        >
          <Ionicons name="person-outline" size={20} color="#123530" />
          <Text style={styles.optionText}>Personal Information</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => router.push("/pages/profile/notificationandAlerts")}
        >
          <Ionicons name="notifications-outline" size={20} color="#123530" />
          <Text style={styles.optionText}>Notifications & Alerts</Text>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={styles.optionRow}
        >
          <Ionicons name="settings-outline" size={20} color="#123530" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.optionRow, { borderBottomWidth: 0 }]}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#d9534f" />
          <Text style={[styles.optionText, { color: "#d9534f" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.light.background || "#fffbf5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 48,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "400",
    color: "#5EC385",
    flex: 1,
  },
  closeBtn: {
    backgroundColor: "#0f2925",
    padding: 6,
    borderRadius: 8,
  },
  userInfoBox: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  optionsBox: {
    marginTop: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#123530",
    fontWeight: "500",
  },
});
