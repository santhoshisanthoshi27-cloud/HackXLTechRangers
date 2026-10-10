import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { ContentNiche, PromotionPlatform, Creator } from '../../types';
import { Modal } from '../../components/common/Modal';
import { 
  UserCheck, 
  Camera, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Check, 
  Save, 
  Info,
  Link as LinkIcon,
  Plus,
  ExternalLink,
  Trash2
} from 'lucide-react';

export const CreatorProfileSetupPage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const { creators, updateCreatorProfileData, addPortfolioItem, removePortfolioItem } = useAppData();
  const { success } = useToast();

  const currentCreatorData = creators.find(c => c.id === user?.id || c.name === user?.fullName) || creators[0];

  const [name, setName] = useState(user?.fullName || currentCreatorData.name);
  const [handle, setHandle] = useState(currentCreatorData.handle);
  const [avatar, setAvatar] = useState(user?.avatarUrl || currentCreatorData.avatar);
  const [bio, setBio] = useState(user?.bio || currentCreatorData.bio);
  const [location, setLocation] = useState(currentCreatorData.location);
  const [primaryNiche, setPrimaryNiche] = useState<ContentNiche>(currentCreatorData.primaryNiche);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PromotionPlatform[]>(currentCreatorData.platforms);
  const [audienceSize, setAudienceSize] = useState(currentCreatorData.audienceSize);
  const [engagementRate, setEngagementRate] = useState(currentCreatorData.engagementRate);
  const [pricingRange, setPricingRange] = useState(currentCreatorData.pricingRange);
  const [available, setAvailable] = useState(currentCreatorData.available);
  const [portfolioLink, setPortfolioLink] = useState('https://instagram.com/alexriveratech');

  // Portfolio addition state
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortPlatform, setNewPortPlatform] = useState<PromotionPlatform>('Instagram');
  const [newPortViews, setNewPortViews] = useState('');
  const [newPortUrl, setNewPortUrl] = useState('');
  const [newPortThumbnail, setNewPortThumbnail] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');

  const handleAddPortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortUrl.trim()) return;

    addPortfolioItem(currentCreatorData.id, {
      title: newPortTitle.trim(),
      platform: newPortPlatform,
      url: newPortUrl.trim(),
      viewsOrReach: newPortViews.trim() || '50K views',
      thumbnail: newPortThumbnail.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
    });

    success('Portfolio Added', 'Your work sample has been added to your media kit.');
    setIsAddingPortfolio(false);
    setNewPortTitle('');
    setNewPortUrl('');
    setNewPortViews('');
  };

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

  const platformsList: PromotionPlatform[] = ['Instagram', 'YouTube', 'Facebook', 'LinkedIn'];

  const togglePlatform = (p: PromotionPlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(p)
        ? prev.length > 1 ? prev.filter(item => item !== p) : prev
        : [...prev, p]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Update Auth context
    updateUserProfile({
      fullName: name,
      avatarUrl: avatar,
      bio,
      selectedPlatforms
    });

    // Update AppData creators list
    updateCreatorProfileData(currentCreatorData.id, {
      name,
      handle,
      avatar,
      bio,
      location,
      primaryNiche,
      platforms: selectedPlatforms,
      audienceSize,
      engagementRate: Number(engagementRate),
      pricingRange,
      available
    });

    success('Media Kit Updated!', 'Your creator profile and media kit changes have been saved.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Profile & Media Kit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure your public profile, audience stats, and pricing so brands can hire you.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Metrics are saved to local demo state</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-purple-50 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-purple-600 text-white rounded-xl shadow-xs">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Social Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={e => setHandle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={e => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Short Biography / Introduction
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
            />
          </div>

          {/* Primary Niche & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Primary Content Niche
              </label>
              <select
                value={primaryNiche}
                onChange={e => setPrimaryNiche(e.target.value as ContentNiche)}
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
                Location (City, Country)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Active Platforms */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Active Social Media Channels
            </label>
            <div className="flex flex-wrap gap-2.5">
              {platformsList.map(p => {
                const active = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metrics (Audience Size, Engagement Rate, Pricing Range) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Audience Size
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={audienceSize}
                  onChange={e => setAudienceSize(e.target.value)}
                  placeholder="e.g. 185K"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Engagement Rate (%)
              </label>
              <div className="relative">
                <TrendingUp className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.1"
                  value={engagementRate}
                  onChange={e => setEngagementRate(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Pricing Range Bracket
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pricingRange}
                  onChange={e => setPricingRange(e.target.value)}
                  placeholder="e.g. $400 - $950"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Portfolio Link & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Showcase Portfolio URL
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={e => setPortfolioLink(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={e => setAvailable(e.target.checked)}
                  className="w-4 h-4 accent-purple-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">
                  Currently open for immediate brand sponsorships
                </span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Media Kit Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Portfolio Showcase Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Featured Portfolio Content</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showcase your highest-performing campaign videos, reels, and product integrations to prospective brands.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingPortfolio(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Portfolio Work</span>
          </button>
        </div>

        {currentCreatorData.portfolio.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
            No portfolio samples added yet. Click &ldquo;Add Portfolio Work&rdquo; to showcase your viral content.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentCreatorData.portfolio.map(item => (
              <div
                key={item.id}
                className="group relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-200">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                      {item.platform}
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-900/80 text-purple-200 backdrop-blur-xs">
                      {item.viewsOrReach}
                    </span>
                  </div>

                  <div className="p-3">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-purple-600 hover:text-purple-700 flex items-center gap-1 font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Live Post</span>
                    </a>
                  </div>
                </div>

                <div className="p-3 pt-0 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(currentCreatorData.id, item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Portfolio Modal */}
      {isAddingPortfolio && (
        <Modal
          isOpen={isAddingPortfolio}
          onClose={() => setIsAddingPortfolio(false)}
          title="Add Portfolio Showcase"
          subtitle="Add an example of your past promotional work to impress brands"
          maxWidth="md"
        >
          <form onSubmit={handleAddPortfolioSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Content Title / Campaign Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Wireless ANC Headphones Unboxing & Sound Test"
                value={newPortTitle}
                onChange={e => setNewPortTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Platform *
                </label>
                <select
                  value={newPortPlatform}
                  onChange={e => setNewPortPlatform(e.target.value as PromotionPlatform)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Views / Impressions *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 142K views"
                  value={newPortViews}
                  onChange={e => setNewPortViews(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Post / Video URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://instagram.com/reel/xyz123"
                value={newPortUrl}
                onChange={e => setNewPortUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={newPortThumbnail}
                onChange={e => setNewPortThumbnail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddingPortfolio(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-xs"
              >
                Add to Showcase
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
