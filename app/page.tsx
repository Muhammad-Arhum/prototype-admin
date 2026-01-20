'use client';

import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { EventsSection } from '@/components/EventsSection';
import { BlogSection } from '@/components/BlogSection';
import { WorkshopsSection } from '@/components/WorkshopsSection';
import { TeamSection } from '@/components/TeamSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <EventsSection />
                <BlogSection />
                <WorkshopsSection />
                <TeamSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
