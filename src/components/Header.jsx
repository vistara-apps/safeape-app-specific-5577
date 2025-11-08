import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, TrendingUp, Users, FlaskConical } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'social', label: 'Social Feed', icon: Users },
    { id: 'backtest', label: 'Backtest Lab', icon: FlaskConical },
  ];

  return (
    <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦍</span>
              </div>
              <h1 className="text-h2 font-bold">SafeApe</h1>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span className="text-textSecondary">SOL Balance:</span>
              <span className="font-mono text-primary">2.45 SOL</span>
            </div>
            <ConnectButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <nav className="flex space-x-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;