import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Sparkles, Shield } from "lucide-react";

export default function Footer() {
  const { language } = useAuth();

  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">SHERISE</span>
          <span className="text-sm text-muted-foreground ml-2">{t(language, "footer.tagline")}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-accent" />
            <span>{t(language, "footer.dpdp")}</span>
          </div>
          <a href="#" className="hover:text-primary transition-colors">{t(language, "footer.privacy")}</a>
        </div>
      </div>
    </footer>
  );
}
