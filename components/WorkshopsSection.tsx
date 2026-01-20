import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Brain, Bot, Cog } from 'lucide-react';

const workshops = [
  {
    icon: Heart,
    title: 'Cardiovascular Devices',
    description: 'Artificial hearts & cardiac tech explained.',
    color: 'from-rose-500/10 to-rose-500/5',
    iconColor: 'text-rose-500',
  },
  {
    icon: Brain,
    title: 'Intro to Medical AI',
    description: 'How AI works and clinical use cases.',
    color: 'from-violet-500/10 to-violet-500/5',
    iconColor: 'text-violet-500',
  },
  {
    icon: Bot,
    title: 'Surgical Robotics',
    description: 'Engineering principles & surgical applications.',
    color: 'from-sky-500/10 to-sky-500/5',
    iconColor: 'text-sky-500',
  },
  {
    icon: Cog,
    title: 'Total Artificial Heart & Prosthetics',
    description: 'Live demo of cutting-edge devices.',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconColor: 'text-emerald-500',
  },
];

export const WorkshopsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`nexus-card group relative overflow-hidden bg-gradient-to-br ${workshop.color}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-card shadow-sm">
                  <workshop.icon size={28} className={workshop.iconColor} />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold">{workshop.title}</h3>
                  <p className="text-muted-foreground">{workshop.description}</p>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
