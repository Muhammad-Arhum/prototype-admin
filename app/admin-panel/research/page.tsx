'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, BookOpen, User as UserIcon, FileText } from 'lucide-react';
import { getCollectionData, saveData, generateId } from '@/lib/db';

interface ResearchArticle {
    id?: string;
    title: string;
    description: string;
    author: string;
    content: string;
}

export default function ResearchAdminPage() {
    const [articles, setArticles] = useState<ResearchArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [form, setForm] = useState<ResearchArticle>({ title: '', description: '', author: 'Deepak Jeyarajan', content: '' });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const data = await getCollectionData('research');
            setArticles(data as ResearchArticle[]);
        } catch (error) {
            console.error('Failed to fetch research articles', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        let newList = [...articles];
        if (isAdding) {
            const newArticle = { ...form, id: generateId(articles.length + 1) };
            newList.push(newArticle);
        } else if (editingIndex !== null) {
            newList[editingIndex] = form;
        }

        const success = await saveData('research', newList);
        if (success) {
            setArticles(newList);
            setIsAdding(false);
            setEditingIndex(null);
            setForm({ title: '', description: '', author: 'Deepak Jeyarajan', content: '' });
        } else {
            alert('Failed to save. Check Firebase rules.');
        }
    };

    const handleDelete = async (index: number) => {
        if (confirm('Delete this research article?')) {
            const newList = articles.filter((_, i) => i !== index);
            if (await saveData('research', newList)) {
                setArticles(newList);
            }
        }
    };

    const startEdit = (index: number) => {
        setEditingIndex(index);
        setForm(articles[index]);
        setIsAdding(false);
    };

    const startAdd = () => {
        setForm({ title: '', description: '', author: 'Deepak Jeyarajan', content: '' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div className="p-8">Loading Research Library...</div>;

    return (
        <div className="max-w-6xl mx-auto px-1 sm:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 text-center sm:text-left">
                <div className="flex items-center gap-4 mx-auto sm:mx-0">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl hidden sm:block">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Research Library</h2>
                        <p className="text-slate-500 text-sm font-medium lowercase tracking-wide">Manage analytical papers</p>
                    </div>
                </div>
                <button onClick={startAdd} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    <Plus size={20} /> New Paper
                </button>
            </div>

            {(isAdding || editingIndex !== null) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 w-full max-w-3xl border border-slate-200 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <FileText className="text-primary" size={28} />
                                <h3 className="text-2xl font-black text-slate-900">{isAdding ? 'Publish Research' : 'Refine Paper'}</h3>
                            </div>
                            <button onClick={() => { setIsAdding(false); setEditingIndex(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Title</label>
                                    <input placeholder="e.g. Medicine's Information Flow" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-slate-200 bg-slate-50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Author</label>
                                    <input placeholder="Deepak Jeyarajan" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full border-slate-200 bg-slate-50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Executive Summary</label>
                                <textarea rows={3} placeholder="A brief overview for the library..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border-slate-200 bg-slate-50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm md:text-base" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Full Content (Markdown)</label>
                                <textarea rows={10} placeholder="Paste your research here..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full border-slate-200 bg-slate-50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-serif text-base md:text-lg" />
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
                                <button onClick={() => { setIsAdding(false); setEditingIndex(null); }} className="w-full sm:flex-1 px-4 py-4 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-colors uppercase tracking-widest text-xs">Discard</button>
                                <button onClick={handleSave} className="w-full sm:flex-[2] flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl active:scale-95 shadow-primary/20">
                                    <Save size={18} /> Update Library
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:gap-6">
                {articles.map((a, i) => (
                    <div key={i} className="group bg-white p-5 md:p-8 rounded-[2rem] border border-slate-200 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-xl group">
                        <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                            <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                                <FileText size={24} />
                            </div>
                            <div className="min-w-0 pr-4">
                                <h4 className="text-lg md:text-xl font-black text-slate-900 mb-1 truncate">{a.title}</h4>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-400">
                                    <span className="flex items-center gap-1.5 uppercase tracking-wider"><UserIcon size={12} /> {a.author}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="uppercase tracking-widest text-[10px]">{a.content?.length || 0} chars recorded</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity justify-end">
                            <button onClick={() => startEdit(i)} className="px-5 py-2.5 rounded-xl font-bold text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all text-sm">Edit</button>
                            <button onClick={() => handleDelete(i)} className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}

                {articles.length === 0 && (
                    <div className="py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <BookOpen size={64} className="mb-6 opacity-10" />
                        <p className="font-black uppercase tracking-widest text-sm">Library Empty</p>
                        <p className="font-medium mt-2">Publish your first research paper to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
