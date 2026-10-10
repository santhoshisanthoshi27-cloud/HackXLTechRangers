import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Logo } from '../components/common/Logo';
import { 
  Briefcase, 
  Video, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Sparkles,
  TrendingUp,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export const ProfessionSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProfession, setSelectedProfession } = useAuth();
  const [currentSelection, setCurrentSelection] = useState<UserRole>(selectedProfession || 'business');

  const handleContinue = () => {
    setSelectedProfession(currentSelection);
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-4">
        <Logo showTagline size="md" />
        <Link
          to="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Role Selection Area */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Step 1 of 3: Role Selection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Profession
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Select how you want to experience NECTO. We will customize your workspace and features accordingly.
          </p>
        </div>

        {/* 2 Large Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A: Business Owner */}
          <div
            onClick={() => setCurrentSelection('business')}
            className={`cursor-pointer rounded-3xl p-7 border-2 transition-all duration-300 relative flex flex-col justify-between ${
              currentSelection === 'business'
                ? 'bg-white border-purple-600 shadow-xl shadow-purple-600/10 ring-4 ring-purple-500/10'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-md'
            }`}
          >
            {/* Top Selection Indicator */}
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                currentSelection === 'business'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                <Briefcase className="w-7 h-7" />
              </div>

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                currentSelection === 'business'
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}>
                {currentSelection === 'business' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Option A
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Business Owner
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Brands, startups, agencies, and small businesses looking for marketing promotions.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Find content creators</strong> across Instagram, YouTube, Facebook & LinkedIn</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Promote products & services</strong> through targeted influencer campaigns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>Create custom campaigns</strong> with deadlines, budgets, and deliverables</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 shrink-0" />
                  <span><strong>AI creator discovery</strong> matched within your exact budget limits</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setCurrentSelection('business')}
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSelection === 'business'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {currentSelection === 'business' ? 'Selected as Business Owner' : 'Select Business Owner'}
            </button>
          </div>

          {/* Option B: Content Creator */}
          <div
            onClick={() => setCurrentSelection('creator')}
            className={`cursor-pointer rounded-3xl p-7 border-2 transition-all duration-300 relative flex flex-col justify-between ${
              currentSelection === 'creator'
                ? 'bg-white border-blue-600 shadow-xl shadow-blue-600/10 ring-4 ring-blue-500/10'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-md'
            }`}
          >
            {/* Top Selection Indicator */}
            <div className="flex items-start justify-between">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                currentSelection === 'creator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-blue-50 text-blue-600'
              }`}>
                <Video className="w-7 h-7" />
              </div>

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                currentSelection === 'creator'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}>
                {currentSelection === 'creator' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Option B
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Content Creator
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Influencers, vloggers, thought leaders, and digital artists monetizing their content.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Discover brand collaborations</strong> tailored to your content niche</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Showcase content & social channels</strong> with verified media kit statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Apply for commercial campaigns</strong> with custom pricing proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>Track collaboration milestones</strong> from draft submission to approval</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setCurrentSelection('creator')}
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                currentSelection === 'creator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {currentSelection === 'creator' ? 'Selected as Content Creator' : 'Select Content Creator'}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>You can switch or preview both roles at any time in the demo.</span>
          </div>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue to Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="text-center py-4 text-xs text-slate-400">
        Already have a demo account?{' '}
        <Link to="/login" className="font-semibold text-purple-600 hover:underline">
          Log In directly
        </Link>
      </footer>
    </div>
  );
};
