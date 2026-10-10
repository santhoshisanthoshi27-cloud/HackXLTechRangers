import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Briefcase, FileText, Activity } from 'lucide-react';
import { StatCard } from '../../components/dashboard/StatCard';
import { LoadingSkeleton } from '../../components/dashboard/LoadingSkeleton';

export const AdminOverviewPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getOverview()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Platform Overview</h2>
        <p className="text-slate-500 mt-1">Live metrics from the NECTO database.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={data?.total_users || 0} 
          icon={Users} 
        />
        <StatCard 
          title="Business Owners" 
          value={data?.total_business || 0} 
          icon={Briefcase} 
        />
        <StatCard 
          title="Content Creators" 
          value={data?.total_creators || 0} 
          icon={Users} 
        />
        <StatCard 
          title="Total Campaigns" 
          value={data?.total_campaigns || 0} 
          icon={FileText} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Pending Activity</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
               <span className="text-sm font-medium text-slate-700">Pending Applications</span>
               <span className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-sm font-semibold">{data?.pending_applications || 0}</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
               <span className="text-sm font-medium text-slate-700">Active Collaborations</span>
               <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-sm font-semibold">{data?.active_collaborations || 0}</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
               <span className="text-sm font-medium text-slate-700">Unresolved Reports</span>
               <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-sm font-semibold">{data?.unresolved_reports || 'Pending feature'}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
