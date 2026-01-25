import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { BookOpen, User, CalendarDays, ArrowRight } from 'lucide-react';
import { getCollectionData } from '@/lib/db';
import Link from 'next/link';

export const BlogSection = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        getCollectionData('posts').then(setPosts);
    }, []);

    return (
        <section id="blog" className="nexus-section">
            <div className="nexus-container">
                <div ref={ref} className="mb-12 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="nexus-badge mb-4"
                    >
                        <BookOpen size={14} className="mr-1.5" />
                        Blog
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-4 text-3xl font-bold md:text-4xl"
                    >
                        Latest Updates
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-muted-foreground"
                    >
                        News, insights, and stories from the Nexus MedTech community.
                    </motion.p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                            className="nexus-card group flex flex-col"
                        >
                            <Link href={`/blog/${post.id}`} className="flex-1 mb-4 block">
                                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <User size={12} />
                                        {post.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CalendarDays size={12} />
                                        {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {post.excerpt || (post.content ? post.content.substring(0, 100) + '...' : 'Read more...')}
                                </p>
                            </Link>
                            <Link
                                href={`/blog/${post.id}`}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline hover:gap-2 transition-all"
                            >
                                Read More <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link href="/blog" className="nexus-btn-primary group">
                        View All Posts
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
