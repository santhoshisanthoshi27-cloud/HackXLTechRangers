import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PromotionPlatform } from '../types';
import { PLATFORMS_DATA } from '../data/mockPlatforms';
import { Logo } from '../components/common/Logo';
import { useToast } from '../context/ToastContext';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin,
  ShieldAlert,
  Info
} from 'lucide-react';

export const PlatformSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserPlatforms } = useAuth();
  const { success, info } = useToast();

  const isBusiness = user?.role === 'business';

  const [selectedPlatforms, setSelectedPlatforms] = useState<PromotionPlatform[]>(
    user?.selectedPlatforms && user.selectedPlatforms.length > 0
      ? user.selectedPlatforms
      : ['Instagram', 'YouTube']
  );

  const togglePlatform = (platform: PromotionPlatform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        if (prev.length === 1) {
          info('Selection Required', 'Please keep at least one active promotion platform selected.');
          return prev;
        }
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const getPlatformIcon = (name: string) => {
    switch (name) {
      case 'Instagram':
        return <Instagram className="w-7 h-7 text-pink-600" />;
      case 'YouTube':
        return <Youtube className="w-7 h-7 text-red-600" />;
      case 'Facebook':
        return <Facebook className="w-7 h-7 text-blue-600" />;
      case 'LinkedIn':
        return <Linkedin className="w-7 h-7 text-blue-700" />;
      default:
        return null;
    }
  };

  const handleContinue = () => {
    updateUserPlatforms(selectedPlatforms);
    success(
      'Platforms Saved',
      `Saved ${selectedPlatforms.length} active platforms for your ${isBusiness ? 'campaigns' : 'creator media kit'}.`
    );

    // Navigate to role-specific dashboard
    if (isBusiness) {
      navigate('/dashboard/business');
    } else {
      navigate('/dashboard/creator');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Logo showTagline size="md" />
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-6">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Step 3 of 3: Promotion Channels
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Promotion Platforms
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            {isBusiness
              ? 'Select the primary channels where you plan to promote your products, brand campaigns, and sponsor creators.'
              : 'Select the social networks where you publish content, build your audience, and accept brand collaborations.'}
          </p>
        </div>

        {/* 4 Multi-Selectable Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {PLATFORMS_DATA.map(platform => {
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <div
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white border-purple-600 shadow-md ring-4 ring-purple-500/10'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getPlatformIcon(platform.id)}
                    </div>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-600 mt-0.5">
                      {platform.tagline}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {isBusiness ? platform.businessDescription : platform.creatorDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Supported Content: Reels, Posts & Videos</span>
                  <span className={isSelected ? 'text-purple-600' : 'text-slate-400'}>
                    {isSelected ? 'Active Selection' : 'Click to Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Disclaimer */}
        <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600 mb-6">
          <Info className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
          <span>
            <strong>Demo Architecture Note:</strong> Selecting platforms saves your promotion preferences in local state. No live OAuth accounts are linked in this frontend prototype.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Back
          </button>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Finish Setup & Open {isBusiness ? 'Brand' : 'Creator'} Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-2">
        NECTO Marketing Marketplace • Connect. Collaborate. Grow.
      </footer>
    </div>
  );
};
