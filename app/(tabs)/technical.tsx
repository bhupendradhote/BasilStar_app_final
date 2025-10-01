import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Theme from '@/constants/theme';

type Stock = {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
  signal: string;
  keyLevel: string;
  target1: string;
  target2: string;
  stoploss1: string;
  stoploss2: string;
};

const dummyStocks: Stock[] = [
  {
    id: '1',
    name: 'Honasa Consumer Limited',
    symbol: 'HONASA.NS',
    price: '₹1205.50',
    change: '-12.5 (1.05%)',
    signal: 'Strong Sell',
    keyLevel: '₹1200',
    target1: '₹1240',
    target2: '₹1270',
    stoploss1: '₹1190',
    stoploss2: '₹1180',
  },
  {
    id: '2',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: '$178.50',
    change: '+2.5 (1.42%)',
    signal: 'Buy',
    keyLevel: '$178',
    target1: '$182',
    target2: '$185',
    stoploss1: '$176',
    stoploss2: '$174',
  },
  // Add more stocks as needed
];

export default function TechnicalScreen() {
  const colorScheme = useColorScheme();
  const colors =
    colorScheme === 'dark' ? Theme.Colors.dark : Theme.Colors.light;

  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  // Filter stocks based on search
  const filteredStocks = dummyStocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const renderStockItem = ({ item }: { item: Stock }) => (
    <TouchableOpacity
      style={[styles.dropdownItem, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f2f2f2' }]}
      onPress={() => {
        setSelectedStock(item);
        setSearch(item.name); // Fill search bar with selected stock
      }}
    >
      <Text style={[styles.stockName, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.stockSymbol, { color: colors.icon }]}>{item.symbol}</Text>
    </TouchableOpacity>
  );

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
          onChangeText={(text) => {
            setSearch(text);
            setSelectedStock(null); // Clear selected stock while typing
          }}
        />
        <Ionicons
          name="search"
          size={20}
          color={colors.text}
          style={styles.searchIcon}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => {
            setSearch('');
            setSelectedStock(null);
          }}>
            <Ionicons name="close-circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Dropdown List */}
      {search.length > 0 && !selectedStock && (
        <FlatList
          data={filteredStocks}
          keyExtractor={(item) => item.id}
          renderItem={renderStockItem}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Stock Details */}
      {selectedStock && (
        <ScrollView style={styles.detailsContainer}>
          <Text style={[styles.stockTitle, { color: colors.text }]}>
            {selectedStock.name} ({selectedStock.symbol})
          </Text>
          <Text style={[styles.signalText, { color: colors.icon }]}>{selectedStock.signal}</Text>
          <Text style={[styles.priceText, { color: colors.text }]}>
            {selectedStock.price} {selectedStock.change}
          </Text>

          <View style={styles.sectionBox}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Key Level</Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>{selectedStock.keyLevel}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Targets</Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>Target 1: {selectedStock.target1}</Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>Target 2: {selectedStock.target2}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={[styles.sectionHeading, { color: colors.text }]}>Stoploss</Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>Stoploss 1: {selectedStock.stoploss1}</Text>
            <Text style={[styles.sectionValue, { color: colors.text }]}>Stoploss 2: {selectedStock.stoploss2}</Text>
          </View>

          {/* Add more sections like News, Technical, Dashboard, Fundamental as needed */}
        </ScrollView>
      )}
      {/* AI Chat Section - fixed at bottom right */}
             <TouchableOpacity style={[styles.aiButton, { position: 'absolute', bottom: 20, right: 20 }]}>
              <View style={styles.aiInner}>
                <View style={styles.aiIconContainer}>
                  <MaterialIcons name="smart-toy" size={38} color="#123530" />
                </View>
                <Text style={styles.aiButtonTitle}>chat with ai</Text>
              </View>
            </TouchableOpacity>
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
  },
  stockName: {
    fontSize: 16,
    fontWeight: '500',
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '400',
  },
  detailsContainer: {
    marginTop: 16,
  },
  stockTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  signalText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  sectionBox: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 14,
    fontWeight: '400',
  },
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
