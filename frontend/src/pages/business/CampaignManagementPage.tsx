import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CampaignStatus } from '../../types';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { 
  PlusCircle, 
  Layers, 
  Database,
  Info
} from 'lucide-react';

import { useAppData } from '../../context/AppDataContext';

export const CampaignManagementPage: React.FC = () => {
  const { campaigns } = useAppData();
  const [activeTab, setActiveTab] = useState<'All' | CampaignStatus>('All');
  const tabs: ('All' | CampaignStatus)[] = ['All', 'Active', 'Draft', 'Completed', 'Cancelled'];

  const filteredCampaigns = campaigns.filter(c => activeTab === 'All' || c.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campaign Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track published campaigns, review incoming creator applications, and update project statuses.
          </p>
        </div>

        <Link
          to="/dashboard/business/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/25 transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Campaign</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <EmptyState
          icon={Database}
          title="No Campaigns Found"
          description="You haven't published any campaigns matching this filter yet."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map(camp => (
             <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
               <div>
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="font-bold text-slate-900 text-lg">{camp.title}</h3>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                     camp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                     camp.status === 'Draft' ? 'bg-slate-100 text-slate-700' :
                     'bg-purple-100 text-purple-700'
                   }`}>
                     {camp.status}
                   </span>
                 </div>
                 <p className="text-sm text-slate-600 mb-4 line-clamp-2">{camp.description}</p>
                 <div className="flex gap-4 text-xs font-semibold text-slate-500 mb-6">
                   <div>
                     <span className="block text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Budget</span>
                     {camp.budgetDisplay || `$${camp.budget}`}
                   </div>
                   <div>
                     <span className="block text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Applications</span>
                     {camp.applicationsCount}
                   </div>
                 </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};
