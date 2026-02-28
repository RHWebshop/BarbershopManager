import { Link } from "react-router-dom";
import { 
  InstagramIcon, 
  FacebookIcon, 
  MailIcon 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card py-6 text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              צור קשר
            </Link>
            <Link to="/accessibility" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              הצהרת נגישות
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              מדיניות פרטיות
            </Link>
            <Link to="/store-policy" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              מדיניות החנות
            </Link>
            <a href="mailto:office@example.com" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <MailIcon className="size-4" />
              office@example.com
            </a>
          </nav>

          {/* Social Icons & Copyright */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="אינסטגרם"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="פייסבוק"
              >
                <FacebookIcon className="size-5" />
              </a>
            </div>
            
            <div className="h-4 w-px bg-border hidden md:block" />
            
            <p className="text-xs text-muted-foreground">
              © {currentYear} רואי חיילי
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
