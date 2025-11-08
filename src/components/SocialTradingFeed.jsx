import React, { useState } from 'react';
import { Copy, TrendingUp, Clock, Award, Users } from 'lucide-react';

const SocialTradingFeed = ({ onCopyTrade }) => {
  const [selectedTrader, setSelectedTrader] = useState(null);

  const topTraders = [
    {
      id: 4729,
      winRate: 71,
      weeklyReturn: 127,
      totalTrades: 14,
      avgHoldTime: 4.2,
      strategy: 'Aggressive Scalp',
      recentTrades: [
        { token: 'BONK', entry: '$0.000011', exit: '$0.000015', pnl: '+36%', duration: '2.1h' },
        { token: 'WIF', entry: '$2.20', exit: '$2.65', pnl: '+20%', duration: '6.3h' },
        { token: 'PEPE', entry: '$0.0000082', exit: '$0.0000078', pnl: '-5%', duration: '1.8h' },
      ],
      followers: 234,
      badge: 'Diamond Hands 💎',
    },
    {
      id: 8156,
      winRate: 68,
      weeklyReturn: 89,
      totalTrades: 9,
      avgHoldTime: 12.7,
      strategy: 'Swing Hold',
      recentTrades: [
        { token: 'SHIB', entry: '$0.0000075', exit: '$0.0000089', pnl: '+19%', duration: '18.2h' },
        { token: 'DOGE', entry: '$0.082', exit: '$0.095', pnl: '+16%', duration: '24.1h' },
      ],
      followers: 156,
      badge: 'Steady Gains 📈',
    },
    {
      id: 2341,
      winRate: 64,
      weeklyReturn: 76,
      totalTrades: 21,
      avgHoldTime: 1.8,
      strategy: 'Quick Flip',
      recentTrades: [
        { token: 'FLOKI', entry: '$0.000028', exit: '$0.000032', pnl: '+14%', duration: '45m' },
        { token: 'MEME', entry: '$0.015', exit: '$0.017', pnl: '+13%', duration: '1.2h' },
        { token: 'WOJAK', entry: '$0.0012', exit: '$0.0011', pnl: '-8%', duration: '2.1h' },
      ],
      followers: 89,
      badge: 'Speed Demon ⚡',
    },
  ];

  const handleCopyTrader = async (trader) => {
    try {
      await onCopyTrade(trader.recentTrades[0].token, 0.2, 'copy');
      alert(`Now copying Trader #${trader.id}'s strategy!`);
    } catch (error) {
      console.error('Copy trade failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1">Social Trading Feed</h1>
          <p className="text-caption mt-1">
            Learn from winners in real-time
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-textSecondary">Following:</span>
          <span className="font-medium">3 traders</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {topTraders.map((trader) => (
          <div key={trader.id} className="card-elevated p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-h2">Trader #{trader.id}</h3>
                <p className="text-caption">{trader.badge}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">+{trader.weeklyReturn}%</div>
                <div className="text-caption">this week</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-surface rounded-lg">
                <div className="text-lg font-bold">{trader.winRate}%</div>
                <div className="text-caption">Win Rate</div>
              </div>
              <div className="text-center p-3 bg-surface rounded-lg">
                <div className="text-lg font-bold">{trader.totalTrades}</div>
                <div className="text-caption">Trades</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-caption">Strategy</span>
                <span className="text-sm font-medium">{trader.strategy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption">Avg Hold Time</span>
                <span className="text-sm font-medium">{trader.avgHoldTime}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption">Followers</span>
                <span className="text-sm font-medium">{trader.followers}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Trades</h4>
              <div className="space-y-1">
                {trader.recentTrades.slice(0, 2).map((trade, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-surface rounded">
                    <span className="font-mono">{trade.token}</span>
                    <span className={`font-medium ${
                      trade.pnl.startsWith('+') ? 'text-primary' : 'text-danger'
                    }`}>
                      {trade.pnl}
                    </span>
                    <span className="text-textSecondary text-xs">{trade.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTrader(trader)}
                className="btn-secondary flex-1 text-sm"
              >
                View Details
              </button>
              <button
                onClick={() => handleCopyTrader(trader)}
                className="btn-primary flex-1 text-sm flex items-center justify-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTrader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card-elevated max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h2">Trader #{selectedTrader.id} Details</h2>
              <button
                onClick={() => setSelectedTrader(null)}
                className="btn-secondary p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-surface rounded-lg">
                  <div className="text-xl font-bold text-primary">+{selectedTrader.weeklyReturn}%</div>
                  <div className="text-caption">Weekly Return</div>
                </div>
                <div className="text-center p-4 bg-surface rounded-lg">
                  <div className="text-xl font-bold">{selectedTrader.winRate}%</div>
                  <div className="text-caption">Win Rate</div>
                </div>
                <div className="text-center p-4 bg-surface rounded-lg">
                  <div className="text-xl font-bold">{selectedTrader.totalTrades}</div>
                  <div className="text-caption">Total Trades</div>
                </div>
                <div className="text-center p-4 bg-surface rounded-lg">
                  <div className="text-xl font-bold">{selectedTrader.avgHoldTime}h</div>
                  <div className="text-caption">Avg Hold</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">All Recent Trades</h3>
                <div className="space-y-2">
                  {selectedTrader.recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold">{trade.token}</span>
                        <div className="text-sm text-textSecondary">
                          {trade.entry} → {trade.exit}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`font-bold ${
                          trade.pnl.startsWith('+') ? 'text-primary' : 'text-danger'
                        }`}>
                          {trade.pnl}
                        </span>
                        <div className="flex items-center space-x-1 text-textSecondary text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{trade.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleCopyTrader(selectedTrader);
                  setSelectedTrader(null);
                }}
                className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy This Trader's Strategy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialTradingFeed;