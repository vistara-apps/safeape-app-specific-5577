import React, { useState } from 'react';
import { Shield, AlertTriangle, Settings, Play, Pause } from 'lucide-react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const GuardrailCard = () => {
  const [dailyLimit, setDailyLimit] = useState(0.5);
  const [weeklyLimit, setWeeklyLimit] = useState(2.0);
  const [isActive, setIsActive] = useState(true);
  const [currentDailyLoss, setCurrentDailyLoss] = useState(0.23);
  const [currentWeeklyLoss, setCurrentWeeklyLoss] = useState(0.67);
  const [paid, setPaid] = useState(false);

  const { createSession } = usePaymentContext();

  const dailyProgress = (currentDailyLoss / dailyLimit) * 100;
  const weeklyProgress = (currentWeeklyLoss / weeklyLimit) * 100;

  const handleActivateGuardrails = async () => {
    if (!paid) {
      try {
        await createSession();
        setPaid(true);
        setIsActive(true);
      } catch (error) {
        console.error('Payment failed:', error);
      }
    } else {
      setIsActive(!isActive);
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 50) return 'bg-success';
    if (progress < 80) return 'bg-warning';
    return 'bg-danger';
  };

  const getStatusConfig = () => {
    if (!isActive) {
      return {
        icon: Shield,
        color: 'text-textSecondary',
        bg: 'bg-surface',
        status: 'Inactive',
        description: 'Guardrails are disabled'
      };
    }
    
    if (dailyProgress >= 100 || weeklyProgress >= 100) {
      return {
        icon: AlertTriangle,
        color: 'text-danger',
        bg: 'bg-danger/10',
        status: 'Triggered',
        description: 'Trading paused - limits exceeded'
      };
    }
    
    if (dailyProgress >= 80 || weeklyProgress >= 80) {
      return {
        icon: AlertTriangle,
        color: 'text-warning',
        bg: 'bg-warning/10',
        status: 'Warning',
        description: 'Approaching loss limits'
      };
    }
    
    return {
      icon: Shield,
      color: 'text-success',
      bg: 'bg-success/10',
      status: 'Active',
      description: 'Protecting your wallet'
    };
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  if (!paid) {
    return (
      <div className="space-y-6">
        <div className="card-elevated text-center">
          <div className="mb-6">
            <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-textPrimary mb-2">SafeGuard Protection</h2>
            <p className="text-textSecondary">
              Activate AI-powered loss protection to trade with confidence
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Auto-pause on loss limits</span>
              <span className="text-primary">✓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Real-time monitoring</span>
              <span className="text-primary">✓</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface rounded-md">
              <span className="text-textSecondary">Instant notifications</span>
              <span className="text-primary">✓</span>
            </div>
          </div>

          <button
            onClick={handleActivateGuardrails}
            className="w-full btn-primary py-3 text-lg font-semibold"
          >
            Activate SafeGuard - $2/month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className={`card-elevated ${statusConfig.bg}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <StatusIcon className={`w-6 h-6 ${statusConfig.color}`} />
            <div>
              <h2 className="text-lg font-semibold text-textPrimary">SafeGuard Status</h2>
              <p className={`text-sm ${statusConfig.color}`}>{statusConfig.status}</p>
            </div>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`p-2 rounded-md transition-colors ${
              isActive ? 'bg-success text-white' : 'bg-surface text-textSecondary'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-textSecondary">{statusConfig.description}</p>
      </div>

      {/* Loss Limits Configuration */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">Loss Limits</h3>
          <Settings className="w-5 h-5 text-textSecondary" />
        </div>

        <div className="space-y-6">
          {/* Daily Limit */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-textPrimary">Daily Limit</label>
              <span className="text-sm text-textSecondary">{dailyLimit} SOL</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(parseFloat(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-textSecondary mb-1">
                <span>Used: {currentDailyLoss} SOL</span>
                <span>{dailyProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(dailyProgress)}`}
                  style={{ width: `${Math.min(dailyProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Weekly Limit */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-textPrimary">Weekly Limit</label>
              <span className="text-sm text-textSecondary">{weeklyLimit} SOL</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={weeklyLimit}
              onChange={(e) => setWeeklyLimit(parseFloat(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-textSecondary mb-1">
                <span>Used: {currentWeeklyLoss} SOL</span>
                <span>{weeklyProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(weeklyProgress)}`}
                  style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-elevated">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-textPrimary">Position auto-closed: WIF</span>
            </div>
            <span className="text-xs text-textSecondary">2 min ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-textPrimary">Warning: 80% daily limit</span>
            </div>
            <span className="text-xs text-textSecondary">15 min ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-textPrimary">SafeGuard activated</span>
            </div>
            <span className="text-xs text-textSecondary">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardrailCard;