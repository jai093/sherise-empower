import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Globe, Sparkles } from "lucide-react";

export default function LandingNav() {
  const { language, setLanguage, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <span className="text-2xl font-display font-bold gradient-hero-text">SHERISE</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language === "en" ? "हिंदी" : "English"}
          </button>

          {user ? (
            <Link to={`/dashboard/${user.ageGroup}`}>
              <Button variant="hero" size="sm">
                {t(language, "dashboard.welcome")}, {user.nickname}
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm">{t(language, "nav.signin")}</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm">{t(language, "nav.signup")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
