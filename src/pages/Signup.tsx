import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, getAgeGroup } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const { language, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ nickname: "", email: "", age: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(form.age);
    if (isNaN(age) || age < 14) {
      toast({ title: language === "en" ? "Invalid age" : "अमान्य उम्र", description: language === "en" ? "You must be at least 14." : "आपकी उम्र कम से कम 14 होनी चाहिए।", variant: "destructive" });
      return;
    }
    if (!form.nickname.trim() || !form.email.trim() || !form.password.trim()) {
      toast({ title: language === "en" ? "All fields required" : "सभी फ़ील्ड आवश्यक", variant: "destructive" });
      return;
    }
    signup(form.nickname.trim(), form.email.trim(), age, form.password);
    const group = getAgeGroup(age);
    toast({
      title: language === "en" ? `Welcome, ${form.nickname}!` : `स्वागत है, ${form.nickname}!`,
      description: language === "en"
        ? `You're in the ${group === "young" ? "Young Pioneers" : group === "mid" ? "Mid-Age" : "Silver Age"} group!`
        : `आप ${group === "young" ? "यंग पायनियर्स" : group === "mid" ? "मिड-एज" : "सिल्वर एज"} समूह में हैं!`,
    });
    navigate(`/dashboard/${group}`);
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
            <span className="text-3xl font-display font-bold gradient-hero-text">SheRise</span>
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground">{t(language, "auth.signupTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t(language, "auth.signupSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-base">{t(language, "auth.username")}</Label>
            <Input id="nickname" value={form.nickname} onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))} placeholder={language === "en" ? "Your nickname" : "आपका उपनाम"} className="h-12 text-base" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">{t(language, "auth.email")}</Label>
            <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@gmail.com" className="h-12 text-base" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-base">{t(language, "auth.age")}</Label>
            <Input id="age" type="number" min={14} max={120} value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} placeholder={language === "en" ? "Your age" : "आपकी उम्र"} className="h-12 text-base" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-base">{t(language, "auth.password")}</Label>
            <Input id="password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className="h-12 text-base" required />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {t(language, "auth.submit")} <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t(language, "auth.haveAccount")}{" "}
            <Link to="/signin" className="text-primary font-semibold hover:underline">{t(language, "nav.signin")}</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
