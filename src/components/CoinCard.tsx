import { TrendingUp, TrendingDown } from 'lucide-react';
import { CoinData } from '../types/crypto';
import { formatPrice, formatPercentage } from '../utils/format';

interface CoinCardProps {
  coin: CoinData;
  rank: number;
}

export default function CoinCard({ coin, rank }: CoinCardProps) {
  const isPositive = (coin.price_change_percentage_24h || 0) >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-500">#{rank}</span>
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div>
            <div className="text-sm font-semibold text-gray-900">{coin.name}</div>
            <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">
          {formatPrice(coin.current_price)}
        </div>
        <div
          className={`inline-flex items-center px-2 py-1 rounded-md font-semibold text-sm ${
            isPositive
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {formatPercentage(coin.price_change_percentage_24h)}
        </div>
      </div>
    </div>
  );
}
