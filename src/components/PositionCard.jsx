import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import RiskBadge from './RiskBadge';

const PositionCard = ({ position }) => {
  const isProfit = position.pnl > 0;
  
  return (
    <div className="flex items-center justify-between p-3 bg-surface border border-border rounded-md hover:bg-surfaceElevated transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{position.symbol.slice(0, 2)}</span>
        </div>
        <div>
          <div className="font-medium text-textPrimary">{position.symbol}</div>
          <div className="text-sm text-textSecondary">{position.name}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-mono text-textPrimary">
            ${position.price.toFixed(6)}
          </span>
          <div className={`flex items-center space-x-1 ${
            position.change > 0 ? 'text-success' : 'text-danger'
          }`}>
            {position.change > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs">{Math.abs(position.change).toFixed(1)}%</span>
          </div>
        </div>
        <div className="text-xs text-textSecondary">
          Position: {position.position} SOL
        </div>
      </div>

      <div className="text-right">
        <div className={`font-medium ${isProfit ? 'text-success' : 'text-danger'}`}>
          {isProfit ? '+' : ''}{position.pnl.toFixed(3)} SOL
        </div>
        <RiskBadge risk={position.risk} />
      </div>
    </div>
  );
};

export default PositionCard;