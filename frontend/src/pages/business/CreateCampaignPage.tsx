import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { ContentNiche, PromotionPlatform } from '../../types';
import { 
  PlusCircle, 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  Check, 
  AlertCircle,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

export const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addCampaign } = useAppData();

  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState(user?.companyName || 'AuraSound Audio');
  const [description, setDescription] = useState('');
  const [objective, setObjective] = useState('Brand Awareness & Product Conversions');
  const [targetAudience, setTargetAudience] = useState('');
  const [preferredNiche, setPreferredNiche] = useState<ContentNiche>('Tech & Gadgets');
  const [platforms, setPlatforms] = useState<PromotionPlatform[]>(['Instagram', 'YouTube']);
  const [budget, setBudget] = useState<number>(1000);
  const [startDate, setStartDate] = useState('2026-10-20');
  const [endDate, setEndDate] = useState('2026-11-20');
  const [deliverables, setDeliverables] = useState('1x Dedicated YouTube Review (8-10 mins)\n2x Instagram Stories with discount swipe-up');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const niches: ContentNiche[] = [
    'Tech & Gadgets',
    'Fashion & Beauty',
    'Food & Culinary',
    'Fitness & Health',
    'Travel & Adventure',
    'Home Décor & Lifestyle',
    'Business & Finance',
    'Gaming & Entertainment'
  ];

  const availablePlatforms: PromotionPlatform[] = ['Instagram', 'YouTube', 'Facebook', 'LinkedIn'];

  const togglePlatform = (p: PromotionPlatform) => {
    setPlatforms(prev => {
      if (prev.includes(p)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter(item => item !== p);
      } else {
        return [...prev, p];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Please provide a campaign title.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Please describe the product or promotional campaign.');
      return;
    }

    if (budget <= 0) {
      setErrorMessage('Please specify a positive budget amount.');
      return;
    }

    const deliverablesList = deliverables
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    if (deliverablesList.length === 0) {
      setErrorMessage('Please enter at least one expected deliverable.');
      return;
    }

    setErrorMessage('');

    addCampaign({
      title,
      brandName,
      description,
      objective,
      targetAudience: targetAudience || 'Consumers aged 20-35 interested in high quality products',
      preferredNiche,
      platforms,
      budget,
      budgetDisplay: `$${budget.toLocaleString()}`,
      startDate,
      endDate,
      deadline: startDate,
      deliverables: deliverablesList,
      additionalInstructions,
      status: 'Active'
    });

    navigate('/dashboard/business/campaigns');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/business/campaigns"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Campaign Builder
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Create a New Marketing Campaign
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Specify your campaign requirements, deliverables, and budget to attract matching creator proposals.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Campaign Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. AuraPulse Active Noise Cancelling Launch"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Business or Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                placeholder="e.g. AuraSound Audio Inc."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Product or Service Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explain the product features, unique selling proposition, and what creators will test or showcase..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            />
          </div>

          {/* Objective & Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Campaign Objective
              </label>
              <select
                value={objective}
                onChange={e => setObjective(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              >
                <option value="Brand Awareness & Product Conversions">Brand Awareness & Conversions</option>
                <option value="Direct Sales & Promo Code Redemptions">Direct Sales & Promo Codes</option>
                <option value="User Generated Content (UGC)">User-Generated Content (UGC)</option>
                <option value="App Downloads / Registrations">App Downloads / SaaS Signups</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Audience Demographics
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                placeholder="e.g. Tech enthusiasts, remote workers aged 20-35"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Preferred Niche & Promotion Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Preferred Content Niche <span className="text-rose-500">*</span>
              </label>
              <select
                value={preferredNiche}
                onChange={e => setPreferredNiche(e.target.value as ContentNiche)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              >
                {niches.map(niche => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Promotion Platforms <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {availablePlatforms.map(p => {
                  const active = platforms.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                        active
                          ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 text-purple-600 stroke-[3]" />}
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Budget, Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Campaign Budget ($ USD) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="50"
                  required
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Expected Deliverables */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Expected Deliverables (One per line) <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={deliverables}
              onChange={e => setDeliverables(e.target.value)}
              placeholder="e.g. 1x Dedicated 8-10 min YouTube review&#10;2x Instagram Stories with discount link"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            />
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Additional Instructions / Creator Guidelines
            </label>
            <input
              type="text"
              value={additionalInstructions}
              onChange={e => setAdditionalInstructions(e.target.value)}
              placeholder="e.g. Please highlight the 40-hour battery life and fast charging feature."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/dashboard/business/campaigns')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Campaign</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
