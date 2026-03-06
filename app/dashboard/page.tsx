import React from "react";
import { Sparkles, Briefcase, Users, LayoutDashboard, Search, Zap, ArrowRight } from "lucide-react";

export default function DashboardHome() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Welcome Section */}
            <div className="glass-panel p-8 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border-brand-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.1)]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[100px] rounded-full -mt-40 -mr-40 pointer-events-none"></div>

                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/5 border border-brand-500/20 text-brand-400 text-xs font-semibold tracking-wide uppercase mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> AI Engine Active
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Welcome back, Jane.</h1>
                    <p className="text-foreground-muted leading-relaxed">
                        Your AI agents processed <strong className="text-white">142</strong> resumes overnight. You have <strong className="text-brand-400">12</strong> highly-matched candidates ready for review.
                    </p>
                </div>

                <div className="relative z-10">
                    <a href="/dashboard/candidates" className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2">
                        Review Matches <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="/dashboard/jobs" className="glass-card p-6 group hover:border-brand-500/30 transition-colors block">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-brand-500/5 text-brand-400 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">34</div>
                    <div className="text-sm text-foreground-muted font-medium">Active Jobs</div>
                </a>

                <a href="/dashboard/candidates" className="glass-card p-6 group hover:border-blue-500/30 transition-colors block">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">1,240</div>
                    <div className="text-sm text-foreground-muted font-medium">Total Candidates</div>
                </a>

                <a href="/dashboard/interviews" className="glass-card p-6 group hover:border-green-500/30 transition-colors block">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">8</div>
                    <div className="text-sm text-foreground-muted font-medium">Interviews Today</div>
                </a>
            </div>

            {/* Quick AI Search */}
            <div className="glass-card p-8">
                <h3 className="text-lg font-semibold mb-4">Quick AI Sourcing</h3>
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Zap className="w-5 h-5 text-brand-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-background-base/50 border border-border-subtle rounded-full py-4 pl-12 pr-32 text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all text-white placeholder:text-foreground-muted/50"
                        placeholder="Type a query... e.g., Find me a Senior React Developer in NY"
                    />
                    <button className="absolute inset-y-2 right-2 px-6 bg-brand-600 rounded-full text-sm font-medium hover:bg-brand-500 transition-colors text-white text-center">
                        Search
                    </button>
                </div>
            </div>

        </div>
    );
}
