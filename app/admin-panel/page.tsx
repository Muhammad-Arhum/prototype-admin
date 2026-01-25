'use client';

import Link from 'next/link';
import { Calendar, FolderKanban, BookOpen, Settings, RefreshCw, Cog } from 'lucide-react';
import { saveData, generateId } from '@/lib/db';
import { useState } from 'react';

const SEED_PROJECTS = [
  { title: "Medical Benchmarking", description: "Creating real-world medical benchmarks that reflect how clinicians operate (e.g., Monash Murtagh Benchmark for diagnosis).", icon: "Search", color: "bg-nexus-teal-light", content: "Details about medical benchmarking methodology and findings..." },
  { title: "Project Ambi", description: "Building a full-stack medical AGI agent for real-world deployment.", icon: "Bot", color: "bg-nexus-blue-light", content: "Architecture and roadmap for Project Ambi..." },
  { title: "Medical AI Character", description: "Studying positive/negative behaviors expected from medical LLMs, including economic judgement in clinical contexts.", icon: "Brain", color: "bg-nexus-mint", content: "Research notes on medical LLM behavior..." },
  { title: "Economic Index Analysis", description: "Understanding how doctors across specialties use commercial LLMs via data analysis.", icon: "BarChart3", color: "bg-nexus-teal-light", content: "Economic impact and specialist usage data..." },
  { title: "Medical LLM Cybersecurity", description: "Assessing cybersecurity risks and mitigation strategies for medical LLM deployment.", icon: "Shield", color: "bg-nexus-blue-light", content: "Security vulnerability report and mitigation strategy..." },
  { title: "Project Chute", description: "Exploring automated summarizing tools for clinical quality metrics and EMR submissions.", icon: "FileText", color: "bg-nexus-mint", content: "Implementation details of the summarization pipeline..." },
  { title: "Project Clarity", description: "Building a retrieval-augmented generation system to help hospital staff access clinical and non-clinical guidelines efficiently.", icon: "Search", color: "bg-nexus-teal-light", content: "RAG architecture for clinical guidelines..." }
];

const SEED_EVENTS = [
  { title: "Women in MedTech", type: "Talk", description: "Inspiring talks about clinician roles in MedTech.", icon: "Users", content: "Full agenda for Women in MedTech talk..." },
  { title: "Vibe Coding Hackathon", type: "Hackathon", description: "Hands-on coding challenges and creative solutions.", icon: "Code", content: "Hackathon rules, prizes, and schedule..." },
  { title: "Intro to Programming 2025", type: "Workshop", description: "A friendly coding introduction for beginners and professionals.", icon: "Wrench", content: "Course material and prerequisites..." },
  { title: "Woodside Workshops", type: "Workshop Series", description: "Series of medtech technology workshops.", icon: "Wrench", content: "Detailed breakdown of the workshop series..." },
  { title: "Nexus 2025 Launch Night", type: "Event", description: "Community kickoff with future plans.", icon: "Rocket", content: "Launch night itinerary and guest list..." },
  { title: "Surgical Robotics Field Trip", type: "Event", description: "Real-world robotics demonstrations.", icon: "Activity", content: "Safety instructions and location details..." }
];

const SEED_WORKSHOPS = [
  { title: 'Cardiovascular Devices', description: 'Artificial hearts & cardiac tech explained.', icon: 'Heart', content: 'In-depth look at artificial hearts, cardiac pacing, and blood flow engineering.' },
  { title: 'Intro to Medical AI', description: 'How AI works and clinical use cases.', icon: 'Brain', content: 'Fundamentals of neural networks, clinical data processing, and ethical AI deployment.' },
  { title: 'Surgical Robotics', description: 'Engineering principles & surgical applications.', icon: 'Bot', content: 'Mechanics of robotic arms, precision control systems, and minimally invasive techniques.' },
  { title: 'Total Artificial Heart & Prosthetics', description: 'Live demo of cutting-edge devices.', icon: 'Cog', content: 'Hands-on demonstration of prosthetic control and artificial organ integration.' }
];

