import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Play, Code2, ChevronRight } from "lucide-react";

interface Module {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descHi: string;
  videoId: string;
  codeSnippet?: string;
  quiz: {
    question: string;
    questionHi: string;
    options: { text: string; image?: string; correct: boolean }[];
  };
  completed: boolean;
}

const modules: Module[] = [
  {
    id: "html-basics",
    title: "HTML Basics",
    titleHi: "HTML मूल बातें",
    description: "Learn the building blocks of the web — tags, elements, and your first webpage.",
    descHi: "वेब की बुनियाद सीखें — टैग, एलिमेंट्स, और आपका पहला वेबपेज।",
    videoId: "qz0aGYrrlhU",
    codeSnippet: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, SheRise!</h1>
    <p>I am learning HTML 🎉</p>
  </body>
</html>`,
    quiz: {
      question: "Which tag is used for the largest heading?",
      questionHi: "सबसे बड़ी हेडिंग के लिए कौन सा टैग उपयोग होता है?",
      options: [
        { text: "<h1>", correct: true },
        { text: "<h6>", correct: false },
        { text: "<p>", correct: false },
        { text: "<head>", correct: false },
      ],
    },
    completed: false,
  },
  {
    id: "css-intro",
    title: "CSS Styling",
    titleHi: "CSS स्टाइलिंग",
    description: "Make your pages beautiful with colors, fonts, and layouts.",
    descHi: "रंगों, फॉन्ट्स और लेआउट के साथ अपने पेज सुंदर बनाएं।",
    videoId: "1PnVor36_40",
    codeSnippet: `/* style.css */
body {
  background-color: #fff5ee;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #d4622a;
  text-align: center;
}

.card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}`,
    quiz: {
      question: "Which property changes the text color?",
      questionHi: "कौन सी प्रॉपर्टी टेक्स्ट का रंग बदलती है?",
      options: [
        { text: "color", correct: true },
        { text: "background-color", correct: false },
        { text: "font-size", correct: false },
        { text: "text-align", correct: false },
      ],
    },
    completed: false,
  },
  {
    id: "python-intro",
    title: "Python Basics",
    titleHi: "पायथन मूल बातें",
    description: "Start programming with Python — variables, print, and simple math.",
    descHi: "पायथन के साथ प्रोग्रामिंग शुरू करें — वेरिएबल्स, प्रिंट, और गणित।",
    videoId: "kqtD5dpn9C8",
    codeSnippet: `# My first Python program
name = "Priya"
age = 16

print(f"Hello, {name}!")
print(f"You are {age} years old")

# Simple calculation
marks = [85, 92, 78, 95, 88]
average = sum(marks) / len(marks)
print(f"Average marks: {average}")`,
    quiz: {
      question: "What does print() do in Python?",
      questionHi: "Python में print() क्या करता है?",
      options: [
        { text: "Displays output on screen", correct: true },
        { text: "Creates a new file", correct: false },
        { text: "Deletes a variable", correct: false },
        { text: "Opens a browser", correct: false },
      ],
    },
    completed: false,
  },
  {
    id: "ai-intro",
    title: "What is AI?",
    titleHi: "AI क्या है?",
    description: "Introduction to Artificial Intelligence — how machines learn and think.",
    descHi: "कृत्रिम बुद्धिमत्ता का परिचय — मशीनें कैसे सीखती और सोचती हैं।",
    videoId: "ad79nYk2keg",
    quiz: {
      question: "AI stands for?",
      questionHi: "AI का पूरा नाम है?",
      options: [
        { text: "Artificial Intelligence", correct: true },
        { text: "Automatic Internet", correct: false },
        { text: "Advanced Input", correct: false },
        { text: "Audio Interface", correct: false },
      ],
    },
    completed: false,
  },
  {
    id: "cybersecurity",
    title: "Cyber Safety",
    titleHi: "साइबर सुरक्षा",
    description: "Stay safe online — passwords, phishing, and privacy basics.",
    descHi: "ऑनलाइन सुरक्षित रहें — पासवर्ड, फ़िशिंग, और गोपनीयता।",
    videoId: "inWWhr5tnEA",
    quiz: {
      question: "Which is the safest password?",
      questionHi: "कौन सा सबसे सुरक्षित पासवर्ड है?",
      options: [
        { text: "Pr!ya$2025#Str0ng", correct: true },
        { text: "123456", correct: false },
        { text: "password", correct: false },
        { text: "priya123", correct: false },
      ],
    },
    completed: false,
  },
];

export default function LearningModules() {
  const { user, language } = useAuth();
  const [moduleList, setModuleList] = useState(modules);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  if (!user) return <Navigate to="/signin" />;

  const active = moduleList.find((m) => m.id === activeModule);
  const completedCount = moduleList.filter((m) => m.completed).length;

  const submitQuiz = (moduleId: string) => {
    const mod = moduleList.find((m) => m.id === moduleId);
    const answer = quizAnswers[moduleId];
    if (!mod || answer === null || answer === undefined) return;

    setQuizSubmitted((prev) => ({ ...prev, [moduleId]: true }));

    if (mod.quiz.options[answer].correct) {
      setModuleList((prev) =>
        prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m))
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="young" />
      <main className="container max-w-4xl py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard/young">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold text-foreground">
              🚀 {language === "en" ? "Learning Modules" : "सीखने के मॉड्यूल"}
            </h1>
            <p className="text-muted-foreground">
              {completedCount}/{moduleList.length} {language === "en" ? "completed" : "पूर्ण"}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-card rounded-xl p-4 shadow-card border border-border mb-8">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full gradient-young rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / moduleList.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">{Math.round((completedCount / moduleList.length) * 100)}%</span>
          </div>
        </div>

        {!activeModule ? (
          /* Module list */
          <div className="space-y-3">
            {moduleList.map((mod, i) => (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveModule(mod.id)}
                className="w-full flex items-center gap-4 p-5 bg-card rounded-2xl shadow-card border border-border hover:shadow-warm hover:border-primary/20 transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${mod.completed ? "bg-accent text-accent-foreground" : "gradient-young text-primary-foreground"}`}>
                  {mod.completed ? <CheckCircle className="h-6 w-6" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {language === "en" ? mod.title : mod.titleHi}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {language === "en" ? mod.description : mod.descHi}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            ))}
          </div>
        ) : active ? (
          /* Module detail */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Button variant="ghost" onClick={() => { setActiveModule(null); setQuizSubmitted({}); }}>
              <ArrowLeft className="h-4 w-4 mr-1" /> {language === "en" ? "Back to modules" : "मॉड्यूल पर वापस"}
            </Button>

            <h2 className="text-2xl font-display font-bold text-foreground">
              {language === "en" ? active.title : active.titleHi}
            </h2>
            <p className="text-muted-foreground text-lg">
              {language === "en" ? active.description : active.descHi}
            </p>

            {/* YouTube Video */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-border aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Code Snippet */}
            {active.codeSnippet && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <div className="bg-foreground/5 px-4 py-2 flex items-center gap-2 border-b border-border">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{language === "en" ? "Code Example" : "कोड उदाहरण"}</span>
                </div>
                <pre className="p-4 bg-foreground/[0.03] overflow-x-auto text-sm leading-relaxed">
                  <code className="text-foreground">{active.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Quiz */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                🧠 {language === "en" ? "Quick Quiz" : "त्वरित क्विज़"}
              </h3>
              <p className="text-foreground font-medium mb-4">
                {language === "en" ? active.quiz.question : active.quiz.questionHi}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {active.quiz.options.map((opt, i) => {
                  const selected = quizAnswers[active.id] === i;
                  const submitted = quizSubmitted[active.id];
                  let borderClass = "border-border";
                  if (submitted && selected) {
                    borderClass = opt.correct ? "border-accent bg-accent/10" : "border-destructive bg-destructive/10";
                  } else if (selected) {
                    borderClass = "border-primary bg-primary/5";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => !submitted && setQuizAnswers((prev) => ({ ...prev, [active.id]: i }))}
                      className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${borderClass} ${!submitted ? "hover:border-primary/50" : ""}`}
                    >
                      <span className="text-foreground">{opt.text}</span>
                      {submitted && selected && (
                        <span className="ml-2">{opt.correct ? "✅" : "❌"}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {!quizSubmitted[active.id] ? (
                <Button
                  variant="hero"
                  className="mt-4"
                  disabled={quizAnswers[active.id] === null || quizAnswers[active.id] === undefined}
                  onClick={() => submitQuiz(active.id)}
                >
                  {language === "en" ? "Submit Answer" : "उत्तर जमा करें"}
                </Button>
              ) : (
                <p className={`mt-4 font-semibold ${active.quiz.options[quizAnswers[active.id]!].correct ? "text-accent" : "text-destructive"}`}>
                  {active.quiz.options[quizAnswers[active.id]!].correct
                    ? (language === "en" ? "🎉 Correct! Module completed!" : "🎉 सही! मॉड्यूल पूर्ण!")
                    : (language === "en" ? "Try again! Review the video and retry." : "फिर से कोशिश करें!")}
                </p>
              )}
            </div>
          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
