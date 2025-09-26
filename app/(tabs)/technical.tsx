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
  changePercent: string;
  signal: string;
  keyLevel: string;
  target1: string;
  target2: string;
  stoploss1: string;
  stoploss2: string;
  isPositive: boolean;
};

const dummyStocks: Stock[] = [
  {
    id: '1',
    name: 'Honasa Consumer Limited',
    symbol: 'HONASA.NS',
    price: '₹1205.50',
    change: '-12.5',
    changePercent: '1.05%',
    signal: 'Strong Sell',
    keyLevel: '₹1200',
    target1: '₹1240',
    target2: '₹1270',
    stoploss1: '₹1190',
    stoploss2: '₹1180',
    isPositive: false,
  },
  {
    id: '2',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: '$178.50',
    change: '+2.5',
    changePercent: '1.42%',
    signal: 'Buy',
    keyLevel: '$178',
    target1: '$182',
    target2: '$185',
    stoploss1: '$176',
    stoploss2: '$174',
    isPositive: true,
  },
];

export default function TechnicalScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Theme.Colors.dark : Theme.Colors.light;

  const [search, setSearch] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(dummyStocks[0]);

  const filteredStocks = dummyStocks.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const renderStockItem = ({ item }: { item: Stock }) => (
    <TouchableOpacity
      style={[styles.dropdownItem, { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#f2f2f2' }]}
      onPress={() => {
        setSelectedStock(item);
        setSearch(item.name);
      }}
    >
      <Text style={[styles.stockName, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.stockSymbol, { color: colors.icon }]}>{item.symbol}</Text>
    </TouchableOpacity>
  );

  const getSignalColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'strong sell': return '#FF6B6B';
      case 'sell': return '#FF6B6B';
      case 'strong buy': return '#5EC385';
      case 'buy': return '#5EC385';
      case 'neutral': return '#F0C53A';
      default: return colors.icon;
    }
  };

  const getSignalBackgroundColor = (signal: string) => {
    switch (signal.toLowerCase()) {
      case 'strong sell': return '#FF6B6B';
      case 'sell': return '#FF6B6B';
      case 'strong buy': return '#5EC385';
      case 'buy': return '#5EC385';
      case 'neutral': return '#F0C53A';
      default: return colors.icon;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="chart-line" size={28} color={colors.text} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Technical Analysis</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colorScheme === 'dark' ? '#1a4330' : '#f8f9fa' }]}>
        <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Stock"
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            if (text.length === 0) setSelectedStock(null);
          }}
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
          style={styles.dropdownList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Stock Details */}
      {selectedStock && (
        <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
          {/* Stock Header */}
          <View style={styles.stockHeader}>
            <View>
              <Text style={[styles.stockNameLarge, { color: colors.text }]}>{selectedStock.name}</Text>
              <Text style={[styles.stockSymbolLarge, { color: colors.icon }]}>{selectedStock.symbol}</Text>
            </View>
           
          </View>

          {/* Strong Sell Button - Middle of Screen */}
          <TouchableOpacity style={[
            styles.signalButton, 
            { backgroundColor: getSignalBackgroundColor(selectedStock.signal) }
          ]}>
            <Text style={styles.signalButtonText}>{selectedStock.signal}</Text>
            <MaterialIcons 
              name={selectedStock.signal.toLowerCase().includes('sell') ? "trending-down" : "trending-up"} 
              size={20} 
              color="#ffffff" 
            />
          </TouchableOpacity>
 <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={[styles.priceText, { color: colors.text }]}>{selectedStock.price}</Text>
                <View style={styles.changeContainer}>
                  <MaterialIcons 
                    name={selectedStock.isPositive ? "arrow-upward" : "arrow-downward"} 
                    size={16} 
                    color={selectedStock.isPositive ? "#5EC385" : "#FF6B6B"} 
                  />
                  <Text style={[
                    styles.changeText, 
                    { color: selectedStock.isPositive ? "#5EC385" : "#FF6B6B" }
                  ]}>
                    {selectedStock.change} ({selectedStock.changePercent})
                  </Text>
                </View>
              </View>
            </View>
          {/* Key Levels Table */}
          <View style={styles.tableContainer}>
            <Text style={[styles.tableHeading, { color: colors.text }]}>Key Level</Text>
            <View style={[styles.table, { backgroundColor: colorScheme === 'dark' ? '#1a4330' : '#ffffff' }]}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Key Level</Text>
                <Text style={[styles.tableValue, { color: colors.text }]}>{selectedStock.keyLevel}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Market Sentiment</Text>
                <View style={styles.sentimentContainer}>
                  <Text style={[styles.sentimentText, { color: getSignalColor(selectedStock.signal) }]}>
                    {selectedStock.signal}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Targets Table */}
          <View style={styles.tableContainer}>
            <Text style={[styles.tableHeading, { color: colors.text }]}>Targets</Text>
            <View style={[styles.table, { backgroundColor: colorScheme === 'dark' ? '#1a4330' : '#ffffff' }]}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Target</Text>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Price</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Target 1</Text>
                <Text style={[styles.tableValue, { color: colors.text }]}>{selectedStock.target1}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Target 2</Text>
                <Text style={[styles.tableValue, { color: colors.text }]}>{selectedStock.target2}</Text>
              </View>
            </View>
          </View>

          {/* Stoploss Table */}
          <View style={styles.tableContainer}>
            <Text style={[styles.tableHeading, { color: colors.text }]}>Stoploss</Text>
            <View style={[styles.table, { backgroundColor: colorScheme === 'dark' ? '#1a4330' : '#ffffff' }]}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Stoploss</Text>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Price</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Stoploss 1</Text>
                <Text style={[styles.tableValue, { color: colors.text }]}>{selectedStock.stoploss1}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableLabel, { color: colors.icon }]}>Stoploss 2</Text>
                <Text style={[styles.tableValue, { color: colors.text }]}>{selectedStock.stoploss2}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
    marginBottom: 20,
    paddingTop: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Bree',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  dropdownList: {
    maxHeight: 200,
    marginBottom: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  stockName: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  stockSymbol: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  detailsContainer: {
    flex: 1,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  stockNameLarge: {
    fontSize: 18,
    fontFamily: 'Bree',
    fontWeight: '600',
    marginBottom: 4,
  },
  stockSymbolLarge: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#687076',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceRow: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 24,
    fontFamily: 'Bree',
    fontWeight: '700',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginLeft: 4,
  },
  signalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signalButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Bree',
    fontWeight: '700',
  },
  tableContainer: {
    marginBottom: 24,
  },
  tableHeading: {
    fontSize: 18,
    fontFamily: 'Bree',
    fontWeight: '600',
    marginBottom: 12,
  },
  table: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableLabel: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    flex: 1,
  },
  tableValue: {
    fontSize: 16,
    fontFamily: 'Bree',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  sentimentContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sentimentText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
});