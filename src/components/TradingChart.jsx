import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const TradingChart = () => {
  const data = [
    { time: '00:00', value: 2.45 },
    { time: '04:00', value: 2.52 },
    { time: '08:00', value: 2.48 },
    { time: '12:00', value: 2.67 },
    { time: '16:00', value: 2.71 },
    { time: '20:00', value: 2.68 },
    { time: '24:00', value: 2.73 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surfaceElevated border border-border rounded-md p-2 shadow-elevated">
          <p className="text-textSecondary text-sm">{`Time: ${label}`}</p>
          <p className="text-primary font-medium">
            {`Value: ${payload[0].value.toFixed(3)} SOL`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(240, 5%, 64%)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(240, 5%, 64%)', fontSize: 12 }}
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(142, 76%, 36%)" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'hsl(142, 76%, 36%)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradingChart;