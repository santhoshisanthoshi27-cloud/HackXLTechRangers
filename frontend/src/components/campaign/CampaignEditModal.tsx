import React, { useState, useEffect } from 'react';
import { Campaign, ContentNiche, PromotionPlatform } from '../../types';
import { Modal } from '../common/Modal';
import { useAppData } from '../../context/AppDataContext';
import { DollarSign, Check, Save } from 'lucide-react';

interface CampaignEditModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignEditModal: React.FC<CampaignEditModalProps> = ({
  campaign,
  isOpen,
  onClose
}) => {
  const { editCampaign } = useAppData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<number>(0);
  const [preferredNiche, setPreferredNiche] = useState<ContentNiche>('Tech & Gadgets');
  const [platforms, setPlatforms] = useState<PromotionPlatform[]>([]);
  const [deliverables, setDeliverables] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

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

  useEffect(() => {
    if (campaign) {
      setTitle(campaign.title);
      setDescription(campaign.description);
      setBudget(campaign.budget);
      setPreferredNiche(campaign.preferredNiche);
      setPlatforms(campaign.platforms);
      setDeliverables(campaign.deliverables.join('\n'));
      setAdditionalInstructions(campaign.additionalInstructions || '');
    }
  }, [campaign]);

  if (!campaign) return null;

  const togglePlatform = (p: PromotionPlatform) => {
    setPlatforms(prev =>
      prev.includes(p)
        ? prev.length > 1 ? prev.filter(item => item !== p) : prev
        : [...prev, p]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const deliverablesList = deliverables
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    editCampaign(campaign.id, {
      title,
      description,
      budget,
      budgetDisplay: `$${budget.toLocaleString()}`,
      preferredNiche,
      platforms,
      deliverables: deliverablesList,
      additionalInstructions
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Campaign"
      subtitle={`Modify settings for "${campaign.title}"`}
      maxWidth="lg"
    >
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Campaign Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Description
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Budget ($ USD)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="100"
                step="50"
                required
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Target Content Niche
            </label>
            <select
              value={preferredNiche}
              onChange={e => setPreferredNiche(e.target.value as ContentNiche)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            >
              {niches.map(niche => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Promotion Platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {availablePlatforms.map(p => {
              const active = platforms.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                    active
                      ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Deliverables (One per line)
          </label>
          <textarea
            rows={3}
            value={deliverables}
            onChange={e => setDeliverables(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Additional Guidelines
          </label>
          <input
            type="text"
            value={additionalInstructions}
            onChange={e => setAdditionalInstructions(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
          />
        </div>

        <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
