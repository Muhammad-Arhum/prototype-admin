'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Cog } from 'lucide-react';
import { getCollectionData, saveData, generateId } from '@/lib/db';

interface Workshop {
    id?: string;
    icon: string;
    title: string;
    description: string;
    content: string;
}

const ICON_OPTIONS = ['Heart', 'Brain', 'Bot', 'Cog', 'Users', 'Rocket', 'Activity', 'Code', 'Shield', 'FileText', 'Search'];

export default function WorkshopsAdminPage() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [form, setForm] = useState<Workshop>({ icon: 'Brain', title: '', description: '', content: '' });

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const data = await getCollectionData('workshops');
            setWorkshops(data as Workshop[]);
        } catch (error) {
            console.error('Failed to fetch workshops', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        let newList = [...workshops];
        if (isAdding) {
            const newWorkshop = { ...form, id: generateId(workshops.length + 1) };
            newList.push(newWorkshop);
        } else if (editingIndex !== null) {
            newList[editingIndex] = form;
        }

        const success = await saveData('workshops', newList);
        if (success) {
            setWorkshops(newList);
            setIsAdding(false);
            setEditingIndex(null);
            setForm({ icon: 'Brain', title: '', description: '', content: '' });
        } else {
            alert('Failed to save. Check Firebase rules.');
        }
    };

    const handleDelete = async (index: number) => {
        if (confirm('Delete this workshop?')) {
            const newList = workshops.filter((_, i) => i !== index);
            if (await saveData('workshops', newList)) {
                setWorkshops(newList);
            }
        }
    };

    const startEdit = (index: number) => {
        setEditingIndex(index);
        setForm(workshops[index]);
        setIsAdding(false);
    };

    const startAdd = () => {
        setForm({ icon: 'Brain', title: '', description: '', content: '' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div className="p-8">Loading Workshops Data...</div>;

    return (
        <div className="max-w-6xl mx-auto px-1 sm:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Workshops</h2>
                <button onClick={startAdd} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                    <Plus size={20} /> Add Module
                </button>
            </div>

            {(isAdding || editingIndex !== null) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-800">{isAdding ? 'New Module' : 'Edit Module'}</h3>
                            <button onClick={() => { setIsAdding(false); setEditingIndex(null); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Module Title</label>
                                <input placeholder="e.g. Cardiovascular Devices" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Icon Selection</label>
                                    <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white font-medium">
                                        {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5 opacity-60">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Stream</label>
                                    <input value="Technical MedTech" disabled className="w-full border-slate-200 rounded-xl p-3 bg-slate-50 text-sm font-medium" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Quick Summary</label>
                                <textarea rows={2} placeholder="Summary for student cards..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Curriculum Details</label>
                                <textarea rows={6} placeholder="Full lesson plan and resources..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button onClick={() => { setIsAdding(false); setEditingIndex(null); }} className="flex-1 px-4 py-3 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={handleSave} className="flex-[2] bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98]">Save Module</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {workshops.map((w, i) => (
                    <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-all flex flex-col h-full bg-gradient-to-br from-white to-slate-50/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                {w.icon[0]}
                            </div>
                            <div className="flex gap-1 ml-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(i)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(i)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{w.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">{w.description}</p>
                        <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {w.content?.length || 0} characters recorded
                        </div>
                    </div>
                ))}

                {workshops.length === 0 && (
                    <div className="col-span-full py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <Cog size={48} className="mb-4 opacity-20" />
                        <p className="font-bold">No workshop modules found in database.</p>
                        <p className="text-sm mt-1">Click "Add Module" to begin building your series.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
