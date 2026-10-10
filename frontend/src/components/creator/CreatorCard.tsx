import React from 'react';
import { Creator } from '../../types';
import { useAppData } from '../../context/AppDataContext';
import { 
  CheckCircle, 
  Star, 
  MapPin, 
  Heart, 
  Eye, 
  Users, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  onViewDetails: (creator: Creator) => void;
  onInvite?: (creator: Creator) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onViewDetails, onInvite }) => {
  const { isShortlisted, toggleShortlist } = useAppData();
  const shortlisted = isShortlisted(creator.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner / Avatar */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-purple-200 transition-all"
              />
              {creator.verified && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-purple-600 fill-purple-100" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  {creator.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">{creator.handle}</p>
              
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[130px]">{creator.location}</span>
              </div>
            </div>
          </div>

          {/* Shortlist heart button */}
          <button
            onClick={() => toggleShortlist(creator.id)}
            className={`p-2 rounded-xl border transition-all ${
              shortlisted
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                : 'bg-slate-50 border-slate-200/80 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50'
            }`}
            title={shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
            aria-label="Toggle shortlist"
          >
            <Heart className={`w-4 h-4 ${shortlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
          {creator.bio}
        </p>

        {/* Niches & Platforms */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            {creator.primaryNiche}
          </span>
          {creator.platforms.map(platform => (
            <span
              key={platform}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Row (Clearly labeled sample data) */}
      <div className="px-5 py-3 bg-slate-50/80 border-y border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Audience</span>
          <span className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
            <Users className="w-3 h-3 text-purple-600" />
            {creator.audienceSize}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Engagement</span>
          <span className="font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            {creator.engagementRate}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Est. Rate</span>
          <span className="font-bold text-slate-800 mt-0.5 block truncate">
            {creator.pricingRange}
          </span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{creator.rating}</span>
          <span className="text-slate-400 text-[11px]">({creator.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(creator)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl border border-slate-200 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>
          
          {onInvite && (
            <button
              onClick={() => onInvite(creator)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Invite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
