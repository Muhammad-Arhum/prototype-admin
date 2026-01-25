'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData, generateId } from '@/lib/db';

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
            const newPost = {
                ...editForm,
                id: generateId(posts.length + 1),
                date: new Date().toISOString()
            };
            newPosts.push(newPost);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Blog</h2>
                <button onClick={() => { setIsAdding(true); setEditingIndex(null); setEditForm({ title: '', excerpt: '', content: '', date: '', author: 'Admin' }); }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg active:scale-95">
                    <Plus size={20} /> New Post
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{isAdding ? 'New Story' : 'Edit Story'}</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Post Title</label>
                                    <input placeholder="e.g. Welcome to Nexus" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Author</label>
                                    <input placeholder="Admin" value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Excerpt (Brief Summary)</label>
                                <textarea rows={2} placeholder="Brief summary for listings..." value={editForm.excerpt} onChange={e => setEditForm({ ...editForm, excerpt: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Full Story Content</label>
                                <textarea rows={8} placeholder="Markdown supported..." value={editForm.content} onChange={e => setEditForm({ ...editForm, content: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="flex-1 px-4 py-3 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={handleSave} className="flex-[2] bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-all shadow-md active:scale-[0.98]">Publish Story</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:gap-6">
                {posts.map((p, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between group hover:border-purple-200 transition-all">
                        <div className="space-y-2 min-w-0 flex-1">
                            <h4 className="font-bold text-lg text-slate-900 truncate leading-tight">{p.title}</h4>
                            <p className="text-sm text-slate-500 line-clamp-2">{p.excerpt}</p>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">By {p.author} • {new Date(p.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex gap-1 ml-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingIndex(i); setEditForm(p); setIsAdding(false); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                            <button onClick={async () => { if (confirm('Delete this post?')) { const n = posts.filter((_, idx) => idx !== i); if (await saveData('posts', n)) setPosts(n); } }} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
