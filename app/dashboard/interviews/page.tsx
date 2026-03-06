import React from 'react';
import { Calendar, Clock, Video, CheckCircle2, MoreHorizontal, User } from 'lucide-react';

export default function InterviewsPage() {
    const interviews = [
        {
            id: 1,
            candidate: "Alex Rivera",
            role: "Senior React Engineer",
            type: "Technical Assessment",
            date: "Today",
            time: "2:00 PM - 3:00 PM",
            status: "Upcoming",
            interviewer: "Jane Smith",
            platform: "talentscout-video"
        },
        {
            id: 2,
            candidate: "Sam Chen",
            role: "Product Manager",
            type: "Executive Screen",
            date: "Tomorrow",
            time: "10:30 AM - 11:15 AM",
            status: "Upcoming",
            interviewer: "Michael Chang",
            platform: "google-meet"
        },
        {
            id: 3,
            candidate: "Jordan Taylor",
            role: "Lead Designer",
            type: "Portfolio Review",
            date: "Oct 24",
            time: "1:00 PM - 2:30 PM",
            status: "Completed",
            interviewer: "Sarah Jenkins",
            platform: "talentscout-video"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Interviews</h1>
                    <p className="text-foreground-muted">Manage your upcoming schedule and interview feedback.</p>
                </div>
                <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Calendar className="w-4 h-4" /> Schedule Interview
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Schedule */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold">Upcoming Schedule</h2>

                    <div className="space-y-4">
                        {interviews.map(interview => (
                            <div key={interview.id} className="glass-panel p-6 rounded-[24px] hover:border-brand-500/30 transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${interview.status === 'Completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-brand-500/5 border-brand-500/20 text-brand-400'
                                            }`}>
                                            {interview.status === 'Completed' ? <CheckCircle2 className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold group-hover:text-brand-300 transition-colors">{interview.type}</h3>
                                            <div className="text-foreground-muted flex items-center gap-2 text-sm mt-1">
                                                <User className="w-4 h-4" /> {interview.candidate}
                                                <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
                                                <span className="text-white/80">{interview.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-foreground-muted">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle mt-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Calendar className="w-4 h-4 text-brand-400" />
                                            <span className={interview.date === 'Today' ? 'text-brand-400' : ''}>{interview.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-foreground-muted border-l border-border-subtle pl-4">
                                            <Clock className="w-4 h-4" />
                                            <span>{interview.time}</span>
                                        </div>
                                    </div>

                                    {interview.status === 'Upcoming' ? (
                                        <button className="px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors shadow">
                                            Join Call
                                        </button>
                                    ) : (
                                        <button className="px-5 py-2 rounded-full glass-card hover:bg-white/10 text-white text-sm font-medium transition-colors">
                                            View Feedback
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">

                    <div className="glass-card p-6 border-amber-500/20">
                        <h3 className="font-semibold mb-4 text-amber-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            Action Required
                        </h3>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm">
                            <strong className="block text-white mb-1">Feedback Missing</strong>
                            <p className="text-amber-200/80 mb-3">You have 2 pending feedback forms from interviews completed yesterday.</p>
                            <button className="text-amber-400 font-medium hover:text-amber-300">Complete now →</button>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-semibold mb-6 flex justify-between items-center">
                            Interviewer Load
                            <span className="text-xs text-brand-400 font-medium bg-brand-500/5 px-2 py-1 rounded-full">This Week</span>
                        </h3>

                        <div className="space-y-4">
                            {[
                                { name: "Jane Smith", load: 6, max: 8 },
                                { name: "Michael Chang", load: 8, max: 8 },
                                { name: "Sarah Jenkins", load: 2, max: 10 },
                            ].map((interviewer, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-foreground-muted">{interviewer.name}</span>
                                        <span className={interviewer.load >= interviewer.max ? "text-red-400" : "text-white"}>
                                            {interviewer.load}/{interviewer.max} hr
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-background-base rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className={`h-full rounded-full ${interviewer.load >= interviewer.max ? 'bg-red-500' : 'bg-brand-500'}`}
                                            style={{ width: `${(interviewer.load / interviewer.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
