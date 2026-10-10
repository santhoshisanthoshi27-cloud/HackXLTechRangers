import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { CreatorCard } from '../components/creator/CreatorCard';
import { CampaignCard } from '../components/campaign/CampaignCard';
import { CreatorDetailModal } from '../components/creator/CreatorDetailModal';
import { INITIAL_CREATORS } from '../data/mockCreators';
import { INITIAL_CAMPAIGNS } from '../data/mockCampaigns';
import { Creator } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Video, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Search, 
  Cpu, 
  MessageSquare,
  DollarSign,
  Star,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedProfession } = useAuth();
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const featuredCreators = INITIAL_CREATORS.slice(0, 3);
  const sampleCampaigns = INITIAL_CAMPAIGNS.slice(0, 2);

  const handleSelectRole = (role: 'business' | 'creator') => {
    setSelectedProfession(role);
    navigate('/select-profession');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-radial from-purple-900/10 via-slate-50 to-slate-50">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-200/40 via-blue-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-900 text-xs font-bold tracking-wide shadow-2xs">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI-POWERED MARKETING MARKETPLACE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Connect Your Brand with the{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Right Creators.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                NECTO bridges the gap between ambitious business owners and verified content creators. Run high-converting promotional campaigns on <strong>Instagram, YouTube, Facebook, and LinkedIn</strong> with automated AI recommendations.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => handleSelectRole('business')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md shadow-purple-600/30 hover:shadow-purple-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Find Creators (Brands)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => handleSelectRole('creator')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-purple-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4 text-purple-600" />
                  <span>Join as a Creator</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Audience Metrics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent Pricing Tiers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Smart AI Match Engine</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-b from-white to-slate-50/80 p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xl shadow-purple-900/10">
                {/* Floating AI Match Pill */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">AI Recommendation</span>
                    <span className="text-xs font-bold text-white">96% Compatibility Match</span>
                  </div>
                </div>

                {/* Creator card preview */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Alex Rivera"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 truncate">Alex Rivera</h4>
                        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                          Tech & Gadgets
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">185K Reach • 5.4% Engagement</p>
                    </div>
                  </div>

                  {/* Campaign offer simulated chat */}
                  <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-900">Active Brand Campaign:</span>
                      <span className="font-bold text-purple-700">$1,200 Budget</span>
                    </div>
                    <p className="text-xs text-purple-950 font-medium">
                      "AuraPulse Wireless Headphones Launch" — Deliverables: 1x YouTube Review + 2x IG Stories.
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Match criteria: Niche, YouTube platform & budget alignment</span>
                    </div>
                  </div>

                  {/* Bottom Stats Preview */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Platforms</span>
                      <span className="font-bold text-slate-800">YT, IG, LI</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Turnaround</span>
                      <span className="font-bold text-slate-800">5 Days</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Rating</span>
                      <span className="font-bold text-amber-500 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> 4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
              Why We Built NECTO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Bridging the Traditional Gap in Creator Marketing
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Businesses struggle to find verified, niche-aligned creators within budget, while creators waste hours pitch-messaging brands without clear contracts. NECTO changes that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Business Owner Card */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-5 hover:border-purple-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">For Business Owners</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tired of messy DMs and unverified follower counts? Post your campaign requirements, set your budget, and receive qualified creator proposals with transparent engagement rates.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Targeted filtering across 8 popular content niches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>AI Match score based on niche, platforms, and budget</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Centralized review of proposals and deliverable milestones</span>
                </li>
              </ul>
              <button
                onClick={() => handleSelectRole('business')}
                className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Discover Creators Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Creator Card */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-5 hover:border-blue-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">For Content Creators</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Showcase your media kit, channels, and verified statistics. Browse commercial brand campaigns with guaranteed deliverables and apply with custom pricing proposals.
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Verified digital portfolio & channel highlight cards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Direct campaign application with custom proposals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Live milestone tracking from draft to brand approval</span>
                </li>
              </ul>
              <button
                onClick={() => handleSelectRole('creator')}
                className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Join as Creator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How NECTO Works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How NECTO Works in 4 Simple Steps
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A streamlined cycle designed for swift, transparent brand-creator partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select Role & Setup Profile',
                desc: 'Register as a Business Owner or Content Creator. Select your active platforms and configure your media kit or brand details.'
              },
              {
                step: '02',
                title: 'Post or Browse Campaigns',
                desc: 'Brands define objectives, target niches, and budgets. Creators explore tailored sponsorship opportunities.'
              },
              {
                step: '03',
                title: 'AI Smart Compatibility Match',
                desc: 'Our recommendation engine calculates compatibility scores based on niche alignment, platform reach, and budget fit.'
              },
              {
                step: '04',
                title: 'Collaborate & Track Milestones',
                desc: 'Submit proposals, approve deliverables, review content drafts, and track campaign completion with transparent statuses.'
              }
            ].map(item => (
              <div
                key={item.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 transition-all space-y-3 relative overflow-hidden"
              >
                <span className="text-4xl font-black text-purple-100 block -mb-1">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section id="for-creators" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                Talent Showcase
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Featured Verified Creators
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore top-rated creators across technology, fashion, cuisine, and business niches.
              </p>
            </div>

            <Link
              to="/select-profession"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2.5 rounded-xl transition-colors"
            >
              <span>Explore All Creators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCreators.map(creator => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                onViewDetails={c => setSelectedCreator(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Example Campaigns Section */}
      <section id="for-businesses" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Sponsorship Opportunities
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Active Brand Campaigns
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Sample promotional campaigns posted by verified brands looking for creator partnerships.
              </p>
            </div>

            <Link
              to="/select-profession"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors"
            >
              <span>View All Campaigns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleCampaigns.map(camp => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                onApply={() => handleSelectRole('creator')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching Showcase */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSPARENT MATCHING ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              NECTO AI Match
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              No black-box mystery. Our matching algorithm evaluates campaign requirements against creator metrics across 5 distinct dimensions to guarantee collaboration success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-white">Niche Alignment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prioritizes creators whose primary content category precisely aligns with the brand's product sector.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-white">Platform Compatibility</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches required promotion channels (Instagram Reels, YouTube Reviews, LinkedIn) to active creator distribution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-white">Budget & Availability</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensures campaign budget falls within the creator's pricing bracket with immediate scheduling availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About NECTO Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                About NECTO
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering Brands and Creators with Frictionless Partnerships
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                NECTO was built to solve a fundamental problem in modern digital marketing: SMBs struggle to find relevant creators within their budget, while talented content creators waste hours searching for authentic brand sponsorships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="text-2xl font-black text-purple-700">100%</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">Direct Brand-to-Creator</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">No agency commissions or middlemen</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="text-2xl font-black text-blue-700">5-Way</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">Multi-Attribute AI</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Niche, channel, budget, reach & schedule</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-2xl font-black text-emerald-700">Instant</div>
                  <div className="text-xs font-semibold text-slate-700 mt-1">Milestone Approvals</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Transparent deliverable reviews</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-900 p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Our Tagline & Vision</span>
                    <h3 className="text-2xl font-black tracking-tight text-white">
                      Connect. Collaborate. Grow.
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed as a modern, full-lifecycle marketplace prototype for college hackathon showcases and product demonstrations.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs text-slate-300">
                        <strong>Role-Aware Dashboards:</strong> Dedicated, customized portals for business owners and content creators.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs text-slate-300">
                        <strong>Demo OTP & Session Persistence:</strong> One-click simulation with local state preservation across reloads.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-xs text-slate-300">
                        <strong>Extensible API Contracts:</strong> Pre-separated frontend architectures ready for backend service integration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Accelerate Your Marketing Collaborations?
          </h2>
          <p className="text-purple-100 text-sm sm:text-base max-w-xl mx-auto">
            Join NECTO today. Whether you are launching a product or creating content, we help you connect, collaborate, and grow.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/select-profession"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-purple-700 hover:bg-purple-50 shadow-lg shadow-purple-950/20 transition-all transform hover:-translate-y-0.5"
            >
              Get Started for Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-purple-900/60 hover:bg-purple-900 text-white border border-purple-400/30 transition-all"
            >
              Explore Demo Logins
            </Link>
          </div>
        </div>
      </section>

      {/* Creator Detail Modal */}
      <CreatorDetailModal
        creator={selectedCreator}
        isOpen={!!selectedCreator}
        onClose={() => setSelectedCreator(null)}
      />

      <Footer />
    </div>
  );
};
