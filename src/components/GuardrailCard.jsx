import React, { useState } from 'react';
import { Shield, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const GuardrailCard = ({ userSettings, onUpdateLimits }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLimits, setTempLimits] = useState({
    dailyLossLimit: userSettings.dailyLossLimit,
    weeklyLossLimit: userSettings.weeklyLossLimit,
  });

  const dailyUsagePercent = (userSettings.currentDailyLoss / userSettings.dailyLossLimit) * 100;
  const weeklyUsagePercent = (userSettings.currentWeeklyLoss / userSettings.weeklyLossLimit) * 100;

  const handleSave = () => {
    onUpdateLimits(tempLimits);
    setIsEditing(false);
  };

  const getStatusColor = (percent) => {
    if (percent >= 90) return 'danger';
    if (percent >= 70) return 'warning';
    return 'primary';
  };

  const getStatusIcon = () => {
    if (userSettings.isPaused) return AlertTriangle;
    if (dailyUsagePercent >= 90 || weeklyUsagePercent >= 90) return AlertTriangle;
    return CheckCircle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            userSettings.isPaused ? 'bg-danger/20 text-danger' : 'bg-primary/20 text-primary'
          }`}>
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-h2">Loss Guardrails</h3>
            <p className="text-caption">Auto-pause protection active</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary p-2"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Daily Loss Limit (SOL)</label>
            <input
              type="number"
              step="0.1"
              value={tempLimits.dailyLossLimit}
              onChange={(e) => setTempLimits(prev => ({ ...prev, dailyLossLimit: parseFloat(e.target.value) }))}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Weekly Loss Limit (SOL)</label>
            <input
              type="number"
              step="0.1"
              value={tempLimits.weeklyLossLimit}
              onChange={(e) => setTempLimits(prev => ({ ...prev, weeklyLossLimit: parseFloat(e.target.value) }))}
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex space-x-2">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Daily Usage</span>
                <span className="text-mono text-sm">
                  {userSettings.currentDailyLoss.toFixed(2)} / {userSettings.dailyLossLimit.toFixed(2)} SOL
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getStatusColor(dailyUsagePercent) === 'danger' ? 'bg-danger' :
                    getStatusColor(dailyUsagePercent) === 'warning' ? 'bg-warning' :
                    'bg-primary'
                  }`}
                  style={{ width: `${Math.min(dailyUsagePercent, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-textSecondary mt-1">
                {dailyUsagePercent.toFixed(1)}% of daily limit used
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weekly Usage</span>
                <span className="text-mono text-sm">
                  {userSettings.currentWeeklyLoss.toFixed(2)} / {userSettings.weeklyLossLimit.toFixed(2)} SOL
                </span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getStatusColor(weeklyUsagePercent) === 'danger' ? 'bg-danger' :
                    getStatusColor(weeklyUsagePercent) === 'warning' ? 'bg-warning' :
                    'bg-primary'
                  }`}
                  style={{ width: `${Math.min(weeklyUsagePercent, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-textSecondary mt-1">
                {weeklyUsagePercent.toFixed(1)}% of weekly limit used
              </p>
            </div>
          </div>

          <div className={`flex items-center space-x-2 p-3 rounded-lg ${
            userSettings.isPaused ? 'bg-danger/10 border border-danger/20' :
            dailyUsagePercent >= 90 || weeklyUsagePercent >= 90 ? 'bg-warning/10 border border-warning/20' :
            'bg-primary/10 border border-primary/20'
          }`}>
            <StatusIcon className={`w-5 h-5 ${
              userSettings.isPaused ? 'text-danger' :
              dailyUsagePercent >= 90 || weeklyUsagePercent >= 90 ? 'text-warning' :
              'text-primary'
            }`} />
            <span className="text-sm font-medium">
              {userSettings.isPaused ? 'Trading Paused - Limits Exceeded' :
               dailyUsagePercent >= 90 || weeklyUsagePercent >= 90 ? 'Approaching Loss Limit' :
               'Protection Active'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardrailCard;