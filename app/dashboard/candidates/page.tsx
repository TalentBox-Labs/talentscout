import React from 'react';
import { Search, Filter, Users, UserPlus, Mail, MessageSquare, Briefcase, Sparkles, UserCheck } from 'lucide-react';

export default function CandidateListPage() {
    const candidates = [
        {
            id: 1,
            name: "Alex Rivera",
            role: "Senior React Engineer",
            company: "TechCorp",
            status: "Interview",
            score: 94,
            skills: ["React", "TypeScript", "Node.js", "GraphQL"],
            location: "San Francisco, CA",
            avatar: "AR"
        },
        {
            id: 2,
            name: "Sam Chen",
            role: "Product Manager",
            company: "Innovate Inc",
            status: "Screening",
            score: 88,
            skills: ["Agile", "Jira", "Figma", "Strategy"],
            location: "New York, NY",
            avatar: "SC"
        },
        {
            id: 3,
            name: "Jordan Taylor",
            role: "Lead Designer",
            company: "Creative Co",
            status: "Offer",
            score: 96,
            skills: ["UI/UX", "Framer", "Design Systems"],
            location: "Remote",
            avatar: "JT"
        },
        {
            id: 4,
            name: "Casey Smith",
            role: "Backend Developer",
            company: "DataCloud",
            status: "Applied",
            score: 72,
            skills: ["Python", "Django", "PostgreSQL", "AWS"],
            location: "Austin, TX",
            avatar: "CS"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header & Advanced Search */}
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1">Talent Pool</h1>
                        <p className="text-foreground-muted">Discover and manage outstanding candidates.</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold flex items-center gap-2 hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95">
                        <UserPlus className="w-4 h-4" /> Add Candidate
                    </button>
                </div>

                {/* Big AI Search Bar */}
                <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border border-brand-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32"></div>

                    <div className="flex-1 w-full relative pl-4 pr-2 flex items-center gap-3 py-2 z-10">
                        <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
                        <input
                            type="text"
                            placeholder="Ask AI: Find frontend devs with 5+ years React experience in NY..."
                            className="w-full bg-transparent text-base border-none focus:ring-0 placeholder:text-foreground-muted/70 text-white outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:pb-0 sm:pr-2 z-10">
                        <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl glass-card border border-border-subtle hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                            <Filter className="w-4 h-4 text-foreground-muted" /> Filters
                        </button>
                        <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium flex items-center justify-center gap-2 transition-colors">
                            <Search className="w-4 h-4" /> Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Pool", value: "24,592", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Active Interviews", value: "86", icon: UserCheck, color: "text-green-400", bg: "bg-green-500/10" },
                    { label: "Requires Action", value: "12", icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10" },
                    { label: "AI Sourced", value: "4,208", icon: Sparkles, color: "text-brand-400", bg: "bg-brand-500/5" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-5 group flex items-start gap-4 hover:border-border-subtle transition-colors cursor-default">
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold leading-none mb-1">{stat.value}</div>
                            <div className="text-xs text-foreground-muted font-medium">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Candidate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                    <a key={candidate.id} href={`/dashboard/candidates/${candidate.id}`} className="block relative group">
                        <div className="glass-panel p-6 rounded-[24px] hover:border-brand-500/40 transition-all border border-border-subtle h-full flex flex-col">

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3 items-center">
                                    <div className="w-12 h-12 rounded-full border border-border-subtle bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-lg font-bold shadow-lg">
                                        {candidate.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-white group-hover:text-brand-300 transition-colors">
                                            {candidate.name}
                                        </h3>
                                        <p className="text-sm text-foreground-muted">{candidate.role}</p>
                                    </div>
                                </div>

                                {/* AI Score Badge */}
                                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-background-base/50 border border-brand-500/20 text-brand-400 ring-1 ring-brand-500/5">
                                    <span className="text-lg font-bold leading-none">{candidate.score}</span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider">Fit</span>
                                </div>
                            </div>

                            {/* Company & Details */}
                            <div className="flex flex-col gap-2 mb-6 text-sm text-foreground-muted">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> {candidate.company}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" /> {candidate.location}
                                </div>
                            </div>

                            {/* Skills (Pill Shapes) */}
                            <div className="flex flex-wrap gap-2 mb-6 flex-1">
                                {candidate.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/80">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Footer Actions & Status */}
                            <div className="flex items-center justify-between pt-4 border-t border-border-subtle mt-auto">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${candidate.status === 'Interview' ? 'bg-amber-400' :
                                            candidate.status === 'Offer' ? 'bg-green-400' :
                                                candidate.status === 'Applied' ? 'bg-blue-400' : 'bg-brand-400'
                                        }`}></span>
                                    <span className="text-sm font-medium text-foreground-base">{candidate.status}</span>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full hover:bg-white/10 text-foreground-muted hover:text-white transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-500/5 text-brand-400 hover:bg-brand-500/5 border border-brand-500/20 transition-colors">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
