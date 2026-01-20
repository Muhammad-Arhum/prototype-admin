import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Users, BookOpen, Beaker } from 'lucide-react';

const advisors = [
  { name: 'Bryan Lee', role: 'AI Research' },
  { name: 'A/Prof. Khoa Cao', role: 'Academic Advisor' },
  { name: 'Deepak Rajan', role: 'Research Advisor' },
  { name: 'Nethum Devendra', role: 'Technical Advisor' },
];

const editorialTeam = [
  { name: 'Deepak Rajan', role: 'Lead Editor' },
  { name: 'Izabella Mancewicz', role: 'Editorial Member' },
];

const partner = {
  name: 'Monash Medical Technology Lab',
  description: 'Focused on elevating medical AI systems through cutting-edge research and development.',
};

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="nexus-section bg-muted/30">
      <div className="nexus-container">
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="nexus-badge mb-4"
          >
            Team & Partners
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Meet Our Team
          </motion.h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Advisors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="nexus-card"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <User size={20} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Nexus Advisors</h3>
            </div>
            <div className="space-y-3">
              {advisors.map((advisor) => (
                <div
                  key={advisor.name}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                >
                  <span className="font-medium">{advisor.name}</span>
                  <span className="text-sm text-muted-foreground">{advisor.role}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Editorial Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="nexus-card"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <BookOpen size={20} className="text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Editorial Team</h3>
            </div>
            <div className="space-y-3">
              {editorialTeam.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                >
                  <span className="font-medium">{member.name}</span>
                  <span className="text-sm text-muted-foreground">{member.role}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <Users size={16} />
              <span>Additional committee members available</span>
            </div>
          </motion.div>

          {/* Research Partner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="nexus-card"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Beaker size={20} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Research Partner</h3>
            </div>
            <div className="rounded-lg border border-border bg-gradient-to-br from-secondary/50 to-accent/50 p-5">
              <h4 className="mb-2 font-semibold">{partner.name}</h4>
              <p className="text-sm text-muted-foreground">{partner.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
