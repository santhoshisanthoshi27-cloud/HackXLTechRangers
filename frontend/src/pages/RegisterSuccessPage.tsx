import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Video, 
  Share2 
} from 'lucide-react';

export const RegisterSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isCreator = user?.role === 'creator';

  const handleContinue = () => {
    // Proceed to platform selection next
    navigate('/select-platforms');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Logo showTagline size="md" />
      </header>

      {/* Main Success Card */}
      <main className="max-w-md w-full mx-auto my-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl text-center space-y-6">
        {/* Animated Success Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Registration Verified
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome to NECTO!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your demo account has been initialized. Connect with marketing opportunities and scale your promotions.
          </p>
        </div>

        {/* User Summary Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-400 font-medium">Full Name:</span>
            <span className="font-bold text-slate-800">{user?.fullName || 'Demo User'}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
            <span className="text-slate-400 font-medium">Email:</span>
            <span className="font-semibold text-slate-700">{user?.email || 'demo@necto.com'}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400 font-medium">Selected Profession:</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-lg capitalize">
              {isCreator ? <Video className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              {user?.role === 'business' ? 'Business Owner' : 'Content Creator'}
            </span>
          </div>
        </div>

        {/* Next Step Info */}
        <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-left flex items-start gap-2.5 text-xs text-purple-900">
          <Share2 className="w-4 h-4 shrink-0 text-purple-600 mt-0.5" />
          <span>
            <strong>Next:</strong> Select the promotion platforms you specialize in (Instagram, YouTube, Facebook, LinkedIn).
          </span>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Choose Platforms</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </main>

      <footer className="text-center text-xs text-slate-400 py-2">
        NECTO Marketing Marketplace • Connect. Collaborate. Grow.
      </footer>
    </div>
  );
};
