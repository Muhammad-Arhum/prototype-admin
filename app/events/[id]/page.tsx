'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getItemData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowLeft, Users, Code, Wrench, Cpu, Rocket, Activity, Bot, Brain, BarChart3, Shield, FileText, Search, Share2, Ticket } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    Users,
    Code,
    Wrench,
    Cpu,
    Rocket,
    Activity,
    Bot,
    Brain,
    BarChart3,
    Shield,
    FileText,
    Search
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItemData('events', id).then((data) => {
            setEvent(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container max-w-4xl">
                        <div className="h-8 w-32 bg-muted animate-pulse mb-8 rounded" />
                        <div className="h-12 w-full bg-muted animate-pulse mb-4 rounded" />
                        <div className="h-4 w-1/2 bg-muted animate-pulse mb-12 rounded" />
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                <div className="h-64 w-full bg-muted animate-pulse rounded-xl" />
                                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                            </div>
                            <div className="h-64 w-full bg-muted animate-pulse rounded-xl" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container text-center">
                        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                        <p className="text-muted-foreground mb-8">This event may have been past or cancelled.</p>
                        <Link href="/events" className="nexus-btn-primary">
                            Back to Events
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const Icon = iconMap[event.icon] || Calendar;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="nexus-container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <Link href="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                            <ArrowLeft size={16} />
                            Back to all events
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                {event.type}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
                            {event.title}
                        </h1>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="bg-muted/30 rounded-2xl p-8 mb-8 border border-border">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FileText className="text-primary" size={20} />
                                        About the Event
                                    </h2>
                                    <p className="text-lg text-slate-300 leading-relaxed">
                                        {event.description}
                                    </p>
                                    <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                                        <Icon size={32} className="text-primary" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold">Registration details</h2>
                                    <p className="text-muted-foreground">
                                        Details on how to participate will be sent to registered members. For public events, registration is typically free but mandatory.
                                    </p>
                                </div>
                            </div>

                            <aside className="space-y-6">
                                <div className="bg-card border border-border rounded-2xl p-6 shadow-xl sticky top-32">
                                    <h3 className="text-lg font-bold mb-6">Event Info</h3>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Calendar size={18} className="text-primary" />
                                            <span>Date: TBC</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Clock size={18} className="text-primary" />
                                            <span>Time: TBC</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <MapPin size={18} className="text-primary" />
                                            <span>Location: Virtual / On-site</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors mb-4">
                                        <Ticket size={20} />
                                        Register Now
                                    </button>

                                    <button className="w-full bg-secondary text-secondary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors">
                                        <Share2 size={20} />
                                        Share Event
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
