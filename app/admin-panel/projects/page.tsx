'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData } from '@/lib/db';

interface Project {
    id?: string;
    icon: string;
    title: string;
    description: string;
    color: string;
}

const ICON_OPTIONS = ['Users', 'Code', 'Wrench', 'Cpu', 'Rocket', 'Activity', 'Bot', 'Brain', 'BarChart3', 'Shield', 'FileText', 'Search'];
const COLOR_OPTIONS = ['bg-nexus-teal-light', 'bg-nexus-blue-light', 'bg-nexus-mint'];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Project>({ icon: 'Activity', title: '', description: '', color: 'bg-nexus-teal-light' });
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
        if (isAdding) newProjects.push(editForm);
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Manage Projects</h2>
                <button onClick={() => { setIsAdding(true); setEditingIndex(null); setEditForm({ icon: 'Activity', title: '', description: '', color: 'bg-nexus-teal-light' }); }} className="bg-teal-600 text-white px-4 py-2 rounded-lg">+</button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{isAdding ? 'Add' : 'Edit'}</h3>
                        <div className="space-y-4">
                            <input placeholder="Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border rounded p-2" />
                            <textarea placeholder="Description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full border rounded p-2" />
                            <select value={editForm.icon} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} className="w-full border rounded p-2">
                                {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                            <select value={editForm.color} onChange={e => setEditForm({ ...editForm, color: e.target.value })} className="w-full border rounded p-2">
                                {COLOR_OPTIONS.map(color => <option key={color} value={color}>{color}</option>)}
                            </select>
                            <div className="flex justify-end gap-2 pt-4">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="px-4 py-2">Cancel</button>
                                <button onClick={handleSave} className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow border flex justify-between">
                        <div>
                            <div className="font-bold">{p.title}</div>
                            <div className="text-sm text-slate-500">{p.description}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => { setEditingIndex(i); setEditForm(p); setIsAdding(false); }} className="text-blue-600">Edit</button>
                            <button onClick={() => handleDelete(i)} className="text-red-600">Del</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
