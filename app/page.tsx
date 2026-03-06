import React from 'react';
import { Bot, Briefcase, Users, Zap, Search, ArrowRight, LayoutDashboard, Settings, Plus, Sparkles } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen text-foreground-base flex flex-col">
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-brand-500/5">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <Bot className="w-6 h-6 text-brand-500" />
            <span>Talent<span className="text-foreground-muted">Scout</span></span>
          </div>
          <div className="h-4 w-px bg-border-subtle"></div>
          <div className="flex items-center gap-6 text-sm font-medium text-foreground-muted">
            <a href="#" className="hover:text-foreground-base transition-colors">Platform</a>
            <a href="#" className="hover:text-foreground-base transition-colors">Solutions</a>
            <a href="#" className="hover:text-foreground-base transition-colors">Resources</a>
            <a href="#" className="hover:text-foreground-base transition-colors">Pricing</a>
          </div>
          <div className="h-4 w-px bg-border-subtle"></div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="#" className="text-sm font-medium hover:text-white transition-colors">Log in</a>
            <a href="/dashboard" className="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center pt-48 pb-24 px-6 relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-40 left-[20%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <div className="max-w-4xl text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/30 text-sm font-medium text-brand-400 mb-4 ring-1 ring-inset ring-brand-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-4 h-4" />
            <span>Recruiting, rewritten for the AI era.</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]">
            <span className="text-gradient">Hire faster with</span><br />
            <span className="text-gradient-brand">precision AI.</span>
          </h1>

          <p className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Unify sourcing, matching, and interviews in one intelligent operating system.
            Reduce time-to-hire by 40% using automated screening agents and semantic search.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              Start Hiring Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 rounded-full glass-panel hover:bg-background-surface transition-all font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Book a Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview / Bento Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {/* Main Search Panel */}
          <div className="md:col-span-2 glass-card p-8 flex flex-col gap-6 group hover:border-brand-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-1">Global Talent Search</h3>
                <p className="text-foreground-muted text-sm border-none">Search millions of profiles with natural language.</p>
              </div>
              <div className="p-3 bg-brand-500/5 rounded-2xl text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all">
                <Search className="w-6 h-6" />
              </div>
            </div>

            <div className="relative mt-4">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Zap className="w-5 h-5 text-brand-400" />
              </div>
              <input
                type="text"
                className="w-full bg-background-base/50 border border-border-subtle rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-foreground-muted/50"
                placeholder="&quot;Find me a Senior React Developer in NY with FinTech experience...&quot;"
                readOnly
              />
              <button className="absolute inset-y-2 right-2 px-4 bg-brand-600 rounded-full text-sm font-medium hover:bg-brand-500 transition-colors">
                Search
              </button>
            </div>

            <div className="flex gap-3 mt-2 overflow-x-hidden">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium glass-panel border-border-subtle bg-white/5 whitespace-nowrap">React.js</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium glass-panel border-border-subtle bg-white/5 whitespace-nowrap">TypeScript</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium glass-panel border-border-subtle bg-white/5 whitespace-nowrap">FinTech</span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium glass-panel border-border-subtle bg-white/5 whitespace-nowrap">Senior</span>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="glass-card p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Pipeling</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Connect your sourcing directly to job requisitions. AI ranks candidates automatically.
              </p>
            </div>
            <div className="mt-8 flex items-end gap-3">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">84%</span>
              <span className="text-sm text-green-400 mb-1 font-medium pb-1">+12% fit</span>
            </div>
          </div>

          {/* Jobs Dashboard View Panel */}
          <div className="md:col-span-3 glass-card p-0 overflow-hidden border-border-subtle group mt-6">
            <div className="flex border-b border-border-subtle bg-background-base/50 p-4 items-center justify-between">
              <div className="flex items-center gap-3 pl-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="h-4 w-px bg-border-subtle mx-2"></div>
                <div className="text-sm font-medium flex items-center gap-2 text-foreground-muted">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard / Jobs
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                  <Settings className="w-4 h-4 text-foreground-muted" />
                </button>
                <button className="pl-3 pr-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-sm font-medium flex items-center gap-1.5 border border-white/5 text-white">
                  <Plus className="w-4 h-4" /> New Job
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mock Job Card */}
                <div className="glass-panel p-5 rounded-[20px] hover:border-brand-500/50 transition-all cursor-pointer group/card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover/card:bg-brand-500/5 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative">
                    <div className="p-3 bg-white/5 rounded-2xl text-foreground-base border border-white/5">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-1 relative">Senior Frontend Engineer</h4>
                  <p className="text-sm text-foreground-muted mb-4 relative">New York, NY • Remote</p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle relative">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-base bg-zinc-800"></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-base bg-zinc-700"></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-base bg-zinc-600 flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                    <div className="text-sm font-medium text-brand-400 group-hover/card:text-brand-300">
                      42 Matches
                    </div>
                  </div>
                </div>

                {/* Mock Job Card 2 */}
                <div className="glass-panel p-5 rounded-[20px] hover:border-blue-500/50 transition-all cursor-pointer group/card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover/card:bg-blue-500/20 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative">
                    <div className="p-3 bg-white/5 rounded-2xl text-foreground-base border border-white/5">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Draft</span>
                  </div>
                  <h4 className="font-semibold text-lg mb-1 relative">Product Marketing Mgr</h4>
                  <p className="text-sm text-foreground-muted mb-4 relative">San Francisco, CA • Hybrid</p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-subtle relative">
                    <div className="text-sm text-foreground-muted">No candidates yet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
