'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getCollectionData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, CalendarDays, ArrowLeft } from 'lucide-react';

export default function BlogListingPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollectionData('posts').then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="nexus-container">
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nexus Blog</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Insights, updates, and stories from the Nexus MedTech community.
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
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <motion.div
                                        key={post.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="nexus-card group flex flex-col h-full"
                                    >
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                                <Link href={`/blog/${post.id || index}`}>
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                <span className="flex items-center gap-1">
                                                    <User size={14} />
                                                    {post.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <CalendarDays size={14} />
                                                    {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-6 line-clamp-4">
                                                {post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'Read more...')}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/blog/${post.id || index}`}
                                            className="inline-flex items-center text-primary font-semibold hover:underline mt-auto"
                                        >
                                            Read Full Article
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground col-span-full py-20">
                                    No posts found. check back later!
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
