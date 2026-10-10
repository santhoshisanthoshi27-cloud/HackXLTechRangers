import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  Sparkles, 
  LayoutDashboard, 
  LogOut, 
  ArrowRight,
  Briefcase,
  Video
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, switchRoleDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentPage = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'For Businesses', path: '/#for-businesses' },
    { label: 'For Creators', path: '/#for-creators' },
    { label: 'About', path: '/#about' }
  ];

  const dashboardRoute = user?.role === 'creator' 
    ? '/dashboard/creator' 
    : '/dashboard/business';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Logo showTagline size="md" />
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map(link => {
                const isAnchor = link.path.includes('#');
                if (isAnchor) {
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50/50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isCurrentPage(link.path)
                        ? 'text-purple-600 bg-purple-50 font-semibold'
                        : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                {/* Role Switcher Pill for Demo */}
                <div className="flex items-center bg-slate-100/80 p-1 rounded-xl text-xs font-medium border border-slate-200/60">
                  <button
                    onClick={() => {
                      switchRoleDemo('business');
                      navigate('/dashboard/business');
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                      user.role === 'business'
                        ? 'bg-white text-purple-700 shadow-xs font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Switch to Business View"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Brand
                  </button>
                  <button
                    onClick={() => {
                      switchRoleDemo('creator');
                      navigate('/dashboard/creator');
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                      user.role === 'creator'
                        ? 'bg-white text-purple-700 shadow-xs font-semibold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Switch to Creator View"
                  >
                    <Video className="w-3.5 h-3.5" />
                    Creator
                  </button>
                </div>

                <Link
                  to={dashboardRoute}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-sm shadow-purple-600/20 hover:shadow-purple-600/30 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Log out of demo session"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-purple-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/select-profession"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl shadow-sm shadow-purple-600/25 hover:shadow-purple-600/35 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center justify-between py-2 text-sm text-slate-600">
                  <span>Current Role:</span>
                  <span className="font-semibold text-purple-700 capitalize">{user.role}</span>
                </div>
                <Link
                  to={dashboardRoute}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Open {user.role === 'business' ? 'Brand' : 'Creator'} Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/select-profession"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
