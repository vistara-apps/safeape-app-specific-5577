import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GuardrailCard from './components/GuardrailCard';
import SentimentPulse from './components/SentimentPulse';
import SocialTradingFeed from './components/SocialTradingFeed';
import BacktestLab from './components/BacktestLab';
import { Shield, TrendingUp, Users, BarChart3 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'guardrails', label: 'SafeGuard', icon: Shield },
    { id: 'sentiment', label: 'Signals', icon: BarChart3 },
    { id: 'social', label: 'Social', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'guardrails':
        return <GuardrailCard />;
      case 'sentiment':
        return <SentimentPulse />;
      case 'social':
        return <SocialTradingFeed />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Header />
      
      {/* Mobile-first navigation */}
      <nav className="sticky top-0 z-40 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Floating action button for quick trade */}
      <button className="fixed bottom-6 right-6 bg-primary hover:bg-primaryHover text-white p-4 rounded-full shadow-glow transition-all duration-200 z-50">
        <TrendingUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;