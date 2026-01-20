import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="nexus-container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="font-semibold text-foreground">Nexus MedTech</span>
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            © {currentYear} Nexus MedTech.
          </p>
        </div>
      </div>
    </footer>
  );
};
