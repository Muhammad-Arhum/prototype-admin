'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData } from '@/lib/db';

interface Post {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
}

export default function BlogAdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Post>({ title: '', excerpt: '', content: '', date: '', author: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => { fetchPosts(); }, []);

    const fetchPosts = async () => {
        const data = await getCollectionData('posts');
        setPosts(data as Post[]);
        setLoading(false);
    };

    const handleSave = async () => {
        let newPosts = [...posts];
        if (isAdding) {
            newPosts.push({ ...editForm, date: new Date().toISOString() });
        } else if (editingIndex !== null) {
            newPosts[editingIndex] = editForm;
        }
        if (await saveData('posts', newPosts)) {
            setPosts(newPosts);
            setEditingIndex(null);
            setIsAdding(false);
        } else {
            alert('Failed to save to Realtime Database. Please check your Firebase Console rules and ensure RTDB is enabled.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Blog</h2>
                <button onClick={() => { setIsAdding(true); setEditingIndex(null); setEditForm({ title: '', excerpt: '', content: '', date: '', author: 'Admin' }); }} className="bg-teal-600 text-white px-4 py-2 rounded-lg">New Post</button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{isAdding ? 'New' : 'Edit'}</h3>
                        <div className="space-y-4">
                            <input placeholder="Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border rounded p-2" />
                            <input placeholder="Author" value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} className="w-full border rounded p-2" />
                            <textarea placeholder="Excerpt" value={editForm.excerpt} onChange={e => setEditForm({ ...editForm, excerpt: e.target.value })} className="w-full border rounded p-2" />
                            <textarea placeholder="Content" value={editForm.content} onChange={e => setEditForm({ ...editForm, content: e.target.value })} className="w-full border rounded p-2 h-48" />
                            <div className="flex justify-end gap-2 pt-4">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="px-4 py-2">Cancel</button>
                                <button onClick={handleSave} className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {posts.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow border flex justify-between">
                        <div>
                            <div className="font-bold">{p.title}</div>
                            <div className="text-sm text-slate-500 line-clamp-2">{p.excerpt}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => { setEditingIndex(i); setEditForm(p); setIsAdding(false); }} className="text-blue-600">Edit</button>
                            <button onClick={async () => { if (confirm('Del?')) { const n = posts.filter((_, idx) => idx !== i); if (await saveData('posts', n)) setPosts(n); } }} className="text-red-600">Del</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
