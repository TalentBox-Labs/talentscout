import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Users, Share2, Edit, ChevronLeft, Building, Sparkles } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
    // Mock data for the view
    const job = {
        title: "Senior Product Manager",
        department: "Product",
        location: "San Francisco, CA (Hybrid)",
        salary: "$160k - $200k",
        type: "Full-time",
        status: "Active",
        candidates: 124,
        aiMatchRate: "86%",
        openSince: "Oct 12, 2023",
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* Navigation */}
            <a href="/dashboard/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Jobs
            </a>

            {/* Hero Header */}
            <div className="glass-panel p-8 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-brand-500/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 blur-3xl rounded-full -mt-32 -mr-32 pointer-events-none"></div>

                <div className="relative z-10 flex gap-6 items-start">
                    <div className="w-20 h-20 rounded-2xl bg-brand-500/5 text-brand-400 flex items-center justify-center border border-brand-500/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        <Briefcase className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                {job.status}
                            </span>
                            <span className="text-sm font-medium text-foreground-muted">Req ID: PRD-4482</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-3">{job.title}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground-muted">
                            <span className="flex items-center gap-2 text-white/90"><Building className="w-4 h-4" /> {job.department}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                            <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.type}</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-2.5 rounded-full glass-panel hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2 border border-border-subtle">
                        <Share2 className="w-4 h-4 text-foreground-muted" /> Share
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" /> Edit Job
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-semibold mb-6">Job Description</h3>
                        <div className="prose prose-invert prose-zinc max-w-none text-foreground-muted">
                            <p>We are looking for an experienced Senior Product Manager to lead the development of our core ATS platform. You will work closely with engineering, design, and marketing to build AI-driven recruiting tools.</p>
                            <h4>Responsibilities:</h4>
                            <ul>
                                <li>Define product strategy and roadmap for AI matching and automated screening features.</li>
                                <li>Write crystal clear PRDs and user stories.</li>
                                <li>Collaborate with go-to-market teams for successful feature launches.</li>
                            </ul>
                            <h4>Requirements:</h4>
                            <ul>
                                <li>5+ years of software product management experience.</li>
                                <li>Experience building B2B SaaS applications (HR/Recruiting tech is a huge plus).</li>
                                <li>Deep understanding of AI/LLM capabilities and practical applications.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-brand-400" />
                            <h3 className="text-lg font-semibold">AI Match Profile</h3>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Based on the JD and historical hiring data, the AI vector profile is highly tuned to search for: <strong className="text-white font-medium">B2B SaaS experience</strong>, <strong className="text-white font-medium">product lifecycle management</strong>, and <strong className="text-white font-medium">agile methodologies</strong>.
                        </p>
                    </div>
                </div>

                {/* Right Column: Pipeline & Stats */}
                <div className="space-y-6">
                    {/* Pipeline Summary */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                            Pipeline Snapshot
                            <span className="text-sm font-medium text-brand-400">{job.candidates} Total</span>
                        </h3>

                        <div className="space-y-4">
                            {[
                                { stage: "Sourced (AI)", count: 42, color: "bg-brand-500" },
                                { stage: "Applied", count: 38, color: "bg-blue-500" },
                                { stage: "Screening", count: 24, color: "bg-amber-500" },
                                { stage: "Interview", count: 18, color: "bg-green-500" },
                                { stage: "Offer", count: 2, color: "bg-purple-500" },
                            ].map((stage, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-24 text-sm font-medium text-foreground-muted">{stage.stage}</div>
                                    <div className="flex-1 h-3 bg-background-base/50 rounded-full overflow-hidden border border-white/5">
                                        <div className={`h-full ${stage.color} rounded-full`} style={{ width: `${(stage.count / job.candidates) * 100}%` }}></div>
                                    </div>
                                    <div className="w-8 text-right font-bold text-sm">{stage.count}</div>
                                </div>
                            ))}
                        </div>

                        <a href="/dashboard/candidates" className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-border-subtle flex items-center justify-center gap-2">
                            <Users className="w-4 h-4" /> View Candidates
                        </a>
                    </div>

                    {/* Posting Info */}
                    <div className="glass-panel p-6 rounded-[24px]">
                        <h3 className="text-sm font-semibold text-foreground-muted mb-4 uppercase tracking-wider">Posting Details</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                                <span className="text-foreground-muted">Created</span>
                                <span className="font-medium text-white">{job.openSince}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                                <span className="text-foreground-muted">Hiring Manager</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-[8px] flex items-center justify-center text-blue-400 border border-blue-500/30">JS</div>
                                    <span className="font-medium text-white">Jane Smith</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
                                <span className="text-foreground-muted">AI Match Rate</span>
                                <span className="font-medium text-green-400">{job.aiMatchRate}</span>
                            </div>
                        </div>

                        <a href={`/jobs/${params.id}`} target="_blank" className="mt-6 flex items-center justify-center gap-2 text-brand-400 hover:text-brand-300 font-medium text-sm py-2">
                            View Public Job Page <Share2 className="w-4 h-4" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
