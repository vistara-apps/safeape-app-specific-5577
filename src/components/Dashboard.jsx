import React from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle, DollarSign } from 'lucide-react';
import TradingChart from './TradingChart';
import PositionCard from './PositionCard';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total PnL',
      value: '+1.23 SOL',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Win Rate',
      value: '68%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Protected',
      value: '15.7 SOL',
      change: 'Active',
      trend: 'neutral',
      icon: Shield,
    },
    {
      label: 'Alerts Today',
      value: '7',
      change: '3 acted on',
      trend: 'neutral',
      icon: AlertTriangle,
    },
  ];

  const positions = [
    {
      symbol: 'BONK',
      name: 'Bonk',
      price: 0.000012,
      change: 15.7,
      position: 0.5,
      pnl: 0.078,
      risk: 'low',
    },
    {
      symbol: 'WIF',
      name: 'dogwifhat',
      price: 2.34,
      change: -8.2,
      position: 0.3,
      pnl: -0.025,
      risk: 'medium',
    },
    {
      symbol: 'PEPE',
      name: 'Pepe',
      price: 0.0000089,
      change: 23.1,
      position: 0.8,
      pnl: 0.184,
      risk: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-textSecondary" />
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-danger" />}
              </div>
              <div className="text-2xl font-bold text-textPrimary mb-1">
                {stat.value}
              </div>
              <div className={`text-sm ${
                stat.trend === 'up' ? 'text-success' : 
                stat.trend === 'down' ? 'text-danger' : 
                'text-textSecondary'
              }`}>
                {stat.change}
              </div>
              <div className="text-xs text-textSecondary mt-1">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trading Chart */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-textPrimary">Portfolio Performance</h2>
          <div className="flex space-x-2">
            <button className="text-xs px-3 py-1 bg-primary text-white rounded-md">24H</button>
            <button className="text-xs px-3 py-1 text-textSecondary hover:text-textPrimary">7D</button>
            <button className="text-xs px-3 py-1 text-textSecondary hover:text-textPrimary">30D</button>
          </div>
        </div>
        <TradingChart />
      </div>

      {/* Active Positions */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-textPrimary">Active Positions</h2>
          <button className="text-sm text-primary hover:text-primaryHover">View All</button>
        </div>
        <div className="space-y-3">
          {positions.map((position, index) => (
            <PositionCard key={index} position={position} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="card hover:bg-surfaceElevated transition-colors duration-200 text-left">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-textPrimary">Quick Buy</div>
              <div className="text-sm text-textSecondary">Trade trending tokens</div>
            </div>
          </div>
        </button>
        
        <button className="card hover:bg-surfaceElevated transition-colors duration-200 text-left">
          <div className="flex items-center space-x-3">
            <div className="bg-warning p-2 rounded-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-textPrimary">Set Limits</div>
              <div className="text-sm text-textSecondary">Configure guardrails</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;