import { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, TrendingDown, BarChart3, Shield } from 'lucide-react';
import MarketStats from './MarketStats';
import CoinTable from './CoinTable';
import CoinCard from './CoinCard';
import { GlobalMarketData, CoinData } from '../types/crypto';
import { fetchGlobalMarket, fetchTopCoins, fetchGainers, fetchLosers } from '../services/api';

type TabType = 'market' | 'gainers' | 'losers';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const [globalData, setGlobalData] = useState<GlobalMarketData | null>(null);
  const [topCoins, setTopCoins] = useState<CoinData[]>([]);
  const [gainers, setGainers] = useState<CoinData[]>([]);
  const [losers, setLosers] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [global, top, topGainers, topLosers] = await Promise.all([
        fetchGlobalMarket(),
        fetchTopCoins(50),
        fetchGainers(20),
        fetchLosers(20),
      ]);

      setGlobalData(global);
      setTopCoins(top);
      setGainers(topGainers);
      setLosers(topLosers);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadData();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Crypto Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  autoRefresh
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
              </button>
              <button
                onClick={loadData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Real-time cryptocurrency market data powered by CoinGecko</p>
            <a 
              href="/admin" 
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </a>
          </div>
        </div>

        <MarketStats data={globalData} />

        <div className="mb-6">
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'market'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Top 50 Market</span>
              </div>
              {activeTab === 'market' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('gainers')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'gainers'
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Top Gainers</span>
              </div>
              {activeTab === 'gainers' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`px-6 py-3 font-medium transition-colors relative ${
                activeTab === 'losers'
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4" />
                <span>Top Losers</span>
              </div>
              {activeTab === 'losers' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'market' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 50 Cryptocurrencies</h2>
            <CoinTable coins={topCoins} loading={loading} />
          </div>
        )}

        {activeTab === 'gainers' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Top 20 Gainers (24h)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? [...Array(20)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))
                : gainers.map((coin, index) => (
                    <CoinCard key={coin.id} coin={coin} rank={index + 1} />
                  ))}
            </div>
          </div>
        )}

        {activeTab === 'losers' && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Top 20 Losers (24h)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? [...Array(20)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                      <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                  ))
                : losers.map((coin, index) => (
                    <CoinCard key={coin.id} coin={coin} rank={index + 1} />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
