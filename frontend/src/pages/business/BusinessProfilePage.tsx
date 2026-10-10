import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Briefcase, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Save, 
  Camera,
  Info,
  CheckCircle2,
  Database
} from 'lucide-react';

export const BusinessProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { info } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [industry, setIndustry] = useState(user?.industry || 'Consumer Electronics & Audio');
  const [website, setWebsite] = useState(user?.website || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [location, setLocation] = useState(user?.location || '');
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  );
  const [bio, setBio] = useState(
    user?.bio || ''
  );

  const industries = [
    'Consumer Electronics & Audio',
    'Beauty, Skincare & Cosmetics',
    'Food, Dining & Cloud Kitchens',
    'Fashion & Apparel',
    'Health, Fitness & Wellness',
    'SaaS, Software & Developer Tools',
    'Home Decor, Living & Architecture',
    'Travel, Hospitality & Tourism'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    info('Live Data Blocked', 'Profile updates are blocked until the Supabase database migration is verified.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Business Profile & Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your company details, brand identity, and default contact information for creator collaborations.
          </p>
        </div>

        {/* Demo Disclaimer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold self-start sm:self-auto border border-slate-200">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Profile updates are blocked pending database verification</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar / Brand Logo and Name Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100 opacity-70">
            <div className="relative">
              <img
                src={avatarUrl}
                alt={companyName}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-purple-100 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-purple-600 text-white rounded-xl shadow-xs">
                <Camera className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Representative Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                    disabled
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Logo / Avatar URL
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Bio / Description */}
          <div className="opacity-70">
            <label className="text-xs font-bold text-slate-700 block mb-1">
              About the Brand / Company Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Describe what your brand makes, your company values, and what kind of creator partnerships you look for..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              disabled
            />
          </div>

          {/* Industry & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-70">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Primary Industry
              </label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                disabled
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Company Website
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Contact Email, Phone & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 opacity-70">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Headquarters / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-purple-500 outline-hidden"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-400 shadow-md shadow-purple-600/25 transition-all flex items-center gap-2 cursor-not-allowed"
            >
              <Database className="w-4 h-4" />
              <span>Writes Disabled</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
