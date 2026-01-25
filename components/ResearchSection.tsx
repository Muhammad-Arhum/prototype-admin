import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FileText, ArrowRight, User } from 'lucide-react';
import { getCollectionData } from '@/lib/db';
import Link from 'next/link';

export const ResearchSection = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        getCollectionData('research').then((data) => {
            setArticles(data.slice(0, 3)); // Only show top 3 on landing page
        });
    }, []);

    return (
        <section id="research" className="nexus-section bg-slate-900/10">
            <div className="nexus-container">
                <div ref={ref} className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="nexus-badge mb-4"
                    >
                        <FileText size={14} className="mr-1.5" />
                        Research Hub
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-4 text-3xl font-bold md:text-4xl"
                    >
                        Latest Insights & Papers
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-muted-foreground font-medium"
                    >
                        Deep-dives into the technological frameworks and clinical studies conducted by the Nexus MedTech research team.
                    </motion.p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                            className="nexus-card group flex flex-col h-full"
                        >
                            <Link href={`/research/${article.id}`} className="flex-1 block">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                    <FileText size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                                    <User size={14} className="text-primary" />
                                    {article.author}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed mb-6">
                                    {article.description}
                                </p>
                            </Link>
                            <Link
                                href={`/research/${article.id}`}
                                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline group/btn"
                            >
                                Read Paper
                                <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {articles.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground font-semibold border border-dashed border-border rounded-xl">
                        Loading research papers...
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link href="/research" className="nexus-btn-primary group">
                        Explore Research Library
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