const SEED_RESEARCH = [
  {
    title: "Medicine’s Information Flow Challenge",
    author: "Deepak Jeyarajan",
    description: "Every failure point in healthcare can be traced back to breakdowns in how information moves between stakeholders.",
    content: "The Hidden Bottleneck in Healthcare: Information Flow\n\nModern medicine’s greatest challenge isn’t necessarily the complexity of disease or the limits of treatments—it’s information flow. Every failure point in healthcare can be traced back to breakdowns in how information moves between stakeholders. This fundamental insight reframes how we should approach healthcare system design, especially as we introduce artificial intelligence.\n\n## The Omnipresent Flow Problem\n\nInformation flow problems manifest in obvious ways:\n- Clinical handovers between shifts or departments create vulnerability points where critical details get lost\n- Referrals between specialists fragment the patient journey\n- Patient histories become diluted or distorted with each retelling\n- Investigation results get lost in complex systems\n- Public health initiatives fail when crucial information doesn’t reach target populations\n\nBut the information flow challenge extends beyond these obvious examples. Medical learning itself—the way physicians accumulate clinical wisdom—represents an information flow bottleneck.\n\n## Medicine as a Collective Intelligence Exercise\n\nWhat if we viewed medicine differently? Rather than a profession of individual experts, imagine medicine as a collective intelligence exercise where the system’s emergent capabilities exceed any individual contributor.\n\n## Reimagining Clinical Work with AI-Enhanced Information Flow\n\nAI systems designed specifically to address information flow can transform healthcare delivery. The goal isn’t to replace clinicians but to create continuously-learning ambient clinical intelligence that enhances human capabilities."
  },
  {
    title: "What Medicine needs to get right about AI",
    author: "Deepak Jeyarajan",
    description: "The transformer architecture has revolutionized AI, enabling systems to capture complex non-linear relationships in vast datasets.",
    content: "## The AI Revolution in Medicine: Beyond the Hype\n\nThe transformer architecture has revolutionized AI, enabling systems to capture complex non-linear relationships in vast datasets. In medicine, this has led to remarkable capabilities:\n\n### Current Applications\n- Clinical Communication: AI systems can answer patient questions at a level comparable to or exceeding doctors\n- Administrative Efficiency: We can now automate clinical scribing and writing medical letters\n- Workflow Enhancement: Automated EMR navigations via text-to-action.\n\n## The Implementation Challenge\n\nWe clinicians will, or already are, using AI tools at work. It’s crucial that we, as a field, speak the same language as those implementing these tools.\n\n### Understanding AI: Models vs Products\n\nA crucial distinction often missed is that an AI model itself is not a product. Success comes from transforming that model into a helpful assistant.\n\n### The Clinical Decision Support Dilemma\n\nConsider clinical decision support in radiology. While companies focus on creating high-performance diagnostic models, the implementation pathway remains unclear."
  },
  {
    title: "AI Agents in Medicine: A Glimpse Into the Future",
    author: "Paula Chen",
    description: "The rise of AI agents unlocks a whole new realm of possibilities: tools that thrive in the chaos of multidisciplinary coordination.",
    content: "## What is Agentic AI?\n\nAgentic AI is a type of artificial intelligence that can work independently to achieve complex goals, without requiring constant human supervision or feedback. Unlike traditional systems that follow pre-programmed rules, agentic AI can determine a logical sequence of steps to accomplish open-ended goals.\n\n## What Agents Could Be Useful in Medicine?\n\n### Care Coordination Agent\nCoordinates and tracks individualised care plans from admission to discharge and follow-up.\n\n### Patient Monitoring Agent\nContinuously monitors vitals and labs to detect early signs of deterioration.\n\n### Clinical Support Agent\nAssists doctors by automating administrative tasks and synthesizing medical literature.\n\n### Multidisciplinary Team Management Agent\nCoordinates efforts across various healthcare professionals involved in patient care.\n\n## Conclusion\n\nAs the nascent field of agentic AI continues to evolve, much remains unanswered about where such a powerful reasoning tool would best be implemented in medicine."
  }
];

const SEED_POSTS = [
  { title: "Welcome to Nexus MedTech", author: "Admin", date: "2025-01-20T00:00:00Z", excerpt: "We are excited to launch our new platform for medical innovation.", content: "Full content coming soon..." }
];

export default function AdminDashboardHome() {
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setIsSettingUp(true);
    setMessage('Seeding database with unique IDs...');
    try {
      const pData = SEED_PROJECTS.map((item, i) => ({ ...item, id: generateId(i + 1) }));
      const eData = SEED_EVENTS.map((item, i) => ({ ...item, id: generateId(i + 1) }));
      const bData = SEED_POSTS.map((item, i) => ({ ...item, id: generateId(i + 1) }));
      const wData = SEED_WORKSHOPS.map((item, i) => ({ ...item, id: generateId(i + 1) }));
      const rData = SEED_RESEARCH.map((item, i) => ({ ...item, id: generateId(i + 1) }));

      const p = await saveData('projects', pData);
      const e = await saveData('events', eData);
      const b = await saveData('posts', bData);
      const w = await saveData('workshops', wData);
      const r = await saveData('research', rData);

      if (p && e && b && w && r) setMessage('Database setup complete with unique IDs!');
      else setMessage('Setup failed. Check console and Firebase config.');
    } catch (err) {
      setMessage('Error: ' + (err as Error).message);
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

        <Link href="/admin-panel/workshops" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <Cog size={24} />
            </div>
            <h3 className="text-xl font-semibold">Manage Workshops</h3>
          </div>
          <p className="text-slate-500">Manage Woodside workshop modules.</p>
        </Link>

        <Link href="/admin-panel/research" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-pink-100 text-pink-600 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-semibold">Research Library</h3>
          </div>
          <p className="text-slate-500">Publish papers and analytical pieces.</p>
        </Link>
      </div>

      <div className="mt-8 md:mt-12 p-6 md:p-8 bg-slate-900 rounded-2xl text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl w-fit">
            <Settings size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Initial Application Setup</h3>
            <p className="text-slate-400 text-sm md:text-base">Populate your database with the core "Nexus" content.</p>
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
