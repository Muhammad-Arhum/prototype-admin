'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData, generateId } from '@/lib/db';

interface Project {
    id?: string;
    icon: string;
    title: string;
    description: string;
    color: string;
    content: string;
}

const ICON_OPTIONS = ['Users', 'Code', 'Wrench', 'Cpu', 'Rocket', 'Activity', 'Bot', 'Brain', 'BarChart3', 'Shield', 'FileText', 'Search'];
const COLOR_OPTIONS = ['bg-nexus-teal-light', 'bg-nexus-blue-light', 'bg-nexus-mint'];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Project>({ icon: 'Activity', title: '', description: '', color: 'bg-nexus-teal-light', content: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => { fetchProjects(); }, []);

    const fetchProjects = async () => {
        try {
            const data = await getCollectionData('projects');
            setProjects(data as Project[]);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const handleSave = async () => {
        let newProjects = [...projects];
        if (isAdding) {
            const newProject = { ...editForm, id: generateId(projects.length + 1) };
            newProjects.push(newProject);
        }
        else if (editingIndex !== null) newProjects[editingIndex] = editForm;

        const success = await saveData('projects', newProjects);
        if (success) {
            setProjects(newProjects);
            setEditingIndex(null);
            setIsAdding(false);
        } else {
            alert('Failed to save to Realtime Database. Please check your Firebase Console rules and ensure RTDB is enabled.');
        }
    };

    const handleDelete = async (index: number) => {
        if (confirm('Delete?')) {
            const newProjects = projects.filter((_, i) => i !== index);
            if (await saveData('projects', newProjects)) setProjects(newProjects);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Projects</h2>
                <button onClick={() => { setIsAdding(true); setEditingIndex(null); setEditForm({ icon: 'Activity', title: '', description: '', color: 'bg-nexus-teal-light', content: '' }); }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg active:scale-95">
                    <Plus size={20} /> Add Project
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{isAdding ? 'New Project' : 'Edit Project'}</h3>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Project Title</label>
                                <input placeholder="e.g. Medical Benchmarking" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Short Summary</label>
                                <textarea rows={2} placeholder="Brief summary for listings..." value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Rich Details</label>
                                <textarea placeholder="Full methodology, findings, and diagrams..." value={editForm.content} onChange={e => setEditForm({ ...editForm, content: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 h-40 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Icon</label>
                                    <select value={editForm.icon} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-white">
                                        {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Brand Color</label>
                                    <select value={editForm.color} onChange={e => setEditForm({ ...editForm, color: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-white">
                                        {COLOR_OPTIONS.map(color => <option key={color} value={color}>{color}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="flex-1 px-4 py-3 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={handleSave} className="flex-[2] bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-[0.98]">Save Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {projects.map((p, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between group hover:border-teal-200 transition-all">
                        <div className="space-y-2">
                            <h4 className="font-bold text-lg text-slate-900 leading-tight">{p.title}</h4>
                            <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-3">{p.description}</p>
                        </div>
                        <div className="flex gap-1 ml-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingIndex(i); setEditForm(p); setIsAdding(false); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(i)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
