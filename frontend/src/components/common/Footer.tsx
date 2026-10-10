import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Sparkles, Shield, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md">
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              NECTO is an AI-powered Content Creator and Marketing Marketplace designed to connect brand owners with verified creators for high-converting multi-platform promotions.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/50 px-3 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Connect. Collaborate. Grow.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Brands</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/select-profession" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Hire Creators
                </Link>
              </li>
              <li>
                <Link to="/dashboard/business/campaigns/new" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Post a Campaign
                </Link>
              </li>
              <li>
                <Link to="/dashboard/business/ai-match" className="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                  <span>AI Creator Match</span>
                  <span className="text-[10px] bg-purple-900/80 text-purple-300 px-1.5 py-0.2 rounded-sm font-semibold">NEW</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/business/creators" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Creator Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Creators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Creators</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/select-profession" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Join as Creator
                </Link>
              </li>
              <li>
                <Link to="/dashboard/creator/campaigns" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Explore Sponsorships
                </Link>
              </li>
              <li>
                <Link to="/dashboard/creator/profile" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Media Kit Setup
                </Link>
              </li>
              <li>
                <Link to="/dashboard/creator/collaborations" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Collaboration Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Promotion Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platforms</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Instagram Reels & Stories
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                YouTube Reviews & Shorts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Facebook Communities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                LinkedIn Thought Leadership
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} NECTO Inc. All rights reserved. Built for College Hackathon Demonstration.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Demo Prototype (Local State Mock)
            </span>
            <span>•</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
