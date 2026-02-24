import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { GlobalMarketData } from '../types/crypto';
import { formatCurrency } from '../utils/format';

interface MarketStatsProps {
  data: GlobalMarketData | null;
}

export default function MarketStats({ data }: MarketStatsProps) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const marketCapChange = data.market_cap_change_percentage_24h_usd || 0;
  const isPositive = marketCapChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Total Market Cap</h3>
          <DollarSign className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(data.total_market_cap.usd)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">24h Volume</h3>
          <BarChart3 className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {formatCurrency(data.total_volume.usd)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">BTC Dominance</h3>
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-xs font-bold text-orange-500">₿</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {data.market_cap_percentage.btc.toFixed(2)}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Market Change</h3>
          {isPositive ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
        </div>
        <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{marketCapChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
