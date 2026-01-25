'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getItemData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, ArrowLeft, ArrowRight, Activity, Bot, Brain, BarChart3, Shield, FileText, Search, Cpu, Users, Rocket, Wrench, ExternalLink, Github } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    Activity,
    Bot,
    Brain,
    BarChart3,
    Shield,
    FileText,
    Search,
    Cpu,
    Users,
    Rocket,
    Wrench
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItemData('projects', id).then((data) => {
            setProject(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container max-w-5xl">
                        <div className="h-8 w-32 bg-muted animate-pulse mb-8 rounded" />
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="h-16 w-16 bg-muted animate-pulse rounded-2xl" />
                                <div className="h-14 w-full bg-muted animate-pulse rounded" />
                                <div className="h-32 w-full bg-muted animate-pulse rounded" />
                            </div>
                            <div className="h-96 w-full bg-muted animate-pulse rounded-3xl" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container text-center">
                        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                        <Link href="/projects" className="nexus-btn-primary">
                            Back to Projects
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const Icon = iconMap[project.icon] || FolderKanban;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20">
                <div className="nexus-container max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-12 transition-colors font-medium">
                            <ArrowLeft size={16} />
                            Back to all core projects
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div className="order-2 lg:order-1">
                                <div
                                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${project.color || 'bg-primary/10'}`}
                                >
                                    <Icon size={32} className="text-primary" />
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    {project.title}
                                </h1>

                                <div className="prose prose-invert max-w-none mb-10">
                                    <p className="text-xl text-slate-300 leading-relaxed mb-6 font-medium">
                                        {project.description}
                                    </p>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        This initiative focuses on leveraging advanced technological frameworks to address complex clinical needs. By integrating AI and precision engineering, we aim to redefine the standards of modern medical practice.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button className="nexus-btn-primary flex items-center gap-2">
                                        View Case Study <ArrowRight size={18} />
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all border border-border">
                                        <Github size={20} /> Repository
                                    </button>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-12 overflow-hidden group shadow-2xl">
                                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                                    <div className="relative z-10 scale-150 transform group-hover:scale-110 transition-transform duration-700">
                                        <Icon size={120} className="text-primary/40" />
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 p-6 blur-backdrop rounded-2xl border border-white/10 bg-black/20">
                                        <div className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">Status</div>
                                        <div className="text-lg font-bold">Active Research</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
