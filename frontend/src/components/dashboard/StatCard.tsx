import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-xs font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slate-400">from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-purple-50 rounded-xl">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
  );
};
