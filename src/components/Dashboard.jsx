import React from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';

const Dashboard = ({ userSettings }) => {
  const stats = [
    {
      label: 'Total Protected',
      value: '12.8 SOL',
      change: '+2.3 SOL',
      trend: 'up',
      icon: Shield,
    },
    {
      label: 'Win Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Active Positions',
      value: '3',
      change: '+1',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Scams Blocked',
      value: '7',
      change: '+2',
      trend: 'neutral',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-h1">Trading Dashboard</h1>
          <p className="text-caption mt-1">
            AI guards your wallet while you sleep
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${userSettings.isPaused ? 'bg-danger' : 'bg-primary'} animate-pulse`}></div>
          <span className="text-sm font-medium">
            {userSettings.isPaused ? 'Trading Paused' : 'SafeGuard Active'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stat.trend === 'up' ? 'bg-primary/20 text-primary' :
                    stat.trend === 'down' ? 'bg-danger/20 text-danger' :
                    'bg-accent/20 text-accent'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-caption">{stat.label}</p>
                    <p className="text-h2 font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center space-x-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-primary" />
                ) : stat.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-danger" />
                ) : null}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-primary' :
                  stat.trend === 'down' ? 'text-danger' :
                  'text-textSecondary'
                }`}>
                  {stat.change}
                </span>
                <span className="text-textSecondary text-sm">this week</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;