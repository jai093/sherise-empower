import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardNav from "@/components/DashboardNav";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Code2, Cpu, BrainCircuit, MessageCircle, Trophy, Monitor } from "lucide-react";

export default function YoungPioneers() {
  const { user, language } = useAuth();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/signin" />;

  const cards = [
    {
      icon: Monitor,
      title: language === "en" ? "Computer Basics" : "कंप्यूटर मूल",
      desc: language === "en" ? "MS Excel, Word, PowerPoint, Fundamentals" : "एक्सेल, वर्ड, पावरपॉइंट, मूल बातें",
      gradient: "gradient-young",
      link: "/learning?category=basics"
    },
    {
      icon: Code2,
      title: language === "en" ? "Coding & Development" : "कोडिंग और विकास",
      desc: language === "en" ? "HTML, CSS, Python, Web Development" : "HTML, CSS, पायथन, वेब विकास",
      gradient: "gradient-young",
      link: "/learning?category=coding"
    },
    {
      icon: Cpu,
      title: language === "en" ? "Trending Tech" : "ट्रेंडिंग टेक",
      desc: language === "en" ? "AI, ML, Cybersecurity, Data Science, Deepfake" : "AI, ML, साइबर सुरक्षा, डेटा साइंस",
      gradient: "gradient-young",
      link: "/learning?category=trending"
    },
    {
      icon: BrainCircuit,
      title: language === "en" ? "All Courses & Quizzes" : "सभी पाठ्यक्रम और क्विज़",
      desc: language === "en" ? "Explore all modules and test your knowledge" : "सभी मॉड्यूल देखें और ज्ञान जांचें",
      gradient: "gradient-young",
      link: "/learning"
    },
    {
      icon: Trophy,
      title: language === "en" ? "Progress & Badges" : "प्रगति और बैज",
      desc: language === "en" ? "Track your learning journey" : "अपनी सीखने की यात्रा ट्रैक करें",
      gradient: "gradient-young",
      link: "/learning"
    },
    {
      icon: MessageCircle,
      title: language === "en" ? "Stories & Mentoring" : "कहानियां और मेंटरिंग",
      desc: language === "en" ? "Share & get advice from experienced women" : "अनुभवी महिलाओं से सलाह पाएं",
      gradient: "gradient-young",
      link: "/stories"
    },
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
            <DashboardCard key={i} icon={card.icon} title={card.title} description={card.desc} gradient={card.gradient} delay={i * 0.08} onClick={() => navigate(card.link)} />
          ))}
        </div>
      </main>
    </div>
  );
}
