import React from 'react';
import { BarChart3, TrendingUp, Users, Target, Clock, Activity } from 'lucide-react';

export default function AnalyticsDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Analytics Overview</h1>
                    <p className="text-foreground-muted">Track hiring velocity and AI performance metrics.</p>
                </div>
                <select className="px-4 py-2 bg-background-surface border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-500">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                </select>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Time to Hire", value: "18 Days", trend: "-12%", good: true, icon: Clock },
                    { label: "AI Screening Accept Rate", value: "42%", trend: "+5%", good: true, icon: Target },
                    { label: "Cost per Hire", value: "$3,240", trend: "-18%", good: true, icon: TrendingUp },
                    { label: "Active Pipeline", value: "342", trend: "+12", good: true, icon: Users },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col justify-between group hover:border-brand-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-brand-500/5 group-hover:text-brand-400 transition-colors">
                                <stat.icon className="w-5 h-5 text-foreground-muted group-hover:text-brand-400" />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.good ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-foreground-muted">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chart Area Mockup */}
                <div className="lg:col-span-2 glass-card p-6 min-h-[400px] flex flex-col">
                    <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                        Pipeline Velocity
                        <button className="text-xs text-foreground-muted border border-border-subtle px-3 py-1 rounded-full hover:bg-white/5">Export CSV</button>
                    </h3>

                    <div className="flex-1 border border-dashed border-border-subtle rounded-2xl flex items-center justify-center bg-background-base/50 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 to-transparent opacity-50"></div>
                        <div className="text-center z-10">
                            <Activity className="w-10 h-10 text-brand-500/50 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-foreground-muted font-medium">Interactive Chart View (Mockup)</p>
                        </div>

                        {/* Fake bar chart visual effect */}
                        <div className="absolute bottom-0 inset-x-8 flex items-end justify-between gap-2 h-48 opacity-20">
                            {[40, 70, 45, 90, 65, 80, 55, 100, 75, 45, 60].map((h, j) => (
                                <div key={j} className="w-full bg-brand-500 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Source Breakdown */}
                <div className="glass-panel p-6 rounded-[24px]">
                    <h3 className="text-lg font-semibold mb-6">Source Quality</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white font-medium">AI Sourcing</span>
                                <span className="text-brand-400 font-bold">45%</span>
                            </div>
                            <div className="h-2 w-full bg-background-base rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-brand-500 rounded-full w-[45%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white font-medium">LinkedIn Direct</span>
                                <span className="text-blue-400 font-bold">30%</span>
                            </div>
                            <div className="h-2 w-full bg-background-base rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-blue-500 rounded-full w-[30%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white font-medium">Careers Page</span>
                                <span className="text-green-400 font-bold">15%</span>
                            </div>
                            <div className="h-2 w-full bg-background-base rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-green-500 rounded-full w-[15%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-white font-medium">Referrals</span>
                                <span className="text-amber-400 font-bold">10%</span>
                            </div>
                            <div className="h-2 w-full bg-background-base rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-amber-500 rounded-full w-[10%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
