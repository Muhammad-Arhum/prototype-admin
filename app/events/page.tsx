'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Event {
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
            const res = await fetch('/api/events');
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setLoading(false);
        }
    };

    const saveEvents = async (newEvents: Event[]) => {
        try {
            await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvents),
            });
            setEvents(newEvents);
            setEditingIndex(null);
            setIsAdding(false);
        } catch (error) {
            console.error('Failed to save events', error);
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditForm(events[index]);
        setIsAdding(false);
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            const newEvents = events.filter((_, i) => i !== index);
            saveEvents(newEvents);
        }
    };

    const handleSave = () => {
        let newEvents = [...events];
        if (isAdding) {
            newEvents.push(editForm);
        } else if (editingIndex !== null) {
            newEvents[editingIndex] = editForm;
        }
        saveEvents(newEvents);
    };

    const startAdd = () => {
        setEditForm({ icon: 'Users', title: '', description: '', type: '' });
        setIsAdding(true);
        setEditingIndex(null);
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Manage Events</h2>
                <button
                    onClick={startAdd}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <Plus size={20} /> Add Event
                </button>
            </div>

            {(editingIndex !== null || isAdding) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{isAdding ? 'Add Event' : 'Edit Event'}</h3>
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <input
                                    type="text"
                                    value={editForm.type}
                                    onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                    className="w-full border rounded p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full border rounded p-2 rows-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Icon</label>
                                <select
                                    value={editForm.icon}
                                    onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                                    className="w-full border rounded p-2"
                                >
                                    {ICON_OPTIONS.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {events.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow border border-slate-200 flex justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl font-semibold">{event.title}</span>
                                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{event.type}</span>
                            </div>
                            <p className="text-slate-600 text-sm mb-2">{event.description}</p>
                            <div className="text-xs text-slate-400">Icon: {event.icon}</div>
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
            </div>
        </div>
    );
}
