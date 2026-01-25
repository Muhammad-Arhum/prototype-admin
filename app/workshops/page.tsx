'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCollectionData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Brain, Bot, Cog, ArrowLeft, ArrowRight, Activity, Users, Code, Wrench, Cpu, Rocket, BarChart3, Shield, FileText, Search } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    Heart,
    Brain,
    Bot,
    Cog,
    Users,
    Code,
    Wrench,
    Cpu,
    Rocket,
    Activity,
    BarChart3,
    Shield,
    FileText,
    Search
};

export default function WorkshopsListingPage() {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionData('workshops').then((data) => {
            setWorkshops(data);
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Woodside Workshops</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Deep-dive sessions into cutting-edge medical technology led by industry experts and academic researchers.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="nexus-card animate-pulse h-40 bg-muted/50" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {workshops.length > 0 ? (
                                workshops.map((workshop, index) => {
                                    const Icon = iconMap[workshop.icon] || Cog;
                                    return (
                                        <motion.div
                                            key={workshop.id || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="nexus-card group relative overflow-hidden flex flex-col h-full"
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-card shadow-sm border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                    <Icon size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                        <Link href={`/workshops/${workshop.id || index}`}>
                                                            {workshop.title}
                                                        </Link>
                                                    </h2>
                                                    <p className="text-muted-foreground line-clamp-2">
                                                        {workshop.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-border/50">
                                                <Link
                                                    href={`/workshops/${workshop.id || index}`}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline transition-all"
                                                >
                                                    Workshop Details <ArrowRight size={16} />
                                                </Link>
                                                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                    Series Module
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-muted-foreground col-span-full py-20">
                                    Our workshop series is being updated. New modules coming soon!
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
