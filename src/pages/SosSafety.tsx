import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardNav from "@/components/DashboardNav";
import { t } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { Phone, Heart, Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function SosSafety() {
  const { language } = useAuth();

  const emergencyContacts = [
    { name: "Police", number: "100", icon: Shield, color: "text-blue-600 bg-blue-100" },
    { name: "Ambulance", number: "102", icon: Heart, color: "text-red-600 bg-red-100" },
    { name: "Women Helpline", number: "1091", icon: Phone, color: "text-purple-600 bg-purple-100" },
  ];

  const safetyTips = [
    { title: "Share Location", desc: "Always share your live location with trusted contacts when traveling alone." },
    { title: "Emergency Apps", desc: "Download apps like '112 India' for quick assistance." },
    { title: "Be Aware", desc: "Stay alert of your surroundings and avoid isolated areas at night." },
    { title: "Trust Instincts", desc: "If you feel uncomfortable, leave the situation immediately." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="silver" />
      <main className="container py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/dashboard/silver">
            <Button variant="ghost" className="gap-2">
              <Home className="h-5 w-5" />
              {t(language, "tutorials.back")}
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-destructive" />
          {t(language, "sos.title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t(language, "sos.subtitle")}
        </p>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t(language, "sos.emergencyContacts")}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {emergencyContacts.map((contact) => (
              <Card key={contact.name} className="hover:shadow-lg transition-shadow border-destructive/20">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${contact.color}`}>
                    <contact.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{contact.name}</h3>
                  <p className="text-3xl font-bold text-foreground">{contact.number}</p>
                  <Button className="w-full bg-destructive hover:bg-destructive/90 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    {t(language, "sos.callNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t(language, "sos.safetyTips")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyTips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
