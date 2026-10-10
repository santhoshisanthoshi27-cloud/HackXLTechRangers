import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'accepted':
      case 'approved':
        return 'bg-emerald-100 text-emerald-700';
      case 'draft':
      case 'pending':
      case 'applied':
      case 'under review':
        return 'bg-amber-100 text-amber-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
      case 'rejected':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStyles()}`}>
      {status}
    </span>
  );
};
