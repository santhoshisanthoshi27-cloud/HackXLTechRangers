import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Logo } from '../components/common/Logo';
import { useToast } from '../context/ToastContext';
import { 
  Briefcase, 
  Video, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  Phone, 
  Mail, 
  User, 
  Lock,
  Sparkles,
  Info
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProfession, setSelectedProfession, register } = useAuth();
  const { success, error: toastError } = useToast();

  const [role, setRole] = useState<UserRole>(selectedProfession || 'business');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Mock OTP Flow states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const MOCK_DEMO_OTP = '123456';

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setSelectedProfession(newRole);
  };

  const handleSendOtp = () => {
    // Basic validation before sending mock OTP
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your contact phone number first.');
      return;
    }
    if (phoneNumber.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid phone number (at least 8 digits).');
      return;
    }

    setErrorMessage('');
    setOtpLoading(true);

    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      success('Mock OTP Generated', `For this demo, your verification code is: ${MOCK_DEMO_OTP}`);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (!otpCode.trim()) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }

    setVerifyLoading(true);
    setTimeout(() => {
      setVerifyLoading(false);
      if (otpCode.trim() === MOCK_DEMO_OTP) {
        setIsOtpVerified(true);
        setErrorMessage('');
        success('Phone Verified!', 'Mock OTP verified successfully.');
      } else {
        setErrorMessage(`Invalid code entered. Demo code is: ${MOCK_DEMO_OTP}`);
      }
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your contact number.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match.');
      return;
    }

    if (!isOtpVerified) {
      setErrorMessage('Please send and verify the demo OTP before registering.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setErrorMessage('');

    try {
      // Register user
      await register({
        fullName,
        email,
        phoneNumber,
        role,
        password
      });

      // Navigate to registration success
      navigate('/register-success');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Logo showTagline size="md" />
        <Link
          to="/select-profession"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Profession</span>
        </Link>
      </header>

      {/* Main Form Container */}
      <main className="max-w-xl w-full mx-auto my-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Step 2 of 3: Account Details
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Create Your NECTO Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Complete the form to set up your verified profile.
          </p>
        </div>

        {/* Selected Profession Toggle */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
            Registering As:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleRoleChange('business')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                role === 'business'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Business Owner</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('creator')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                role === 'creator'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Content Creator</span>
            </button>
          </div>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-3.5 mb-5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
              />
            </div>
          </div>

          {/* Contact Number & Mock OTP Group */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Contact Number & Verification <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  disabled={isOtpVerified}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading || isOtpVerified}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isOtpVerified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'
                }`}
              >
                {isOtpVerified ? 'Verified ✓' : otpLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>

            {/* Mock OTP Instruction Helper Banner */}
            <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
              <span>
                <strong>Demo Mode:</strong> No real SMS will be sent. Click <strong>"Send OTP"</strong> then enter <strong>123456</strong> below.
              </span>
            </div>

            {/* OTP Input Field */}
            {otpSent && !isOtpVerified && (
              <div className="mt-3 flex gap-2 animate-in fade-in">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP (123456)"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold tracking-widest text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyLoading || otpCode.length < 6}
                  className="px-4 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 rounded-xl transition-all cursor-pointer"
                >
                  {verifyLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}

            {isOtpVerified && (
              <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Contact number verified via demo authentication!</span>
              </div>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Terms & Privacy checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 accent-purple-600 rounded"
              />
              <span>
                I agree to the <span className="text-purple-600 underline">Terms of Service</span> and acknowledge the <span className="text-purple-600 underline">Privacy Policy</span>.
              </span>
            </label>
          </div>

          {/* Submit Register Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-purple-600 hover:underline">
            Log In to Demo
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-2">
        NECTO Marketing Marketplace • Connect. Collaborate. Grow.
      </footer>
    </div>
  );
};
