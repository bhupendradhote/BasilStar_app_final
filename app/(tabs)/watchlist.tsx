import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons,MaterialCommunityIcons,MaterialIcons } from "@expo/vector-icons";

const WatchlistScreen = () => {
  const [activeTab, setActiveTab] = useState("Nifty 50");

  const tabs = ["Nifty 50", "List 1", "List 2", "List 3"];

  const stocks = [
    { id: "1", name: "Reliance", exchange: "NSE", action: "B", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "2", name: "HDFC BANK", exchange: "NSE", action: "H", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "3", name: "BHARTIARTL", exchange: "NSE", action: "H", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "4", name: "TCS", exchange: "NSE", action: "B", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "5", name: "ICICIBANK", exchange: "NSE", action: "B", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "6", name: "SBIN", exchange: "NSE", action: "S", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "7", name: "BAJFINANCE", exchange: "NSE", action: "S", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "8", name: "ITC", exchange: "NSE", action: "B", price: "₹25,056.90", change: "-112.60 (-0.45%)" },
    { id: "9", name: "INFY", exchange: "NSE", action: "S", price: "₹1145.90", change: "-112.60 (-0.45%)" },
    { id: "10", name: "WIPRO", exchange: "NSE", action: "B", price: "₹740.90", change: "-112.60 (-0.45%)" },
  ];

  const renderStock = ({ item }: any) => {
    let actionColor =
      item.action === "B"
        ? "green"
        : item.action === "S"
        ? "red"
        : "#e58e26"; // orange for Hold

    return (
      <View style={styles.stockRow}>
        <View style={styles.circle} />
        <View style={{ flex: 1 }}>
          <Text style={styles.stockName}>{item.name}</Text>
          <Text style={styles.exchange}>{item.exchange}</Text>
        </View>
        <Text style={[styles.action, { color: actionColor }]}>{item.action}</Text>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.price}>{item.price}</Text>
          <Text
            style={[
              styles.change,
              { color: item.action === "S" ? "red" : "green" },
            ]}
          >
            {item.change}
          </Text>
        </View>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Ionicons name="bookmark-outline" size={20} color="green" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="view-dashboard" size={28} color="#123530" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>My Watchlist</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>
{/* AI Chat Section - fixed at bottom right */}
       <TouchableOpacity style={[styles.aiButton, { position: 'absolute', bottom: 20, right: 20 }]}>
        <View style={styles.aiInner}>
          <View style={styles.aiIconContainer}>
            <MaterialIcons name="smart-toy" size={38} color="#123530" />
          </View>
          <Text style={styles.aiButtonTitle}>chat with ai</Text>
        </View>
      </TouchableOpacity>
      {/* Legend */}
      <View style={styles.legend}>
  <Text style={[styles.legendText, styles.buy]}>B BUY</Text>
  <Text style={[styles.legendText, styles.sell]}>S SELL</Text>
  <Text style={[styles.legendText, styles.hold]}>H HOLD</Text>
</View>


      {/* Stock List */}
      <FlatList
        data={stocks}
        renderItem={renderStock}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 38,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 16,
    marginVertical: 16,
    color: "#123530",
  marginBottom: 26,

  },
  tabRow: {
  flexDirection: "row",
  justifyContent: "space-between", // spreads tabs equally
  marginHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
  paddingBottom: 0, // keeps spacing above the border
  marginBottom: 16,
},
tab: {
  alignItems: "center",
  flex: 1, // each tab takes equal width
},

  tabText: { fontSize: 14, color: "gray" },
  activeTabText: { color: "black", fontWeight: "bold"  },
  activeLine: {
    height: 2,
    backgroundColor: "green",
    marginTop: 4,
    width: "100%",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    paddingHorizontal: 16,
  },

legendText: {
  marginLeft: 20,
  fontWeight: "600",
  fontSize: 13,
},
buy: {
  color: "green",
},
sell: {
  color: "red",
},
hold: {
  color: "#e58e26", // orange
},

  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  stockName: { fontWeight: "600", fontSize: 14 },
  exchange: { fontSize: 12, color: "gray" },
  action: { fontWeight: "bold", marginRight: 12 },
  price: { fontWeight: "600", fontSize: 14 },
  change: { fontSize: 12 },

  aiButton: {
    zIndex: 10,
  },
 aiInner: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ffffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  aiButtonTitle: {
    fontSize: 10,
    fontFamily: 'Bree',
    fontWeight: '600',
    color: '#123530',
    textTransform: 'lowercase',
  },
  aiIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    // backgroundColor: '#0f3d2a',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
