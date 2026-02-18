import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardNav from "@/components/DashboardNav";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Code2, Cpu, BrainCircuit, MessageCircle, Trophy, Youtube } from "lucide-react";

export default function YoungPioneers() {
  const { user, language } = useAuth();
  if (!user) return <Navigate to="/signin" />;

  const cards = [
    { icon: Code2, title: language === "en" ? "Computer Basics" : "कंप्यूटर मूल", desc: language === "en" ? "MS Excel, Word, HTML, CSS, Python & C++" : "एक्सेल, वर्ड, HTML, CSS, पायथन", gradient: "gradient-young" },
    { icon: Cpu, title: language === "en" ? "Trending Tech" : "ट्रेंडिंग टेक", desc: language === "en" ? "AI, ML, Cybersecurity, Data Science, Cloud" : "AI, ML, साइबर सुरक्षा, डेटा साइंस", gradient: "gradient-young" },
    { icon: Youtube, title: language === "en" ? "Video Tutorials" : "वीडियो ट्यूटोरियल", desc: language === "en" ? "Learn with curated YouTube videos" : "YouTube वीडियो से सीखें", gradient: "gradient-young" },
    { icon: BrainCircuit, title: language === "en" ? "Quizzes & MCQs" : "क्विज़ और MCQ", desc: language === "en" ? "Test your knowledge with image-based quizzes" : "इमेज क्विज़ से ज्ञान जांचें", gradient: "gradient-young" },
    { icon: Trophy, title: language === "en" ? "Progress & Badges" : "प्रगति और बैज", desc: language === "en" ? "Track your learning journey" : "अपनी सीखने की यात्रा ट्रैक करें", gradient: "gradient-young" },
    { icon: MessageCircle, title: language === "en" ? "Mentoring Chat" : "मेंटरिंग चैट", desc: language === "en" ? "Anonymous advice from experienced women" : "अनुभवी महिलाओं से गुमनाम सलाह", gradient: "gradient-young" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="young" />
      <main className="container py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            🚀 {t(language, "dashboard.youngTitle")}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {t(language, "dashboard.welcome")}, {user.nickname}! {t(language, "dashboard.youngSubtitle")}
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
