import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  'Medical Agents',
  'Surgical Robotics',
  'Medical Benchmarking',
  'Medical LLMs',
  'Economic Index',
  'Coding Bootcamps',
];

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-nexus-teal-light opacity-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/4 -translate-x-1/4 rounded-full bg-nexus-blue-light opacity-30 blur-3xl" />
      </div>

      <div className="nexus-container">
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-12 text-center md:py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="nexus-badge">
              <Sparkles size={14} className="mr-1.5" />
              AI-Powered Healthcare Innovation
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Become an{' '}
            <span className="nexus-gradient-text">AI-native</span>
            <br />
            clinician
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Explore news, articles, events, and more. Shaping the future of
            healthcare through AI and medical technology.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              Explore Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="#events"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              View Events
            </a>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category, index) => (
              <motion.span
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
