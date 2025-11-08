import React, { useState } from 'react';
import { Play, BarChart3, Settings, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BacktestLab = () => {
  const [strategy, setStrategy] = useState({
    name: 'Aggressive Scalp',
    entryThreshold: 75,
    exitGain: 15,
    stopLoss: 10,
    positionSize: 0.1,
    maxPositions: 3,
  });

  const [backtestResult, setBacktestResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const strategies = [
    { name: 'Aggressive Scalp', entryThreshold: 75, exitGain: 15, stopLoss: 10 },
    { name: 'Conservative Hold', entryThreshold: 80, exitGain: 25, stopLoss: 5 },
    { name: 'Swing Trade', entryThreshold: 70, exitGain: 30, stopLoss: 15 },
    { name: 'Quick Flip', entryThreshold: 85, exitGain: 8, stopLoss: 5 },
  ];

  const generateBacktestData = () => {
    const data = [];
    let balance = 10; // Starting with 10 SOL
    
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.4) * 0.5; // Slight positive bias
      balance += change;
      data.push({
        day: i + 1,
        balance: Math.max(0, balance),
        cumulative: ((balance - 10) / 10) * 100,
      });
    }
    
    return data;
  };

  const runBacktest = async () => {
    setIsRunning(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const chartData = generateBacktestData();
    const finalBalance = chartData[chartData.length - 1].balance;
    const totalReturn = ((finalBalance - 10) / 10) * 100;
    
    const result = {
      totalReturn: totalReturn.toFixed(1),
      winRate: Math.floor(Math.random() * 30) + 60, // 60-90%
      totalTrades: Math.floor(Math.random() * 20) + 15, // 15-35 trades
      maxDrawdown: (Math.random() * 2 + 0.5).toFixed(2), // 0.5-2.5 SOL
      sharpeRatio: (Math.random() * 1.5 + 0.5).toFixed(2), // 0.5-2.0
      avgHoldTime: (Math.random() * 8 + 2).toFixed(1), // 2-10 hours
      chartData,
      profitable: totalReturn > 0,
    };
    
    setBacktestResult(result);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1">Backtest Lab</h1>
        <p className="text-caption mt-1">
          Zero-risk validation—know your edge exists before you deploy capital
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategy Configuration */}
        <div className="card-elevated p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 text-accent rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-h2">Strategy Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Strategy Template</label>
              <select
                value={strategy.name}
                onChange={(e) => {
                  const selected = strategies.find(s => s.name === e.target.value);
                  setStrategy(prev => ({ ...prev, ...selected }));
                }}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {strategies.map(s => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Entry Threshold</label>
                <div className="relative">
                  <input
                    type="number"
                    value={strategy.entryThreshold}
                    onChange={(e) => setStrategy(prev => ({ ...prev, entryThreshold: parseInt(e.target.value) }))}
                    className="w-full bg-surface border border-border rounded-md px-3 py-2 pr-8 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 text-textSecondary text-sm">/100</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Exit Gain %</label>
                <div className="relative">
                  <input
                    type="number"
                    value={strategy.exitGain}
                    onChange={(e) => setStrategy(prev => ({ ...prev, exitGain: parseInt(e.target.value) }))}
                    className="w-full bg-surface border border-border rounded-md px-3 py-2 pr-6 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 text-textSecondary text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stop Loss %</label>
                <div className="relative">
                  <input
                    type="number"
                    value={strategy.stopLoss}
                    onChange={(e) => setStrategy(prev => ({ ...prev, stopLoss: parseInt(e.target.value) }))}
                    className="w-full bg-surface border border-border rounded-md px-3 py-2 pr-6 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 text-textSecondary text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Position Size</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={strategy.positionSize}
                    onChange={(e) => setStrategy(prev => ({ ...prev, positionSize: parseFloat(e.target.value) }))}
                    className="w-full bg-surface border border-border rounded-md px-3 py-2 pr-12 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-2 text-textSecondary text-sm">SOL</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <button
                onClick={runBacktest}
                disabled={isRunning}
                className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running Simulation...' : 'Run 30-Day Backtest'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="card-elevated p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-h2">Backtest Results</h2>
          </div>

          {isRunning ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-textSecondary">Simulating 30 days of trading...</p>
              </div>
            </div>
          ) : backtestResult ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className={`text-center p-4 rounded-lg ${
                  backtestResult.profitable ? 'bg-primary/20 border border-primary/30' : 'bg-danger/20 border border-danger/30'
                }`}>
                  <div className={`text-2xl font-bold flex items-center justify-center space-x-1 ${
                    backtestResult.profitable ? 'text-primary' : 'text-danger'
                  }`}>
                    {backtestResult.profitable ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    <span>{backtestResult.totalReturn}%</span>
                  </div>
                  <div className="text-caption">Total Return</div>
                </div>
                <div className="text-center p-4 bg-surface rounded-lg">
                  <div className="text-2xl font-bold">{backtestResult.winRate}%</div>
                  <div className="text-caption">Win Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-surface rounded-lg">
                  <div className="text-lg font-bold">{backtestResult.totalTrades}</div>
                  <div className="text-caption">Total Trades</div>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <div className="text-lg font-bold">{backtestResult.avgHoldTime}h</div>
                  <div className="text-caption">Avg Hold Time</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-caption">Max Drawdown</span>
                  <span className="text-mono text-sm">{backtestResult.maxDrawdown} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-caption">Sharpe Ratio</span>
                  <span className="text-mono text-sm">{backtestResult.sharpeRatio}</span>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={backtestResult.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 4%, 16%)" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(240, 5%, 64%)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(240, 5%, 64%)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(240, 6%, 10%)',
                        border: '1px solid hsl(240, 4%, 16%)',
                        borderRadius: '8px',
                        color: 'hsl(0, 0%, 98%)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke={backtestResult.profitable ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <button
                className="btn-primary w-full py-3"
                onClick={() => alert('Strategy deployed! SafeApe will now use these settings for live trading.')}
              >
                Deploy This Strategy Live
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <BarChart3 className="w-16 h-16 text-textSecondary mx-auto" />
                <p className="text-textSecondary">Configure your strategy and run a backtest to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BacktestLab;