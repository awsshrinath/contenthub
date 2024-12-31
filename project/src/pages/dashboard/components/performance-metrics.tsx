import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: '2024-01', views: 1200, engagement: 800 },
  { date: '2024-02', views: 1800, engagement: 1100 },
  { date: '2024-03', views: 2400, engagement: 1500 },
  { date: '2024-04', views: 3200, engagement: 2000 },
];

export function PerformanceMetrics() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Overview</h2>
        <div className="flex items-center text-green-500">
          <ArrowUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">32% increase</span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#888888"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#ff1a75" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Total Views</p>
          <p className="text-2xl font-semibold text-primary-700 dark:text-primary-300">8.6K</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Engagement Rate</p>
          <p className="text-2xl font-semibold text-blue-700 dark:text-blue-300">5.4K</p>
        </div>
      </div>
    </div>
  );
}