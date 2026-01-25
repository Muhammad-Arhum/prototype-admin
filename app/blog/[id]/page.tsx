'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getItemData } from '@/lib/db';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, CalendarDays, ArrowLeft, Share2, Bookmark } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItemData('posts', id).then((data) => {
            setPost(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container max-w-3xl">
                        <div className="h-8 w-32 bg-muted animate-pulse mb-8 rounded" />
                        <div className="h-12 w-full bg-muted animate-pulse mb-4 rounded" />
                        <div className="h-4 w-1/2 bg-muted animate-pulse mb-12 rounded" />
                        <div className="space-y-4">
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

    if (!post) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-32 pb-20">
                    <div className="nexus-container text-center">
                        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                        <p className="text-muted-foreground mb-8">The article you are looking for might have been moved or deleted.</p>
                        <Link href="/blog" className="nexus-btn-primary">
                            Back to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="nexus-container max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                            <ArrowLeft size={16} />
                            Back to all posts
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {post.author?.[0] || 'A'}
                                </div>
                                <div>
                                    <div className="font-semibold">{post.author}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <CalendarDays size={14} />
                                        {post.date ? new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Recent'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground" aria-label="Share">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground" aria-label="Bookmark">
                                    <Bookmark size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-lg prose-invert max-w-none"
                    >
                        {post.content ? (
                            post.content.split('\n').map((para: string, i: number) => (
                                <p key={i} className="mb-6 text-lg leading-relaxed text-slate-300">
                                    {para}
                                </p>
                            ))
                        ) : (
                            <p className="text-lg italic text-muted-foreground">This post has no content yet.</p>
                        )}
                    </motion.div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
