'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getItemData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, User, Calendar, ArrowLeft, Share2, Bookmark, Download, Quote } from 'lucide-react';

export default function ResearchDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItemData('research', id).then((data) => {
            setArticle(data);
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
                        <div className="h-16 w-full bg-muted animate-pulse mb-6 rounded" />
                        <div className="h-6 w-1/3 bg-muted animate-pulse mb-12 rounded" />
                        <div className="space-y-6">
                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            <div className="h-4 w-full bg-muted animate-pulse rounded" />
                            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background text-center pt-40 px-6">
                <h1 className="text-3xl font-bold mb-4">Paper Not Found</h1>
                <p className="text-muted-foreground mb-8">The research article you are looking for might have been moved or removed.</p>
                <Link href="/research" className="nexus-btn-primary">
                    Back to Research
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="nexus-container max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link href="/research" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10 transition-colors font-bold">
                            <ArrowLeft size={16} />
                            Back to research library
                        </Link>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-md text-[10px] font-black tracking-[0.2em] uppercase">
                                Research Paper
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-white/5 mb-12">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                                    <Quote size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">{article.author}</div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Lead Researcher</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all" aria-label="Share">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all" aria-label="Bookmark">
                                    <Bookmark size={20} />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black text-sm hover:scale-105 transition-transform">
                                    <Download size={18} /> PDF
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert max-w-none"
                    >
                        <div className="bg-slate-900/30 p-10 rounded-[2rem] border border-white/5 shadow-inner mb-12 italic text-xl text-slate-300 leading-relaxed font-medium">
                            {article.description}
                        </div>

                        {article.content ? (
                            <div className="space-y-8">
                                {article.content.split('\n\n').map((block: string, i: number) => {
                                    if (block.startsWith('###')) {
                                        return <h3 key={i} className="text-2xl font-bold text-primary mt-12 mb-4">{block.replace('###', '').trim()}</h3>;
                                    }
                                    if (block.startsWith('##')) {
                                        return <h2 key={i} className="text-3xl font-black text-foreground mt-16 mb-6">{block.replace('##', '').trim()}</h2>;
                                    }
                                    return (
                                        <p key={i} className="text-xl leading-relaxed text-slate-300/90 font-medium">
                                            {block}
                                        </p>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-xl italic text-muted-foreground py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">This research paper is currently being digitized. Please check back shortly.</p>
                        )}
                    </motion.div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
