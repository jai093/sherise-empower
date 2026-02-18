import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth, AgeGroup } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Globe, LogOut, Sparkles, User } from "lucide-react";

interface Props {
  ageGroup: AgeGroup;
}

const groupColors: Record<AgeGroup, string> = {
  young: "gradient-young",
  mid: "gradient-mid",
  silver: "gradient-silver",
};

export default function DashboardNav({ ageGroup }: Props) {
  const { language, setLanguage, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-lg ${groupColors[ageGroup]} flex items-center justify-center`}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">SheRise</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
            {language === "en" ? "हिंदी" : "English"}
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="font-medium">{user?.nickname}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} title={t(language, "nav.logout")}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
