import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { LayoutDashboard, Calendar, FolderKanban, BookOpen } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexus MedTech Admin',
  description: 'Admin dashboard for Nexus MedTech',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-slate-100">
          <aside className="w-64 bg-slate-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8 text-teal-400">Nexus Admin</h1>
            <nav className="space-y-4">
              <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link href="/events" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Calendar size={20} />
                Events
              </Link>
              <Link href="/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <FolderKanban size={20} />
                Projects
              </Link>
              <Link href="/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
                <BookOpen size={20} />
                Blog Posts
              </Link>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
