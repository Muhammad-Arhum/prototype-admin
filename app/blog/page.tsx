'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Post>({ id: '', title: '', excerpt: '', content: '', date: '', author: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setLoading(false);
        }
    };

    const savePosts = async (newPosts: Post[]) => {
        try {
            await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPosts),
            });
            setPosts(newPosts);
            setEditingIndex(null);
            setIsAdding(false);
        } catch (error) {
            console.error('Failed to save posts', error);
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditForm(posts[index]);
        setIsAdding(false);
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const newPosts = posts.filter((_, i) => i !== index);
            savePosts(newPosts);
        }
    };

    const handleSave = () => {
        let newPosts = [...posts];
        if (isAdding) {
            const newPost = { ...editForm, id: Date.now().toString(), date: new Date().toISOString() };
            newPosts.push(newPost);
        } else if (editingIndex !== null) {
            newPosts[editingIndex] = editForm;
        }
        savePosts(newPosts);
    };

    const startAdd = () => {
        setEditForm({ id: '', title: '', excerpt: '', content: '', date: '', author: 'Admin' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Manage Blog Posts</h2>
                <button
                    onClick={startAdd}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <Plus size={20} /> Create Post
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{isAdding ? 'New Post' : 'Edit Post'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Author</label>
                                    <input
                                        type="text"
                                        value={editForm.author}
                                        onChange={e => setEditForm({ ...editForm, author: e.target.value })}
                                        className="w-full border rounded p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Publish Date (Auto)</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={editForm.date || 'Now'}
                                        className="w-full border rounded p-2 bg-slate-100 text-slate-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Excerpt</label>
                                <textarea
                                    value={editForm.excerpt}
                                    onChange={e => setEditForm({ ...editForm, excerpt: e.target.value })}
                                    className="w-full border rounded p-2 rows-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <textarea
                                    value={editForm.content}
                                    onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                                    className="w-full border rounded p-2 h-48"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={() => { setEditingIndex(null); setIsAdding(false); }}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow border border-slate-200 flex justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-2">
                                <h3 className="text-xl font-semibold">{post.title}</h3>
                                <span className="text-xs text-slate-400">{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-slate-600 mb-2">{post.excerpt}</p>
                            <div className="text-xs text-slate-400">By {post.author}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && !loading && (
                    <div className="text-center text-slate-500 py-12">No posts found. Create one!</div>
                )}
            </div>
        </div>
    );
}
