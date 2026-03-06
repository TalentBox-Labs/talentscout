import React from "react";
import { Bot, Briefcase, Users, LayoutDashboard, Settings, FileText, Bell, Search, Plus } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen text-foreground-base bg-background-base flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-border-subtle bg-background-base/80 z-40 hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-border-subtle">
                    <div className="w-8 h-8 rounded-xl bg-brand-500/5 text-brand-400 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">TalentScout</span>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors">
                        <LayoutDashboard className="w-5 h-5 text-brand-400" />
                        Dashboard
                    </a>
                    <a href="/dashboard/jobs" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground-muted font-medium hover:bg-white/5 hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                        Jobs
                    </a>
                    <a href="/dashboard/candidates" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground-muted font-medium hover:bg-white/5 hover:text-white transition-colors">
                        <Users className="w-5 h-5" />
                        Candidates
                    </a>
                    <a href="/dashboard/applications/create" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground-muted font-medium hover:bg-white/5 hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                        Applications
                    </a>
                </div>

                <div className="p-4 border-t border-border-subtle">
                    <a href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground-muted font-medium hover:bg-white/5 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </a>

                    <div className="mt-4 flex items-center gap-3 px-4 py-2 border border-border-subtle rounded-3xl bg-background-surface">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs ring-1 ring-blue-500/30">
                            JS
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">Jane Smith</span>
                            <span className="text-xs text-foreground-muted">Recruiter</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 relative min-h-screen pb-12">
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 h-20 glass-panel border-b border-border-subtle flex items-center justify-between px-8">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-96 hidden lg:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                            <input
                                type="text"
                                placeholder="Search candidates, jobs..."
                                className="w-full bg-background-surface border border-border-subtle rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-foreground-muted/70"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-background-surface-hover transition-colors relative">
                            <Bell className="w-4 h-4 text-foreground-muted" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand-500"></span>
                        </button>
                        <a href="/dashboard/applications/create" className="px-5 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            <Plus className="w-4 h-4" /> New Hire
                        </a>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
