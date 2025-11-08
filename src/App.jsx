import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GuardrailCard from './components/GuardrailCard';
import SentimentPulse from './components/SentimentPulse';
import SocialTradingFeed from './components/SocialTradingFeed';
import BacktestLab from './components/BacktestLab';
import { usePaymentContext } from './hooks/usePaymentContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userSettings, setUserSettings] = useState({
    dailyLossLimit: 0.5,
    weeklyLossLimit: 2.0,
    currentDailyLoss: 0.12,
    currentWeeklyLoss: 0.45,
    isPaused: false,
    rugPullFilter: true,
  });

  const [sentimentData, setSentimentData] = useState([
    { symbol: 'BONK', score: 82, mentions: 340, change: '+15%', price: '$0.000012' },
    { symbol: 'WIF', score: 76, mentions: 180, change: '+8%', price: '$2.34' },
    { symbol: 'PEPE', score: 68, mentions: 220, change: '-3%', price: '$0.0000089' },
    { symbol: 'SHIB', score: 45, mentions: 95, change: '-12%', price: '$0.0000078' },
  ]);

  const { createSession } = usePaymentContext();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentData(prev => prev.map(token => ({
        ...token,
        score: Math.max(0, Math.min(100, token.score + (Math.random() - 0.5) * 10)),
        mentions: Math.max(0, token.mentions + Math.floor((Math.random() - 0.5) * 50)),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLossLimitUpdate = (newLimits) => {
    setUserSettings(prev => ({ ...prev, ...newLimits }));
  };

  const handleTrade = async (token, amount, type) => {
    try {
      await createSession();
      // Simulate trade execution
      const tradeAmount = type === 'buy' ? amount : -amount;
      setUserSettings(prev => ({
        ...prev,
        currentDailyLoss: Math.max(0, prev.currentDailyLoss + (tradeAmount < 0 ? Math.abs(tradeAmount) : 0)),
        currentWeeklyLoss: Math.max(0, prev.currentWeeklyLoss + (tradeAmount < 0 ? Math.abs(tradeAmount) : 0)),
      }));
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <Dashboard userSettings={userSettings} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GuardrailCard 
                userSettings={userSettings}
                onUpdateLimits={handleLossLimitUpdate}
              />
              
              <div className="space-y-4">
                <h2 className="text-h2">Sentiment Alerts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sentimentData.slice(0, 4).map((token) => (
                    <SentimentPulse
                      key={token.symbol}
                      token={token}
                      onTrade={handleTrade}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <SocialTradingFeed onCopyTrade={handleTrade} />
        )}

        {activeTab === 'backtest' && (
          <BacktestLab />
        )}
      </main>
    </div>
  );
}

export default App;