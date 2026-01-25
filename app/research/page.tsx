'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCollectionData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, User, Calendar, ArrowLeft, ArrowRight, BookOpen, Search } from 'lucide-react';

export default function ResearchListingPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionData('research').then((data) => {
            setArticles(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="nexus-container">
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors font-medium">
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Research & Insights</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                            Pioneering research papers and analytical pieces exploring the intersection of AI and modern medicine.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="nexus-card animate-pulse h-80 bg-muted/50" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {articles.length > 0 ? (
                                articles.map((article, index) => (
                                    <motion.div
                                        key={article.id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="nexus-card group flex flex-col h-full bg-slate-900/40 border-slate-800 transition-all hover:border-primary/50"
                                    >
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <FileText size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                                <Link href={`/research/${article.id || index}`}>
                                                    {article.title}
                                                </Link>
                                            </h2>
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <User size={14} className="text-primary" />
                                                    {article.author}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-8 line-clamp-4 leading-relaxed font-medium">
                                                {article.description}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/research/${article.id || index}`}
                                            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mt-auto"
                                        >
                                            Read Full Paper <ArrowRight size={18} />
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground col-span-full py-20 font-bold text-lg">
                                    No research papers available at the moment.
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
