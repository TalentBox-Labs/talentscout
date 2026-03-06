"use client";
import React from 'react';
import { Briefcase, Filter, ArrowUpRight, Search, Plus, MapPin, Clock, MoreHorizontal } from 'lucide-react';

export default function JobListPage() {
    const jobs = [
        {
            id: 1,
            title: "Senior Product Manager",
            department: "Product",
            location: "San Francisco, CA (Hybrid)",
            type: "Full-time",
            status: "Active",
            candidates: 124,
            aiMatchRate: "86%",
            daysOpen: 14,
            color: "brand"
        },
        {
            id: 2,
            title: "Frontend Engineer (React)",
            department: "Engineering",
            location: "Remote (US)",
            type: "Full-time",
            status: "Active",
            candidates: 218,
            aiMatchRate: "92%",
            daysOpen: 5,
            color: "blue"
        },
        {
            id: 3,
            title: "VP of Sales",
            department: "Sales",
            location: "New York, NY",
            type: "Full-time",
            status: "Draft",
            candidates: 0,
            aiMatchRate: "-",
            daysOpen: 0,
            color: "amber"
        },
        {
            id: 4,
            title: "Data Scientist",
            department: "Engineering",
            location: "London, UK (Remote)",
            type: "Contract",
            status: "Closed",
            candidates: 45,
            aiMatchRate: "78%",
            daysOpen: 42,
            color: "red"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 hidden sm:block">Jobs Dashboard</h1>
                    <p className="text-foreground-muted">Manage reqs and match perfect candidates with AI.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full bg-background-surface border border-border-subtle rounded-full py-2.5 pl-10 pr-4 text-sm focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                        />
                    </div>
                    <button className="px-4 py-2 rounded-full glass-panel hover:bg-background-surface font-medium flex items-center gap-2 border border-border-subtle">
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                    <a href="/dashboard/jobs/new" className="px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-medium flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Create Job</span>
                    </a>
                </div>
            </div>

            {/* Stats Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Jobs", value: "34", trend: "+2 this week" },
                    { label: "Total Candidates", value: "1,240", trend: "+148 this month" },
                    { label: "Avg Time to Hire", value: "18 Days", trend: "-4 days vs last quarter" },
                    { label: "AI Screening Accept", value: "42%", trend: "High quality sourcing" },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col justify-between group hover:border-brand-500/30 transition-colors">
                        <h3 className="text-foreground-muted text-sm font-medium mb-4">{stat.label}</h3>
                        <div>
                            <div className="text-3xl font-bold mb-1 group-hover:text-brand-400 transition-colors">{stat.value}</div>
                            <div className="text-xs text-foreground-muted">{stat.trend}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Jobs List */}
            <div className="glass-card overflow-hidden">
                <div className="p-1">
                    {jobs.map((job) => (
                        <a key={job.id} href={`/dashboard/jobs/${job.id}`} className="block relative group p-5 hover:bg-background-surface-hover rounded-2xl transition-all border border-transparent hover:border-border-subtle cursor-pointer">

                            <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">

                                {/* Job Info */}
                                <div className="flex gap-4 items-start flex-1">
                                    <div className={`p-3 rounded-2xl bg-${job.color}-500/10 text-${job.color}-400 group-hover:scale-110 transition-transform`}>
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1 group-hover:text-brand-400 transition-colors flex items-center gap-2">
                                            {job.title}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-brand-500" />
                                        </h4>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-muted">
                                            <span className="font-medium text-white/80">{job.department}</span>
                                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div className="flex items-center gap-8 lg:w-1/3 justify-end">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">{job.candidates}</div>
                                        <div className="text-xs text-foreground-muted font-medium">Candidates</div>
                                    </div>
                                    <div className="h-10 w-px bg-border-subtle hidden sm:block"></div>
                                    <div className="text-center hidden sm:block">
                                        <div className="text-2xl font-bold text-green-400">{job.aiMatchRate}</div>
                                        <div className="text-xs text-foreground-muted font-medium">Avg Top Match</div>
                                    </div>
                                    <div className="h-10 w-px bg-border-subtle hidden sm:block"></div>
                                    <div className="text-center hidden sm:block">
                                        <div className="text-lg font-semibold text-white/80">{job.daysOpen}</div>
                                        <div className="text-xs text-foreground-muted font-medium">Days Open</div>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-48">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border border-background-base
                    ${job.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            job.status === 'Draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                        {job.status}
                                    </span>

                                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors" onClick={(e) => e.preventDefault()}>
                                        <MoreHorizontal className="w-5 h-5 text-foreground-muted" />
                                    </button>
                                </div>

                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
