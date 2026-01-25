'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCollectionData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight, Activity, Users, Code, Wrench, Cpu, Rocket, Bot, Brain, BarChart3, Shield, FileText, Search } from 'lucide-react';

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

export default function EventsListingPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionData('events').then((data) => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="nexus-container">
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nexus Events</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Join us at workshops, hackathons, and networking nights to grow your MedTech expertise.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="nexus-card animate-pulse h-64 bg-muted/50" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {events.length > 0 ? (
                                events.map((event, index) => {
                                    const Icon = iconMap[event.icon] || Calendar;
                                    return (
                                        <motion.div
                                            key={event.id || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="nexus-card group flex flex-col h-full"
                                        >
                                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary mb-6">
                                                <Icon
                                                    size={22}
                                                    className="text-secondary-foreground transition-colors group-hover:text-primary-foreground"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="inline-block rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-primary uppercase tracking-wider">
                                                        {event.type}
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                    <Link href={`/events/${event.id || index}`}>
                                                        {event.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                                    {event.description}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/events/${event.id || index}`}
                                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mt-auto"
                                            >
                                                Event Details <ArrowRight size={16} />
                                            </Link>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-muted-foreground col-span-full py-20">
                                    No upcoming events scheduled. Stay tuned!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
