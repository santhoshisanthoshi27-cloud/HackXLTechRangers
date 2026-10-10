import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2">
        <Logo showTagline size="md" />
      </header>

      <main className="max-w-md w-full mx-auto text-center my-auto space-y-5">
        <div className="text-8xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested page doesn't exist or has moved. Return to NECTO's marketplace to continue exploring.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-600/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-2">
        NECTO • Connect. Collaborate. Grow.
      </footer>
    </div>
  );
};
