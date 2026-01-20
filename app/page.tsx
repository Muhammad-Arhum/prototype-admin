import Link from 'next/link';
import { Calendar, FolderKanban, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/events" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Events</h3>
          </div>
          <p className="text-slate-500">Add, edit, or remove upcoming events.</p>
        </Link>

        <Link href="/projects" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
              <FolderKanban size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Projects</h3>
          </div>
          <p className="text-slate-500">Update current research projects.</p>
        </Link>

        <Link href="/blog" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Blog</h3>
          </div>
          <p className="text-slate-500">Write and publish new blog posts.</p>
        </Link>
      </div>
    </div>
  );
}
