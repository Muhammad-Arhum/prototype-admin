import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Heart, Brain, Bot, Cog, ArrowRight } from 'lucide-react';
import { getCollectionData } from '@/lib/db';
import Link from 'next/link';

const iconMap: { [key: string]: any } = {
  Heart,
  Brain,
  Bot,
  Cog,
};

export const WorkshopsSection = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    getCollectionData('workshops').then(setWorkshops);
  }, []);

  return (
    <section id="workshops" className="nexus-section">
      <div className="nexus-container">
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="nexus-badge mb-4"
          >
            Woodside Workshops
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Workshop Series Highlights
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Deep-dive sessions into cutting-edge medical technology led by industry
            experts and academic researchers.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {workshops.map((workshop, index) => {
            const Icon = iconMap[workshop.icon] || Cog;
            return (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`nexus-card group relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent`}
              >
                <Link href={`/workshops/${workshop.id}`} className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-card shadow-sm border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">{workshop.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">{workshop.description}</p>
                  </div>
                </Link>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/workshops" className="nexus-btn-primary group">
            View All Workshops
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
