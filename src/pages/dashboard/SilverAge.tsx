import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardNav from "@/components/DashboardNav";
import DashboardCard from "@/components/DashboardCard";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { ImageIcon, BookHeart, Users, Phone, Volume2, Heart } from "lucide-react";

export default function SilverAge() {
  const { user, language } = useAuth();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/signin" />;

  const cards = [
    { icon: ImageIcon, title: language === "en" ? "Image Tutorials" : "चित्र ट्यूटोरियल", desc: language === "en" ? "Learn with large images & screenshots" : "बड़ी तस्वीरों से सीखें", gradient: "gradient-silver", link: "/silver-tutorials" },
    { icon: Phone, title: language === "en" ? "Video Calling" : "वीडियो कॉलिंग", desc: language === "en" ? "Step-by-step: how to video call" : "कदम दर कदम: वीडियो कॉल कैसे करें", gradient: "gradient-silver" },
    { icon: Volume2, title: language === "en" ? "Voice Guide" : "आवाज़ गाइड", desc: language === "en" ? "Voice narration for every lesson" : "हर पाठ के लिए आवाज़ वर्णन", gradient: "gradient-silver" },
    { icon: BookHeart, title: language === "en" ? "Share Wisdom" : "ज्ञान साझा करें", desc: language === "en" ? "Share life experiences with younger women" : "युवा महिलाओं के साथ अनुभव साझा करें", gradient: "gradient-silver", link: "/stories" },
    { icon: Heart, title: language === "en" ? "SOS & Safety" : "SOS और सुरक्षा", desc: language === "en" ? "Emergency apps & safety basics" : "आपातकालीन ऐप और सुरक्षा", gradient: "gradient-silver" },
    { icon: Users, title: language === "en" ? "Mentoring" : "मेंटरिंग", desc: language === "en" ? "Chat with younger generations" : "युवा पीढ़ी से बात करें", gradient: "gradient-silver", link: "/stories" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="silver" />
      <main className="container py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            🌟 {t(language, "dashboard.silverTitle")}
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            {t(language, "dashboard.welcome")}, {user.nickname}! {t(language, "dashboard.silverSubtitle")}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <DashboardCard key={i} icon={card.icon} title={card.title} description={card.desc} gradient={card.gradient} delay={i * 0.08} onClick={card.link ? () => navigate(card.link) : undefined} />
          ))}
        </div>
      </main>
    </div>
  );
}
