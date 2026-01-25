'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, FolderKanban, BookOpen, LogOut, Cog, Menu, X } from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authorized, setAuthorized] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (isAuth !== 'true') {
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        router.push('/login');
    };

    if (!authorized) return <div className="min-h-screen bg-slate-100 flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-6 z-50">
                <h1 className="text-xl font-bold text-teal-400">Nexus Admin</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-white p-6 flex flex-col z-50
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <h1 className="text-2xl font-bold mb-8 text-teal-400 hidden lg:block">Nexus Admin</h1>

                {/* Mobile Sidebar Close Button */}
                <div className="lg:hidden flex justify-end mb-6">
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <nav className="space-y-4 flex-1">
                    <Link href="/admin-panel" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin-panel/events" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <Calendar size={20} />
                        Events
                    </Link>
                    <Link href="/admin-panel/projects" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <FolderKanban size={20} />
                        Projects
                    </Link>
                    <Link href="/admin-panel/blog" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <BookOpen size={20} />
                        Blog Posts
                    </Link>
                    <Link href="/admin-panel/workshops" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <Cog size={20} />
                        Workshops
                    </Link>
                    <Link href="/admin-panel/research" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <BookOpen size={20} />
                        Research Library
                    </Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-900/50 text-red-400 transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
