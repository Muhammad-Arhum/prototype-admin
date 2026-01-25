import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Activity,
  Bot,
  Brain,
  BarChart3,
  Shield,
  FileText,
  Search,
  ArrowRight
} from 'lucide-react';
import { getCollectionData } from '@/lib/db';
import Link from 'next/link';

const iconMap: { [key: string]: any } = {
  Activity,
  Bot,
  Brain,
  BarChart3,
  Shield,
  FileText,
  Search
};

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    getCollectionData('projects').then(data => {
      const mapped = data.map((project: any) => ({
        ...project,
        icon: iconMap[project.icon] || Activity
      }));
      setProjects(mapped);
    });
  }, []);

  return (
    <section id="projects" className="nexus-section">
      <div className="nexus-container">
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="nexus-badge mb-4"
          >
            Research & Projects
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Core Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Pioneering research at the intersection of artificial intelligence and
            healthcare to improve patient outcomes and clinical workflows.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="nexus-card group flex flex-col"
            >
              <Link href={`/projects/${project.id}`} className="flex-1 block">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${project.color} transition-transform group-hover:scale-110`}
                >
                  <project.icon size={24} className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>
              </Link>
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Explore Project <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/projects" className="nexus-btn-primary group">
            View All Projects
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
