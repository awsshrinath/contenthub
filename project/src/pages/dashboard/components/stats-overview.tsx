import React from 'react';
import { FileText, Video, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface Stat {
  name: string;
  value: number;
  change: number;
  icon: React.ElementType;
}

const stats: Stat[] = [
  { name: 'Total Content', value: 156, change: 12, icon: FileText },
  { name: 'Videos Created', value: 43, change: -2, icon: Video },
  { name: 'Images Generated', value: 89, change: 8, icon: ImageIcon },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;

        return (
          <div 
            key={stat.name} 
            className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.name}</p>
                <div className="p-3 bg-gradient-to-br from-primary-500/20 to-primary-500/10 dark:from-primary-400/20 dark:to-primary-400/5 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value.toLocaleString()}
              </p>
              
              <div className="flex items-center">
                {isPositive ? (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`ml-2 text-sm font-medium ${
                  isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {Math.abs(stat.change)}% from last month
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}