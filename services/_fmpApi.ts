import axios from 'axios';

const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';
const FMP_API_KEY = 'pNfPaAqCCLW5TIyeNfmbJ9CaocjvSfNb'; // 🔑 Your API key

// Axios instance for FMP
const fmpApi = axios.create({
  baseURL: FMP_BASE_URL,
  timeout: 10000,
});

// Fetch latest news
export const getLatestNews = async (page: number = 0, limit: number = 20) => {
  try {
    const response = await fmpApi.get(
      `/news/general-latest?page=${page}&limit=${limit}&apikey=${FMP_API_KEY}`
    );
    return response.data;
  } catch (error: any) {
    console.error('FMP News API error:', error.message);
    throw error;
  }
};

// Fetch historical EOD prices for index (daily)
export const getHistoricalEOD = async (symbol: string) => {
  try {
    const response = await fmpApi.get(
      `/historical-price-eod/full?symbol=${symbol}&apikey=${FMP_API_KEY}`
    );
    return response.data.historical || response.data;
  } catch (error: any) {
    console.error('FMP Historical EOD API error:', error.message);
    throw error;
  }
};

// Fetch intraday chart (5min / 1hour)
export const getIntradayChart = async (symbol: string, interval: '5min' | '1hour') => {
  try {
    const response = await fmpApi.get(
      `/historical-chart/${interval}?symbol=${symbol}&apikey=${FMP_API_KEY}`
    );
    return response.data;
  } catch (error: any) {
    console.error('FMP Intraday Chart API error:', error.message);
    throw error;
  }
};

export default fmpApi;
