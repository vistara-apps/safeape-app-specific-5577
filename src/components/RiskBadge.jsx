import React from 'react';

const RiskBadge = ({ risk }) => {
  const getRiskConfig = (risk) => {
    switch (risk) {
      case 'low':
        return { color: 'text-success', bg: 'bg-success/10', label: 'Low Risk' };
      case 'medium':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'Medium' };
      case 'high':
        return { color: 'text-danger', bg: 'bg-danger/10', label: 'High Risk' };
      default:
        return { color: 'text-textSecondary', bg: 'bg-surface', label: 'Unknown' };
    }
  };

  const config = getRiskConfig(risk);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ${config.color} ${config.bg}`}>
      {config.label}
    </span>
  );
};

export default RiskBadge;