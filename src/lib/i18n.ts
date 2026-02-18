export type Language = "en" | "hi";

export const translations = {
  en: {
    nav: {
      home: "Home",
      signup: "Sign Up",
      signin: "Sign In",
      profile: "Profile",
      logout: "Logout",
    },
    hero: {
      title: "Empowering Women Across Generations",
      subtitle: "Learn digital skills, bridge career gaps, and share experiences — designed for every age.",
      cta: "Get Started Free",
      ctaSecondary: "Learn More",
    },
    features: {
      ageTailored: "Age-Tailored Learning",
      ageTailoredDesc: "Custom interfaces for teens, professionals, and seniors — each with content designed for their needs.",
      resume: "Smart Resume Analysis",
      resumeDesc: "Upload your resume, get AI-powered skill gap analysis and personalized career roadmaps.",
      stories: "Share Your Story",
      storiesDesc: "Share experiences anonymously through text or voice — inspire and learn from women across India.",
      mentoring: "Cross-Gen Mentoring",
      mentoringDesc: "Connect across age groups for guidance, wisdom-sharing, and mutual growth.",
      privacy: "Privacy First",
      privacyDesc: "DPDP compliant. Anonymous by default. Your data stays yours.",
      multilingual: "Multilingual & Voice",
      multilingualDesc: "Available in English & Hindi with voice-friendly navigation for all ages.",
    },
    auth: {
      signupTitle: "Join SheRise",
      signupSubtitle: "Begin your empowerment journey",
      signinTitle: "Welcome Back",
      signinSubtitle: "Continue your journey",
      username: "Nickname",
      email: "Email",
      password: "Password",
      age: "Age",
      submit: "Create Account",
      signinBtn: "Sign In",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
    },
    dashboard: {
      welcome: "Welcome",
      youngTitle: "Young Pioneers",
      youngSubtitle: "Start your tech journey!",
      midTitle: "Career & Growth",
      midSubtitle: "Bridge gaps, build futures",
      silverTitle: "Silver Wisdom",
      silverSubtitle: "Learn & share at your pace",
    },
    footer: {
      privacy: "Privacy Policy",
      tagline: "Empowering Indian women, one step at a time.",
      dpdp: "DPDP Compliant",
    },
  },
  hi: {
    nav: {
      home: "होम",
      signup: "साइन अप",
      signin: "साइन इन",
      profile: "प्रोफ़ाइल",
      logout: "लॉग आउट",
    },
    hero: {
      title: "हर पीढ़ी की महिलाओं को सशक्त बनाना",
      subtitle: "डिजिटल कौशल सीखें, करियर की खाई पाटें, अनुभव साझा करें — हर उम्र के लिए।",
      cta: "मुफ्त शुरू करें",
      ctaSecondary: "और जानें",
    },
    features: {
      ageTailored: "उम्र-अनुकूल शिक्षा",
      ageTailoredDesc: "किशोरों, पेशेवरों और वरिष्ठों के लिए कस्टम इंटरफ़ेस।",
      resume: "स्मार्ट रिज़्यूमे विश्लेषण",
      resumeDesc: "अपना रिज़्यूमे अपलोड करें, AI-संचालित कौशल विश्लेषण पाएं।",
      stories: "अपनी कहानी साझा करें",
      storiesDesc: "टेक्स्ट या वॉइस से गुमनाम रूप से अनुभव साझा करें।",
      mentoring: "पीढ़ी-पार मेंटरिंग",
      mentoringDesc: "मार्गदर्शन और विकास के लिए सभी उम्र से जुड़ें।",
      privacy: "गोपनीयता सर्वप्रथम",
      privacyDesc: "DPDP अनुपालक। डिफ़ॉल्ट रूप से गुमनाम।",
      multilingual: "बहुभाषी और आवाज़",
      multilingualDesc: "अंग्रेजी और हिंदी में उपलब्ध।",
    },
    auth: {
      signupTitle: "SheRise से जुड़ें",
      signupSubtitle: "अपनी सशक्तिकरण यात्रा शुरू करें",
      signinTitle: "वापस स्वागत है",
      signinSubtitle: "अपनी यात्रा जारी रखें",
      username: "उपनाम",
      email: "ईमेल",
      password: "पासवर्ड",
      age: "उम्र",
      submit: "खाता बनाएं",
      signinBtn: "साइन इन",
      haveAccount: "पहले से खाता है?",
      noAccount: "खाता नहीं है?",
    },
    dashboard: {
      welcome: "स्वागत है",
      youngTitle: "यंग पायनियर्स",
      youngSubtitle: "अपनी तकनीकी यात्रा शुरू करें!",
      midTitle: "करियर और विकास",
      midSubtitle: "खाई पाटें, भविष्य बनाएं",
      silverTitle: "सिल्वर विज़डम",
      silverSubtitle: "अपनी गति से सीखें और साझा करें",
    },
    footer: {
      privacy: "गोपनीयता नीति",
      tagline: "भारतीय महिलाओं को सशक्त बनाना, एक कदम।",
      dpdp: "DPDP अनुपालक",
    },
  },
} as const;

export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let result: any = translations[lang];
  for (const k of keys) {
    result = result?.[k];
  }
  return result || key;
}
