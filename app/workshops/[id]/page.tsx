'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getItemData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Brain, Bot, Cog, ArrowLeft, ArrowRight, Share2, Users, Rocket, Activity, Code, Shield, FileText, CheckCircle2, PlayCircle } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    Heart,
    Brain,
    Bot,
    Cog,
    Users,
    Rocket,
    Activity,
    Code,
    Shield,
    FileText
};

export default function WorkshopDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [workshop, setWorkshop] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItemData('workshops', id).then((data) => {
            setWorkshop(data);
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
                        <div className="h-12 w-3/4 bg-muted animate-pulse mb-12 rounded" />
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="h-64 w-full bg-muted animate-pulse rounded-2xl" />
                                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            </div>
                            <div className="space-y-6">
                                <div className="h-40 w-full bg-muted animate-pulse rounded-2xl" />
                                <div className="h-40 w-full bg-muted animate-pulse rounded-2xl" />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="min-h-screen bg-background text-center pt-40">
                <h1 className="text-2xl font-bold mb-4">Workshop Not Found</h1>
                <Link href="/workshops" className="nexus-btn-primary">Back to Workshops</Link>
            </div>
        );
    }

    const Icon = iconMap[workshop.icon] || Cog;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="nexus-container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link href="/workshops" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                            <ArrowLeft size={16} />
                            Back to workshop series
                        </Link>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                                <Icon size={40} />
                            </div>
                            <div>
                                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Woodside Workshop Series</span>
                                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                    {workshop.title}
                                </h1>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-10">
                                <section>
                                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                                    <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                        {workshop.description}
                                    </p>
                                    {workshop.content && (
                                        <div className="p-6 bg-muted/30 rounded-2xl border border-border mt-6">
                                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                                <PlayCircle size={18} className="text-primary" />
                                                What you'll learn
                                            </h3>
                                            <div className="prose prose-invert max-w-none text-slate-400">
                                                {workshop.content.split('\n').map((line: string, i: number) => (
                                                    <p key={i} className="mb-2">{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-6">Module Highlights</h2>
                                    <div className="grid gap-4">
                                        {[
                                            "Practical engineering principles",
                                            "Clinical integration strategies",
                                            "Case studies and live demos",
                                            "Interactive Q&A session"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl border border-border/50">
                                                <CheckCircle2 className="text-primary" size={20} />
                                                <span className="font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <aside className="space-y-6">
                                <div className="bg-card border border-border rounded-2xl p-6 shadow-xl sticky top-32">
                                    <h3 className="font-bold text-lg mb-4">Series Access</h3>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        This workshop is part of the integrated Woodside series. Enrollment provides access to all modules, recordings, and supporting materials.
                                    </p>

                                    <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all mb-4">
                                        Enroll in Series
                                    </button>

                                    <button className="w-full bg-secondary text-secondary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all">
                                        <Share2 size={18} />
                                        Inquire More
                                    </button>

                                    <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <Users size={16} className="text-primary" />
                                            <span>200+ Students enrolled</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <Code size={16} className="text-primary" />
                                            <span>Certificate available</span>
                                        </div>
                                    </div>
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
