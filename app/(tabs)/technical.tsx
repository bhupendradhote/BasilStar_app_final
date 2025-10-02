import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '@/constants/theme';
import { getStockList } from '@/services/_fmpApi'; // 👈 import API function

type StockItem = {
  symbol: string;
  companyName: string;
};

export default function TechnicalScreen() {
  const colorScheme = useColorScheme();
  const colors =
    colorScheme === 'dark' ? Theme.Colors.dark : Theme.Colors.light;

  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [filtered, setFiltered] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch stock list on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const data = await getStockList();
        setStocks(data);
      } catch (err) {
        console.error('Error fetching stock list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  // Filter stocks based on search input
  useEffect(() => {
    if (search.length > 0) {
      const results = stocks.filter(
        (item) =>
          item.companyName?.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol?.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [search, stocks]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="view-dashboard"
          size={28}
          color="#123530"
        />
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="#123530" />
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Technical
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f2f2f2' },
        ]}
      >
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Stock"
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Ionicons
          name="search"
          size={20}
          color={colors.text}
          style={styles.searchIcon}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading State */}
      {loading && <ActivityIndicator size="large" color="#123530" />}

      {/* Search Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={[styles.stockName, { color: colors.text }]}>
              {item.companyName}
            </Text>
            <Text style={[styles.stockSymbol, { color: colors.icon }]}>
              {item.symbol}
            </Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
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
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    ...Theme.Typography.heading,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 1,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    height: 40,
    fontSize: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
  },
  stockName: {
    fontSize: 16,
    fontWeight: '500',
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '400',
  },
});
