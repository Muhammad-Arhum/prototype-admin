import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Lightbulb, BookOpen } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Equipping students, clinicians, and innovators with AI and MedTech knowledge.',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Building connections between healthcare professionals and AI engineers.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Focus',
    description: 'Sharing insights and practical applications for healthcare transformation.',
  },
  {
    icon: BookOpen,
    title: 'Education First',
    description: 'Making MedTech accessible through workshops, bootcamps, and resources.',
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="nexus-section bg-muted/30">
      <div className="nexus-container">
        <div ref={ref} className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="nexus-badge mb-4"
          >
            About Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-3xl font-bold md:text-4xl"
          >
            About Nexus MedTech
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-lg text-muted-foreground"
          >
            Nexus MedTech aims to equip students, clinicians, and innovators with
            the knowledge and tools to shape the future of healthcare through AI
            and MedTech. We are building a hub to make this field accessible,
            sharing insights, practical applications, and opportunities to learn,
            connect, and innovate.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="nexus-card group text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary">
                <feature.icon
                  size={24}
                  className="text-secondary-foreground transition-colors group-hover:text-primary-foreground"
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
