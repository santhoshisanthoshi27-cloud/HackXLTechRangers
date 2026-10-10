import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Search, Filter, Briefcase } from 'lucide-react';
import { LoadingSkeleton } from '../../components/dashboard/LoadingSkeleton';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { StatusBadge } from '../../components/dashboard/StatusBadge';

export const AdminCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCampaigns();
      setCampaigns(data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campaign Management</h2>
          <p className="text-slate-500 mt-1">Monitor and moderate all marketplace campaigns.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-12">
            <EmptyState 
              icon={Briefcase}
              title="No campaigns found"
              description="There are currently no campaigns in the platform."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                    <td className="px-6 py-4 text-slate-500">{c.brand_name}</td>
                    <td className="px-6 py-4 font-medium">${c.budget.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {c.created_at || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                        Moderate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
