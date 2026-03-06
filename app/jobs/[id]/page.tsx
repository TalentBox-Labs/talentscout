import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle2, Hexagon, Layers, ArrowRight } from 'lucide-react';

export default function PublicJobPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen text-foreground-base bg-background-base font-sans selection:bg-brand-500/30 selection:text-white">

            {/* Public Navbar (no sidebar) */}
            <nav className="fixed top-0 inset-x-0 z-50 h-20 glass-panel border-b border-border-subtle flex items-center justify-between px-8 bg-background-base/80">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                        <Hexagon className="w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">Acme Corp</span>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="text-sm font-medium text-foreground-muted hover:text-white transition-colors flex items-center">Careers Home</a>
                </div>
            </nav>

            <main className="pt-20 pb-24">
                {/* Massive Hero Section */}
                <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 to-background-base -z-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-500/30 text-sm font-medium text-brand-400 mb-8 border transition-all hover:bg-white/5">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Accepting Applications
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl leading-tight text-white drop-shadow-2xl">
                        Senior Frontend Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">(React)</span>
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-base md:text-lg text-foreground-muted mb-12">
                        <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-brand-400" /> Engineering</span>
                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-400" /> Remote (US)</span>
                        <span className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-green-400" /> $140k - $180k</span>
                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-amber-400" /> Full-time</span>
                    </div>

                    <button className="px-10 py-5 rounded-full bg-white text-black text-lg font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 group">
                        Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </section>

                {/* Content Section layout */}
                <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="md:col-span-2 space-y-12 prose prose-invert prose-lg prose-zinc text-foreground-muted">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
                            <p>
                                At Acme Corp, we are building the next generation of financial tools. We need a Senior Frontend Engineer who dreams in components and lives for performance. You'll be joining a high-velocity team focused on delivering a flawless UI/UX for our enterprise clients.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">What you'll do</h2>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" /> <span>Lead the architecture and development of our core web applications using React and Next.js.</span></li>
                                <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" /> <span>Collaborate closely with product managers and designers to iterate on features.</span></li>
                                <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" /> <span>Mentor junior engineers and establish frontend engineering standards.</span></li>
                                <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0 mt-0.5" /> <span>Optimize the application for maximum speed and scalability.</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-[24px] border-l-4 border-l-brand-500">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-brand-400" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">React</span>
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">Next.js</span>
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">TypeScript</span>
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">Tailwind CSS</span>
                                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">Zustand</span>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Benefits</h3>
                            <ul className="space-y-3 text-sm text-foreground-muted">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span> Premium Health Coverage</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span> Unlimited PTO</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span> $2,000 WFH Stipend</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span> 401(k) Match</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
