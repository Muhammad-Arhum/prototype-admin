'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';
import { rtdb } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export default function LoginPage() {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const dbRef = ref(rtdb, '/');
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                if (loginId === data.username && password === data.password) {
                    localStorage.setItem('admin_auth', 'true');
                    router.push('/admin-panel');
                } else {
                    setError('Invalid credentials');
                }
            } else {
                setError('Database connection error');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Failed to connect to security database');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <div className="bg-teal-100 text-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                    <p className="text-slate-500">Nexus MedTech Management</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Login Identifier</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
