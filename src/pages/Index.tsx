import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LandingNav from "@/components/LandingNav";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import heroImage from "@/assets/hero-illustration.jpg";
import FallingFlowers from "@/components/FallingFlowers";
import {
  GraduationCap, FileSearch, MessageCircleHeart,
  Users, Shield, Languages,
} from "lucide-react";

const Index = () => {
  const { language } = useAuth();

  const features = [
    { icon: GraduationCap, key: "ageTailored" },
    { icon: FileSearch, key: "resume" },
    { icon: MessageCircleHeart, key: "stories" },
    { icon: Users, key: "mentoring" },
    { icon: Shield, key: "privacy" },
    { icon: Languages, key: "multilingual" },
  ] as const;

  return (
    <div className="min-h-screen bg-background relative">
      <FallingFlowers />
      <LandingNav />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative z-10">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground mb-6">
              {t(language, "hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              {t(language, "hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button variant="hero" size="lg">{t(language, "hero.cta")}</Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">{t(language, "hero.ctaSecondary")}</Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-warm">
              <img src={heroImage} alt="Indian women empowered through technology" className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 gradient-hero rounded-2xl opacity-20 animate-float" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-card/50 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {language === "en" ? "Everything You Need to Rise" : "उठने के लिए सब कुछ"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {language === "en"
                ? "Tools, community, and mentorship designed for Indian women at every stage of life."
                : "भारतीय महिलाओं के लिए हर चरण में उपकरण, समुदाय और मार्गदर्शन।"}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, key }, i) => (
              <FeatureCard
                key={key}
                icon={icon}
                title={t(language, `features.${key}`)}
                description={t(language, `features.${key}Desc`)}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Preview */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {language === "en" ? "Tailored For You" : "आपके लिए बना"}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { group: "young", ages: "14-18", gradient: "gradient-young", emoji: "🚀" },
              { group: "mid", ages: "19-55", gradient: "gradient-mid", emoji: "💼" },
              { group: "silver", ages: "55+", gradient: "gradient-silver", emoji: "🌟" },
            ].map(({ group, ages, gradient, emoji }, i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group"
              >
                <div className={`${gradient} p-8 text-primary-foreground`}>
                  <span className="text-4xl mb-3 block">{emoji}</span>
                  <h3 className="text-2xl font-display font-bold mb-1">
                    {t(language, `dashboard.${group}Title`)}
                  </h3>
                  <p className="text-sm opacity-90">{ages} {language === "en" ? "years" : "वर्ष"}</p>
                  <p className="mt-3 opacity-90">{t(language, `dashboard.${group}Subtitle`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
