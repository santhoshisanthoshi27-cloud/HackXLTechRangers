import React from 'react';
import { CampaignStatus, ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: CampaignStatus | ApplicationStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      // Campaign Statuses
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-1 ring-emerald-500/10';
      case 'Draft':
        return 'bg-amber-50 text-amber-700 border-amber-200/80 ring-1 ring-amber-500/10';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 ring-1 ring-blue-500/10';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';

      // Application Statuses
      case 'Applied':
        return 'bg-purple-50 text-purple-700 border-purple-200/80 ring-1 ring-purple-500/10';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200/80 ring-1 ring-amber-500/10';
      case 'Shortlisted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80 ring-1 ring-indigo-500/10';
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-1 ring-emerald-500/10';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200/80 ring-1 ring-rose-500/10';

      // Collaboration Statuses
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 ring-1 ring-blue-500/10';
      case 'Submitted':
        return 'bg-purple-50 text-purple-700 border-purple-200/80 ring-1 ring-purple-500/10';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-1 ring-emerald-500/10';
      case 'Not Started':
        return 'bg-slate-100 text-slate-600 border-slate-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-2xs select-none ${getStyles()} ${sizeClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-pulse" />
      {status}
    </span>
  );
};
