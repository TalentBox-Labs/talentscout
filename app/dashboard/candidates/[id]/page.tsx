import React from 'react';
import { Mail, Briefcase, MapPin, Calendar, CheckCircle2, FileText, Download, Target, PlayCircle, Star } from 'lucide-react';

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
    const candidate = {
        name: "Alex Rivera",
        role: "Senior React Engineer",
        company: "TechCorp Inc.",
        email: "alex.rivera@example.com",
        location: "San Francisco, CA",
        experience: "7+ years",
        score: 94,
        skills: ["React", "TypeScript", "Node.js", "GraphQL", "Next.js", "TailwindCSS"],
        status: "Interviewing",
        appliedTo: "Senior Frontend Engineer"
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

            {/* Overview Head (Bento Top) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-[32px] relative overflow-hidden border-blue-500/20 shadow-[0_4px_30px_rgba(59,130,246,0.1)]">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -mt-40 -mr-40 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-32 h-32 rounded-[28px] border-2 border-border-subtle bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-4xl font-bold shadow-2xl">
                            AR
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-3xl font-bold tracking-tight text-white">{candidate.name}</h1>
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    {candidate.status}
                                </span>
                            </div>

                            <div className="text-lg text-brand-400 font-medium mb-4">{candidate.role}</div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground-muted">
                                <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {candidate.company}</span>
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {candidate.location}</span>
                                <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {candidate.email}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {candidate.experience}</span>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    <Mail className="w-4 h-4" /> Message
                                </button>
                                <button className="px-5 py-2.5 rounded-full glass-card hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2">
                                    <Target className="w-4 h-4" /> Move Stage
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Score Card */}
                <div className="glass-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 to-transparent pointer-events-none"></div>

                    <h3 className="text-sm font-bold tracking-widest uppercase text-foreground-muted mb-6 w-full text-left">AI Fit Score</h3>

                    <div className="relative mb-6">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-background-surface-hover" />
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * 94) / 100} className="text-brand-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-4xl font-black text-white leading-none">{candidate.score}</span>
                            <span className="text-xs text-brand-400 font-bold tracking-widest">/100</span>
                        </div>
                    </div>

                    <p className="text-sm text-foreground-muted">Exceptional match for <strong className="text-white">Senior Frontend Engineer</strong>.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Col: Main Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* AI Synthesis */}
                    <div className="glass-card p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                AI Resume Synthesis
                            </h3>
                        </div>

                        <p className="text-foreground-muted leading-relaxed mb-6">
                            Alex is a highly skilled frontend engineer with profound expertise in the React ecosystem. Their recent work at TechCorp involved migrating a legacy PHP monolith to a modern Next.js architecture, resulting in a 40% performance increase. They score impressively high on modern state management and TypeScript generics.
                        </p>

                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-3">Top Extracted Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, i) => (
                                <span key={i} className="px-4 py-1.5 text-sm font-medium rounded-full glass-panel text-white/90 border-border-subtle hover:border-brand-500/50 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Workflow/Stages */}
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold mb-6">Application Journey</h3>

                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background-base bg-brand-500 text-white shadow relative z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <PlayCircle className="w-4 h-4" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-4 rounded-2xl">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-white">Technical Interview</span>
                                        <time className="text-xs text-brand-400 font-medium">Today 2:00 PM</time>
                                    </div>
                                    <div className="text-sm text-foreground-muted">Scheduled with Jane Smith</div>
                                </div>
                            </div>

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background-base bg-green-500/20 text-green-400 ring-1 ring-green-500/30 relative z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 opacity-70">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-white">Recruiter Screen</span>
                                        <time className="text-xs text-foreground-muted">Oct 14</time>
                                    </div>
                                    <div className="text-sm text-foreground-muted">Passed. Strong communication skills shown.</div>
                                </div>
                            </div>

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background-base bg-green-500/20 text-green-400 ring-1 ring-green-500/30 relative z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 opacity-70">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-white">Applied</span>
                                        <time className="text-xs text-foreground-muted">Oct 12</time>
                                    </div>
                                    <div className="text-sm text-foreground-muted">Via LinkedIn Profile</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Col: Documents & Actions */}
                <div className="space-y-6">

                    <div className="glass-card p-6">
                        <h3 className="font-semibold mb-4 text-white">Attached Documents</h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background-surface border border-border-subtle group hover:border-brand-500/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">alex_rivera_resume.pdf</div>
                                        <div className="text-xs text-foreground-muted">1.2 MB</div>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-foreground-muted group-hover:text-brand-400 transition-colors" />
                            </div>
                        </div>

                        <button className="w-full mt-4 py-2 border border-dashed border-border-subtle hover:border-brand-500/50 rounded-xl text-sm font-medium text-foreground-muted hover:text-white transition-all text-center">
                            + Upload Document
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
