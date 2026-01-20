'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, FolderKanban, BookOpen, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authorized, setAuthorized] = useState(false);
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
        <div className="flex h-screen bg-slate-100">
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
                <h1 className="text-2xl font-bold mb-8 text-teal-400">Nexus Admin</h1>
                <nav className="space-y-4 flex-1">
                    <Link href="/admin-panel" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin-panel/events" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <Calendar size={20} />
                        Events
                    </Link>
                    <Link href="/admin-panel/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <FolderKanban size={20} />
                        Projects
                    </Link>
                    <Link href="/admin-panel/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                        <BookOpen size={20} />
                        Blog Posts
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
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
