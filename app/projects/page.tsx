'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCollectionData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, ArrowLeft, ArrowRight, Activity, Bot, Brain, BarChart3, Shield, FileText, Search, Cpu, Users, Rocket, Wrench } from 'lucide-react';

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

export default function ProjectsListingPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionData('projects').then((data) => {
            setProjects(data);
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Core Projects</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Exploring the frontier of medical AI, clinical benchmarking, and digital health innovation.
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
                            {projects.length > 0 ? (
                                projects.map((project, index) => {
                                    const Icon = iconMap[project.icon] || FolderKanban;
                                    return (
                                        <motion.div
                                            key={project.id || index}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="nexus-card group flex flex-col h-full overflow-hidden"
                                        >
                                            <div
                                                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${project.color || 'bg-primary/10'} transition-transform group-hover:scale-110`}
                                            >
                                                <Icon size={28} className="text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                    <Link href={`/projects/${project.id || index}`}>
                                                        {project.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-4">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/projects/${project.id || index}`}
                                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                                            >
                                                Learn More <ArrowRight size={18} />
                                            </Link>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-muted-foreground col-span-full py-20 font-medium">
                                    Our project portfolio is being updated. Check back soon.
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
