import { CoinData, GlobalMarketData } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchGlobalMarket = async (): Promise<GlobalMarketData> => {
  const response = await fetch(`${BASE_URL}/global`);
  const data = await response.json();
  return data.data;
};

export const fetchTopCoins = async (limit = 50): Promise<CoinData[]> => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&price_change_percentage=24h`
  );
  return response.json();
};

export const fetchGainers = async (limit = 20): Promise<CoinData[]> => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=${limit}&page=1&price_change_percentage=24h`
  );
  return response.json();
};

export const fetchLosers = async (limit = 20): Promise<CoinData[]> => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_asc&per_page=${limit}&page=1&price_change_percentage=24h`
  );
  return response.json();
};
