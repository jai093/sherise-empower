import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signin() {
  const { language, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login({ nickname: "User", email: form.email, age: 0, ageGroup: "mid", password: form.password });

    if (success) {
      toast({ title: language === "en" ? "Welcome back!" : "वापस स्वागत है!" });
      // Navigation is handled by ProtectedRoute/AuthContext side-effect or we can redirect to a default
      // Ideally retrieve user to know where to go, or redirect to home and let AuthWrapper handle it.
      // But we don't have the user object here immediately updated in context if it's async, but here it's sync.
      // We can't get the updated user from context *immediately* in this render cycle.
      // Let's rely on the fact that login returns true if successful.
      // We need to know the ageGroup to redirect correctly.
      // The login function in AuthContext (mock) finds the user.
      // We should probably redirect to a generic dashboard and let it redirect, or update login to return the user.

      // HACK for now: Read from localStorage directly or let the user act.
      // Better: Update login to return User | null.
      const savedUser = JSON.parse(localStorage.getItem("sherise_current_user") || "{}");
      if (savedUser && savedUser.ageGroup) {
          navigate(`/dashboard/${savedUser.ageGroup}`);
      } else {
          navigate("/");
      }
    } else {
      toast({ title: language === "en" ? "Login failed" : "लॉगिन विफल", description: language === "en" ? "Invalid email or password" : "अमान्य ईमेल या पासवर्ड", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-3xl font-display font-bold gradient-hero-text">SHERISE</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground">{t(language, "auth.signinTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t(language, "auth.signinSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">{t(language, "auth.email")}</Label>
            <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@gmail.com" className="h-12 text-base" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">{t(language, "auth.password")}</Label>
            <Input id="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className="h-12 text-base" required />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {t(language, "auth.signinBtn")} <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t(language, "auth.noAccount")}{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">{t(language, "nav.signup")}</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
