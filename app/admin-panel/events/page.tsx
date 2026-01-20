'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getCollectionData, saveData } from '@/lib/db';

interface Event {
    id?: string;
    icon: string;
    title: string;
    description: string;
    type: string;
}

const ICON_OPTIONS = ['Users', 'Code', 'Wrench', 'Cpu', 'Rocket', 'Activity', 'Bot', 'Brain', 'BarChart3', 'Shield', 'FileText', 'Search'];

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Event>({ icon: 'Users', title: '', description: '', type: '' });
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
            newEvents.push(editForm);
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
        setEditForm({ icon: 'Users', title: '', description: '', type: '' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div>Loading Cloud Data...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Manage Events</h2>
                <button onClick={startAdd} className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                    <Plus size={20} /> Add Event
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{isAdding ? 'Add Event' : 'Edit Event'}</h3>
                        <div className="space-y-4">
                            <input placeholder="Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border rounded p-2" />
                            <input placeholder="Type" value={editForm.type} onChange={e => setEditForm({ ...editForm, type: e.target.value })} className="w-full border rounded p-2" />
                            <textarea placeholder="Description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full border rounded p-2" />
                            <select value={editForm.icon} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} className="w-full border rounded p-2">
                                {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                            <div className="flex justify-end gap-2 pt-4">
                                <button onClick={() => { setEditingIndex(null); setIsAdding(false); }} className="px-4 py-2 text-slate-600">Cancel</button>
                                <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded">Save to Cloud</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow border border-slate-200 flex justify-between">
                        <div>
                            <div className="font-bold">{event.title} <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded ml-2">{event.type}</span></div>
                            <div className="text-sm text-slate-500 mt-1">{event.description}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => handleEdit(index)} className="p-2 text-blue-600"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(index)} className="p-2 text-red-600"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
