'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData, generateId } from '@/lib/db';

interface Event {
    id?: string;
    icon: string;
    title: string;
    description: string;
    type: string;
    content: string;
}

const ICON_OPTIONS = ['Users', 'Code', 'Wrench', 'Cpu', 'Rocket', 'Activity', 'Bot', 'Brain', 'BarChart3', 'Shield', 'FileText', 'Search'];

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Event>({ icon: 'Users', title: '', description: '', type: '', content: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getCollectionData('events');
            setEvents(data as Event[]);
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        let newEvents = [...events];
        if (isAdding) {
            const newEvent = { ...editForm, id: generateId(events.length + 1) };
            newEvents.push(newEvent);
        } else if (editingIndex !== null) {
            newEvents[editingIndex] = editForm;
        }

        const success = await saveData('events', newEvents);
        if (success) {
            setEvents(newEvents);
            setEditingIndex(null);
            setIsAdding(false);
        } else {
            alert('Failed to save to Realtime Database. Please check your Firebase Console rules and ensure RTDB is enabled.');
        }
    };

    const handleDelete = async (index: number) => {
        if (confirm('Are you sure?')) {
            const newEvents = events.filter((_, i) => i !== index);
            const success = await saveData('events', newEvents);
            if (success) setEvents(newEvents);
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditForm(events[index]);
        setIsAdding(false);
    };

    const startAdd = () => {
        setEditForm({ icon: 'Users', title: '', description: '', type: '', content: '' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div>Loading Cloud Data...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Events</h2>
                <button onClick={startAdd} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg active:scale-95">
                    <Plus size={20} /> Add Event
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">{isAdding ? 'New Event' : 'Edit Event'}</h3>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Event Title</label>
                                <input placeholder="e.g. Women in MedTech" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Type</label>
                                    <input placeholder="Talk, Workshop..." value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Icon</label>
                                    <select value={editForm.icon} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-white">
                                        {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Short Description</label>
                                <textarea rows={2} placeholder="Brief summary for listings..." value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Rich Details</label>
                                <textarea placeholder="Full itinerary, registration links, etc..." value={editForm.content} onChange={e => setEditForm({ ...editForm, content: e.target.value })} className="w-full border-slate-200 rounded-xl p-3 h-40 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                            </div>
                            <div className="flex gap-3 pt-6">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="flex-1 px-4 py-3 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={handleSave} className="flex-[2] bg-teal-600 text-white font-bold py-3 rounded-xl hover:bg-teal-700 transition-all shadow-md active:scale-[0.98]">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {events.map((event, index) => (
                    <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between group hover:border-teal-200 transition-all">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-lg text-slate-900 leading-tight">{event.title}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{event.type}</span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-3">{event.description}</p>
                        </div>
                        <div className="flex gap-1 ml-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(index)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(index)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
