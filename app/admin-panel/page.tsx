'use client';

import Link from 'next/link';
import { Calendar, FolderKanban, BookOpen, Settings, RefreshCw } from 'lucide-react';
import { saveData } from '@/lib/db';
import { useState } from 'react';

const SEED_PROJECTS = [
  { title: "Medical Benchmarking", description: "Creating real-world medical benchmarks that reflect how clinicians operate (e.g., Monash Murtagh Benchmark for diagnosis).", icon: "Search", color: "bg-nexus-teal-light" },
  { title: "Project Ambi", description: "Building a full-stack medical AGI agent for real-world deployment.", icon: "Bot", color: "bg-nexus-blue-light" },
  { title: "Medical AI Character", description: "Studying positive/negative behaviors expected from medical LLMs, including economic judgement in clinical contexts.", icon: "Brain", color: "bg-nexus-mint" },
  { title: "Economic Index Analysis", description: "Understanding how doctors across specialties use commercial LLMs via data analysis.", icon: "BarChart3", color: "bg-nexus-teal-light" },
  { title: "Medical LLM Cybersecurity", description: "Assessing cybersecurity risks and mitigation strategies for medical LLM deployment.", icon: "Shield", color: "bg-nexus-blue-light" },
  { title: "Project Chute", description: "Exploring automated summarizing tools for clinical quality metrics and EMR submissions.", icon: "FileText", color: "bg-nexus-mint" },
  { title: "Project Clarity", description: "Building a retrieval-augmented generation system to help hospital staff access clinical and non-clinical guidelines efficiently.", icon: "Search", color: "bg-nexus-teal-light" }
];

const SEED_EVENTS = [
  { title: "Women in MedTech", type: "Talk", description: "Inspiring talks about clinician roles in MedTech.", icon: "Users" },
  { title: "Vibe Coding Hackathon", type: "Hackathon", description: "Hands-on coding challenges and creative solutions.", icon: "Code" },
  { title: "Intro to Programming 2025", type: "Workshop", description: "A friendly coding introduction for beginners and professionals.", icon: "Wrench" },
  { title: "Woodside Workshops", type: "Workshop Series", description: "Series of medtech technology workshops.", icon: "Wrench" },
  { title: "Nexus 2025 Launch Night", type: "Event", description: "Community kickoff with future plans.", icon: "Rocket" },
  { title: "Surgical Robotics Field Trip", type: "Event", description: "Real-world robotics demonstrations.", icon: "Activity" }
];

const SEED_POSTS = [
  { title: "Welcome to Nexus MedTech", author: "Admin", date: "2025-01-20T00:00:00Z", excerpt: "We are excited to launch our new platform for medical innovation.", content: "Full content coming soon..." }
];

export default function AdminDashboardHome() {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setIsSettingUp(true);
    setMessage('Seeding database...');
    try {
      const p = await saveData('projects', SEED_PROJECTS);
      const e = await saveData('events', SEED_EVENTS);
      const b = await saveData('posts', SEED_POSTS);
      if (p && e && b) setMessage('Database setup complete! Landing page updated.');
      else setMessage('Setup failed. Check console and Firebase config.');
    } catch (err) {
      setMessage('Error: ' + (err as Error).message);
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin-panel/events" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Events</h3>
          </div>
          <p className="text-slate-500">Update upcoming medtech events.</p>
        </Link>

        <Link href="/admin-panel/projects" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
              <FolderKanban size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Projects</h3>
          </div>
          <p className="text-slate-500">Edit research and core projects.</p>
        </Link>

        <Link href="/admin-panel/blog" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Blog</h3>
          </div>
          <p className="text-slate-500">Post news and community updates.</p>
        </Link>
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl">
            <Settings size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Initial Application Setup</h3>
            <p className="text-slate-400">Populate your database with the core "Nexus" content.</p>
          </div>
        </div>

        <button
          onClick={handleSetup}
          disabled={isSettingUp}
          className="flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
        >
          {isSettingUp ? <RefreshCw className="animate-spin" size={20} /> : <Settings size={20} />}
          {isSettingUp ? 'Seeding Cloud Database...' : 'Setup Core Content'}
        </button>

        {message && (
          <p className={`mt-4 text-sm font-medium ${message.includes('failed') || message.includes('Error') ? 'text-red-400' : 'text-teal-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
