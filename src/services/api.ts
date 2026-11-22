import { CoinData, GlobalMarketData } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`CoinGecko request failed (${response.status} ${response.statusText})`);
  }

  return response.json() as Promise<T>;
}

export const fetchGlobalMarket = async (): Promise<GlobalMarketData> => {
  const response = await requestJson<{ data: GlobalMarketData }>(`${BASE_URL}/global`);
  return response.data;
};

export const fetchTopCoins = (limit = 50): Promise<CoinData[]> =>
  requestJson<CoinData[]>(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&price_change_percentage=24h`
  );

export const fetchGainers = (limit = 20): Promise<CoinData[]> =>
  requestJson<CoinData[]>(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=${limit}&page=1&price_change_percentage=24h`
  );

export const fetchLosers = (limit = 20): Promise<CoinData[]> =>
  requestJson<CoinData[]>(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_asc&per_page=${limit}&page=1&price_change_percentage=24h`
  );
