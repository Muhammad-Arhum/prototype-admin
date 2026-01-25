import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Users, Code, Cpu, Rocket, Wrench, Activity, Bot, Brain, BarChart3, Shield, FileText, Search, ArrowRight } from 'lucide-react';
import { getCollectionData } from '@/lib/db';
import Link from 'next/link';

const iconMap: { [key: string]: any } = {
  Users,
  Code,
  Wrench,
  Cpu,
  Rocket,
  Activity,
  Bot,
  Brain,
  BarChart3,
  Shield,
  FileText,
  Search
};

export const EventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    getCollectionData('events').then(data => {
      const mapped = data.map((event: any) => ({
        ...event,
        icon: iconMap[event.icon] || Users
      }));
      setEvents(mapped);
    });
  }, []);

  return (
    <section id="events" className="nexus-section bg-muted/30">
      <div className="nexus-container">
        <div ref={ref} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="nexus-badge mb-4"
          >
            <Calendar size={14} className="mr-1.5" />
            Events
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Past & Upcoming Events
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Join our community events to learn, network, and explore the latest
            in medical technology and AI.
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="nexus-card group flex items-start gap-4"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary">
                <event.icon
                  size={20}
                  className="text-secondary-foreground transition-colors group-hover:text-primary-foreground"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1">
                  <h3 className="truncate font-semibold text-lg group-hover:text-primary transition-colors">
                    <Link href={`/events/${event.id}`}>
                      {event.title}
                    </Link>
                  </h3>
                </div>
                <span className="mb-3 inline-block rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {event.type}
                </span>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/events" className="nexus-btn-primary group">
            View All Events
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
