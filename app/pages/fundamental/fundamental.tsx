// screens/fundamentalScreen.tsx
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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Theme from '@/constants/theme';
import { getStockList } from '@/services/_fmpApi';
import OverviewScreen from '@/app/pages/fundamental/overviewTabScreen';
import CompanyProfileTabScreen from '@/app/pages/fundamental/companyProfileTabScreen';
import CorporateActionsScreen from './corporateActionsScreen';
import KeyMetricsTbScreen from './keyMetricsTbScreen';
import CashFlowTabScreen from './cashFlowTabScreen';
import TechnicalAnalysisTabScreen from './technicalAnalysisTabScreen';
import FundamentalAnalysisTabScreen from './fundamentalAnalysisTabScreen';

type StockItem = {
  symbol: string;
  companyName: string;
};

const tabs = [
  'Overview',
  'Fundamental Analysis',
  'Technical Analysis',
  'Key Metrics',
  'Cash Flow',
  'Corporate Actions',
  'Company Details',
];

export default function FundamentalScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Theme.Colors.dark : Theme.Colors.light;
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [filtered, setFiltered] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  // Fetch stock list on mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const data = await getStockList();
        setStocks(data);
        if (data.length > 0 && !selectedStock) {
          setSelectedStock(data[0].symbol);
        }
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={{ width: 24 }} /> 
      </View>
        <Text style={styles.headerTitle}>Fundamental</Text>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : colors.text }]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#1235300D' },
        ]}
      >
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Stock"
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={20} color={colors.text} style={styles.searchIcon} />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading State */}
      {loading && <ActivityIndicator size="large" color="#123530" />}

      {/* Search Results */}
      {filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedStock(item.symbol);
                setSearch('');
                setFiltered([]);
              }}
            >
              <Text style={[styles.stockName, { color: colors.text }]}>{item.companyName}</Text>
              <Text style={[styles.stockSymbol, { color: colors.icon }]}>{item.symbol}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 200, marginBottom: 8 }}
        />
      )}

      {/* Tab Content */}
      {selectedStock && (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'Overview' && <OverviewScreen symbol={selectedStock} />}
          {activeTab === 'Company Details' && <CompanyProfileTabScreen symbol={selectedStock} />}
          {activeTab === 'Corporate Actions' && <CorporateActionsScreen symbol={selectedStock} />}
          {activeTab === 'Key Metrics' && <KeyMetricsTbScreen symbol={selectedStock} />}
          {activeTab === 'Cash Flow' && <CashFlowTabScreen symbol={selectedStock} />}
          {activeTab === 'Technical Analysis' && <TechnicalAnalysisTabScreen symbol={selectedStock} />}
          {activeTab === 'Fundamental Analysis' && (
            <FundamentalAnalysisTabScreen symbol={selectedStock} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 ,paddingTop: 35},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  backButton: {
      marginRight: 12,
    backgroundColor: "#0d2622",
    padding: 6,
    borderRadius: 8,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#123530',
     paddingVertical: 12,
  },
  sectionHeader: { marginBottom: 8 },
  sectionTitle: { ...Theme.Typography.heading },
  tabsContainer: { marginBottom: 8, maxHeight: 40 },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
    marginRight: 6,
    height: 28,
    justifyContent: 'center',
  },
  activeTab: { backgroundColor: '#123530' },
  tabText: { fontSize: 12, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, borderRadius: 8, height: 40, fontSize: 16 },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
  },
  stockName: { fontSize: 16, fontWeight: '500' },
  stockSymbol: { fontSize: 14, fontWeight: '400' },
});
