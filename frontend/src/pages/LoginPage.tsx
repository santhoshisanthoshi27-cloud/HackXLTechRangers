import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Logo } from '../components/common/Logo';
import { useToast } from '../context/ToastContext';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Briefcase, 
  Video, 
  AlertCircle, 
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRoleDemo } = useAuth();
  const { success, error } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('business');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setErrorMessage('');
    
    try {
      const user = await login(email, password, selectedRole);
      
      if (user?.role === 'admin') {
        success('Logged In Successfully', 'Welcome to the NECTO Admin Dashboard.');
        navigate('/admin');
      } else {
        success('Logged In Successfully', `Welcome back to your ${selectedRole === 'business' ? 'Brand' : 'Creator'} Dashboard!`);
        if (selectedRole === 'business') {
          navigate('/dashboard/business');
        } else {
          navigate('/dashboard/creator');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRoleDemo(role);
    success(
      'Demo Account Active',
      `Switched to demo ${role === 'business' ? 'Business Owner (AuraSound)' : 'Content Creator (Alex Rivera)'} account.`
    );
    navigate(role === 'business' ? '/dashboard/business' : '/dashboard/creator');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Logo showTagline size="md" />
        <Link
          to="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-md w-full mx-auto my-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Welcome Back
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Log In to NECTO
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Access your marketplace campaigns and creator media kit.
          </p>
        </div>

        {/* Quick 1-Click Demo Login Banner */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Hackathon 1-Click Fast Login:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('business')}
              className="px-3 py-2 bg-white text-purple-700 hover:bg-purple-100/60 border border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Brand Owner</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('creator')}
              className="px-3 py-2 bg-white text-blue-700 hover:bg-blue-100/60 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Creator</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight pt-1">
            <strong>Demo Architecture Notice:</strong> User sessions and role switches are simulated client-side via React state and local storage. Production systems will enforce server-side session tokens, HttpOnly cookies, and API-level RBAC.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Standard Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Role selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Select Account Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('business')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedRole === 'business'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Business Owner
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('creator')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  selectedRole === 'creator'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Content Creator
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={selectedRole === 'business' ? 'vikram@aurasound.com' : 'alex.rivera@techcraft.io'}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Password
              </label>
              <span className="text-[11px] text-purple-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-3 border-t border-slate-100">
          Don't have an account yet?{' '}
          <Link to="/select-profession" className="font-bold text-purple-600 hover:underline">
            Register now
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-2">
        NECTO Marketing Marketplace • Connect. Collaborate. Grow.
      </footer>
    </div>
  );
};
