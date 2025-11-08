import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Eye, DollarSign } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const SentimentPulse = () => {
  const [paid, setPaid] = useState(false);
  const { createSession } = usePaymentContext();

  const signals = [
    {
      symbol: 'BONK',
      name: 'Bonk',
      score: 92,
      trend: 'bullish',
      mentions: 1247,
      volume: '+340%',
      price: 0.000012,
      change: 15.7,
      risk: 'low',
      timeframe: '1h',
    },
    {
      symbol: 'PEPE',
      name: 'Pepe',
      score: 87,
      trend: 'bullish',
      mentions: 892,
      volume: '+180%',
      price: 0.0000089,
      change: 23.1,
      risk: 'low',
      timeframe: '2h',
    },
    {
      symbol: 'WIF',
      name: 'dogwifhat',
      score: 34,
      trend: 'bearish',
      mentions: 456,
      volume: '-45%',
      price: 2.34,
      change: -8.2,
      risk: 'medium',
      timeframe: '30m',
    },
    {
      symbol: 'SHIB',
      name: 'Shiba Inu',
      score: 76,
      trend: 'bullish',
      mentions: 678,
      volume: '+120%',
      price: 0.0000087,
      change: 12.4,
      risk: 'low',
      timeframe: '45m',
    },
  ];

  const handleViewSignal = async (signal) => {
    if (!paid) {
      try {
        await createSession();
        setPaid(true);
      } catch (error) {
        console.error('Payment failed:', error);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-danger/10';
  };

  const getTrendIcon = (trend) => {
    return trend === 'bullish' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend) => {
    return trend === 'bullish' ? 'text-success' : 'text-danger';
  };

  if (!paid) {
    return (
      <div className="space-y-6">
        <div className="card-elevated text-center">
          <div className="mb-6">
            <div className="bg-accent p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-textPrimary mb-2">Sentiment Signals</h2>
            <p className="text-textSecondary">
              Get real-time alerts when memecoins start trending
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Twitter velocity tracking</span>
              <span className="text-primary">✓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Farcaster cast monitoring</span>
              <span className="text-primary">✓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Volume spike detection</span>
              <span className="text-primary">✓</span>
            </div>
          </div>

          <button
            onClick={handleViewSignal}
            className="w-full btn-primary py-3 text-lg font-semibold"
          >
            Unlock Signals - $0.50 each
          </button>
        </div>

        {/* Preview signals (blurred) */}
        <div className="space-y-4 filter blur-sm pointer-events-none">
          {signals.slice(0, 2).map((signal, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{signal.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-textPrimary">{signal.symbol}</div>
                    <div className="text-sm text-textSecondary">{signal.name}</div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(signal.score)}`}>
                  {signal.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-textPrimary">Sentiment Signals</h2>
          <p className="text-textSecondary">Real-time memecoin buzz tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-textSecondary">Live</span>
        </div>
      </div>

      {/* Signal Cards */}
      <div className="space-y-4">
        {signals.map((signal, index) => {
          const TrendIcon = getTrendIcon(signal.trend);
          
          return (
            <div key={index} className={`card hover:bg-surfaceElevated transition-all duration-200 ${
              signal.score >= 80 ? 'ring-1 ring-success/30 shadow-glow' : ''
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{signal.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-textPrimary">{signal.symbol}</div>
                    <div className="text-sm text-textSecondary">{signal.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(signal.score)}`}>
                    {signal.score}
                  </div>
                  <div className="text-xs text-textSecondary">Sentiment</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-textSecondary">Mentions</div>
                  <div className="font-semibold text-textPrimary">{signal.mentions}</div>
                  <div className="text-xs text-textSecondary">{signal.timeframe}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-textSecondary">Volume</div>
                  <div className={`font-semibold ${signal.volume.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    {signal.volume}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-textSecondary">Price</div>
                  <div className="font-mono text-textPrimary">${signal.price.toFixed(6)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-textSecondary">24h Change</div>
                  <div className={`font-semibold flex items-center justify-center space-x-1 ${getTrendColor(signal.trend)}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{Math.abs(signal.change).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium ${getScoreColor(signal.score)} ${getScoreBg(signal.score)}`}>
                    {signal.trend.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium ${
                    signal.risk === 'low' ? 'text-success bg-success/10' : 
                    signal.risk === 'medium' ? 'text-warning bg-warning/10' : 
                    'text-danger bg-danger/10'
                  }`}>
                    {signal.risk.toUpperCase()} RISK
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm px-3 py-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Watch
                  </button>
                  <button className="btn-primary text-sm px-3 py-1">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Trade
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Settings */}
      <div className="card-elevated">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Alert Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-textPrimary">High Sentiment Alerts</div>
              <div className="text-sm text-textSecondary">Score ≥ 80</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-textPrimary">Volume Spike Alerts</div>
              <div className="text-sm text-textSecondary">Volume increase ≥ 200%</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-textPrimary">Risk Warnings</div>
              <div className="text-sm text-textSecondary">High-risk token alerts</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPulse;