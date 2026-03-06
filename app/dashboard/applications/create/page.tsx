import React from 'react';
import { UserPlus, Briefcase, Plus, Link, CheckCircle2, ChevronDown } from 'lucide-react';

export default function CreateApplicationPage() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            {/* Header */}
            <div className="mb-8 p-8 pb-12 glass-panel rounded-[32px] relative overflow-hidden border-brand-500/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-3xl rounded-full -mt-20 -mr-20"></div>

                <h1 className="text-3xl font-bold tracking-tight mb-3">Link Candidate to Job</h1>
                <p className="text-foreground-muted text-lg max-w-xl">
                    Create a new application by selecting a candidate profile and an active job requisition. Our AI will automatically generate an initial fit score.
                </p>
            </div>

            {/* Main Form Box */}
            <div className="glass-card -mt-8 relative z-10 border-border-subtle shadow-2xl overflow-hidden p-[1px]">
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-500/20 to-transparent opacity-50 z-0 pointer-events-none"></div>

                <div className="bg-background-base/90 backdrop-blur-3xl rounded-[23px] p-8 z-10 relative space-y-8">

                    {/* Form Step: Select Candidate */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-brand-500/5 text-brand-400 flex items-center justify-center font-bold text-sm ring-1 ring-brand-500/30">1</div>
                            <h2 className="text-xl font-semibold">Select Candidate</h2>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <UserPlus className="w-5 h-5 text-foreground-muted group-hover:text-brand-400 transition-colors" />
                            </div>
                            <select className="w-full bg-background-surface appearance-none border border-border-subtle rounded-2xl py-4 pl-12 pr-12 text-base text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all cursor-pointer">
                                <option value="" disabled selected>Search or select a candidate...</option>
                                <option value="1">Alex Rivera • Senior React Engineer (94 Fit)</option>
                                <option value="2">Sam Chen • Product Manager (88 Fit)</option>
                                <option value="3">Jordan Taylor • Lead Designer (96 Fit)</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-foreground-muted" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-2 opacity-50 relative z-20">
                        <div className="glass-panel p-2 rounded-full bg-background-surface shadow-lg">
                            <Link className="w-5 h-5 text-foreground-muted" />
                        </div>
                    </div>

                    {/* Form Step: Select Job */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm ring-1 ring-blue-500/30">2</div>
                            <h2 className="text-xl font-semibold">Select Job Requisition</h2>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Briefcase className="w-5 h-5 text-foreground-muted group-hover:text-blue-400 transition-colors" />
                            </div>
                            <select className="w-full bg-background-surface appearance-none border border-border-subtle rounded-2xl py-4 pl-12 pr-12 text-base text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer">
                                <option value="" disabled selected>Search or select an active job...</option>
                                <option value="1">Senior Frontend Engineer • Engineering • New York, NY</option>
                                <option value="2">Product Marketing Mgr • Marketing • San Francisco, CA</option>
                                <option value="3">UX Researcher • Design • Remote</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-foreground-muted" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-8 mt-8 border-t border-border-subtle flex items-center justify-between">
                        <p className="text-sm text-foreground-muted flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            AI screening will begin automatically
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 rounded-full font-medium hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Create Application
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
