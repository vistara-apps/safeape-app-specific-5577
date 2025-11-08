import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, ShoppingCart } from 'lucide-react';

const SentimentPulse = ({ token, onTrade }) => {
  const [isTrading, setIsTrading] = useState(false);

  const getSentimentColor = (score) => {
    if (score >= 75) return 'primary';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  const getSentimentLabel = (score) => {
    if (score >= 75) return 'Bullish';
    if (score >= 50) return 'Neutral';
    return 'Bearish';
  };

  const handleQuickBuy = async () => {
    setIsTrading(true);
    try {
      await onTrade(token.symbol, 0.1, 'buy');
    } catch (error) {
      console.error('Trade failed:', error);
    } finally {
      setIsTrading(false);
    }
  };

  const sentimentColor = getSentimentColor(token.score);
  const isPositive = token.change.startsWith('+');

  return (
    <div className={`card p-4 transition-all duration-300 hover:shadow-glow ${
      token.score >= 75 ? 'border-primary/30' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">{token.symbol}</span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            sentimentColor === 'primary' ? 'bg-primary/20 text-primary' :
            sentimentColor === 'warning' ? 'bg-warning/20 text-warning' :
            'bg-danger/20 text-danger'
          }`}>
            {getSentimentLabel(token.score)}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-primary" />
          ) : (
            <TrendingDown className="w-4 h-4 text-danger" />
          )}
          <span className={`text-sm font-medium ${
            isPositive ? 'text-primary' : 'text-danger'
          }`}>
            {token.change}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-caption">Sentiment Score</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-surface rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  sentimentColor === 'primary' ? 'bg-primary' :
                  sentimentColor === 'warning' ? 'bg-warning' :
                  'bg-danger'
                } ${token.score >= 75 ? 'animate-pulse-glow' : ''}`}
                style={{ width: `${token.score}%` }}
              ></div>
            </div>
            <span className="text-mono text-sm font-bold">{token.score}/100</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-caption">Mentions (1h)</span>
          <span className="text-mono text-sm">{token.mentions}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-caption">Price</span>
          <span className="text-mono text-sm font-medium">{token.price}</span>
        </div>

        <div className="pt-2 border-t border-border">
          <button
            onClick={handleQuickBuy}
            disabled={isTrading || token.score < 60}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              token.score >= 75 ? 'btn-primary shadow-glow' :
              token.score >= 60 ? 'btn-primary' :
              'bg-surface text-textSecondary cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              {isTrading ? 'Trading...' : 
               token.score < 60 ? 'Low Signal' : 
               'Quick Buy 0.1 SOL'}
            </span>
          </button>
        </div>

        {token.score < 60 && (
          <div className="flex items-center space-x-2 p-2 bg-warning/10 border border-warning/20 rounded-md">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-xs text-warning">Low sentiment - trade with caution</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentPulse;