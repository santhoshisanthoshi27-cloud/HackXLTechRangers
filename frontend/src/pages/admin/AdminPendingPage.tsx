import React from 'react';
import { Clock } from 'lucide-react';
import { EmptyState } from '../../components/dashboard/EmptyState';

export const AdminPendingPage: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1">This feature is currently under development.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-12">
        <EmptyState 
          icon={Clock}
          title="Feature Pending"
          description={description}
        />
      </div>
    </div>
  );
};
