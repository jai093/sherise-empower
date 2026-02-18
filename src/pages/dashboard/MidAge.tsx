import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardNav from "@/components/DashboardNav";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { FileSearch, MapPin, Briefcase, Palette, MessageCircleHeart, Users } from "lucide-react";

export default function MidAge() {
  const { user, language } = useAuth();
  if (!user) return <Navigate to="/signin" />;

  const cards = [
    { icon: FileSearch, title: language === "en" ? "Resume Analysis" : "रिज़्यूमे विश्लेषण", desc: language === "en" ? "Upload resume, get AI skill gap report" : "रिज़्यूमे अपलोड करें, AI कौशल रिपोर्ट पाएं", gradient: "gradient-mid" },
    { icon: MapPin, title: language === "en" ? "Career Roadmaps" : "करियर रोडमैप", desc: language === "en" ? "3-month & 6-month structured learning paths" : "3 और 6 महीने की संरचित योजनाएं", gradient: "gradient-mid" },
    { icon: Briefcase, title: language === "en" ? "Job Search" : "नौकरी खोज", desc: language === "en" ? "Women-friendly companies & opportunities" : "महिला-अनुकूल कंपनियां और अवसर", gradient: "gradient-mid" },
    { icon: Palette, title: language === "en" ? "Non-Tech Paths" : "गैर-तकनीकी रास्ते", desc: language === "en" ? "UI/UX, arts, cooking, finance & more" : "UI/UX, कला, खाना, वित्त और अधिक", gradient: "gradient-mid" },
    { icon: MessageCircleHeart, title: language === "en" ? "Share Stories" : "कहानियां साझा करें", desc: language === "en" ? "Text or voice — inspire other women" : "टेक्स्ट या आवाज़ — महिलाओं को प्रेरित करें", gradient: "gradient-mid" },
    { icon: Users, title: language === "en" ? "Mentoring" : "मेंटरिंग", desc: language === "en" ? "Connect with all age groups" : "सभी आयु वर्गों से जुड़ें", gradient: "gradient-mid" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="mid" />
      <main className="container py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            💼 {t(language, "dashboard.midTitle")}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {t(language, "dashboard.welcome")}, {user.nickname}! {t(language, "dashboard.midSubtitle")}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <DashboardCard key={i} icon={card.icon} title={card.title} description={card.desc} gradient={card.gradient} delay={i * 0.08} />
          ))}
        </div>
      </main>
    </div>
  );
}
