import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Code2, ChevronRight, RefreshCcw } from "lucide-react";
import { modules as initialModules } from "@/data/learning-modules";

export default function LearningModules() {
  const { user, language } = useAuth();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [moduleList, setModuleList] = useState(initialModules);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Reset quiz when module changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  }, [activeModuleId]);

  if (!user) return <Navigate to="/signin" />;

  const filteredModules = category
    ? moduleList.filter((m) => m.category === category)
    : moduleList;

  const activeModule = moduleList.find((m) => m.id === activeModuleId);
  const totalQuestions = activeModule?.questions.length || 0;

  // Handle module completion
  const handleQuizFinish = () => {
    if (activeModuleId && score >= Math.ceil(totalQuestions / 2)) {
      setModuleList((prev) =>
        prev.map((m) => (m.id === activeModuleId ? { ...m, completed: true } : m))
      );
    }
    setQuizCompleted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      handleQuizFinish();
    }
  };

  const submitAnswer = () => {
    if (selectedOption === null || !activeModule) return;
    setIsAnswerSubmitted(true);
    if (activeModule.questions[currentQuestionIndex].options[selectedOption].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const getPageTitle = () => {
    switch(category) {
      case "basics": return language === "en" ? "Computer Basics" : "कंप्यूटर मूल बातें";
      case "coding": return language === "en" ? "Coding & Development" : "कोडिंग और विकास";
      case "trending": return language === "en" ? "Trending Technologies" : "ट्रेंडिंग टेक्नोलॉजीज";
      default: return language === "en" ? "Learning Modules" : "सीखने के मॉड्यूल";
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
              🚀 {getPageTitle()}
            </h1>
            <p className="text-muted-foreground">
               {language === "en" ? "Master the concepts with videos & quizzes" : "वीडियो और क्विज़ के साथ अवधारणाओं में महारत हासिल करें"}
            </p>
          </div>
        </div>

        {!activeModuleId ? (
          /* Module list */
          <div className="space-y-3">
            {filteredModules.map((mod, i) => (
              <motion.button
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveModuleId(mod.id)}
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
            {filteredModules.length === 0 && (
               <div className="text-center py-10 text-muted-foreground">
                 {language === "en" ? "No modules found in this category." : "इस श्रेणी में कोई मॉड्यूल नहीं मिला।"}
               </div>
            )}
          </div>
        ) : activeModule ? (
          /* Module detail */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <Button variant="ghost" onClick={() => setActiveModuleId(null)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> {language === "en" ? "Back to list" : "सूची पर वापस"}
            </Button>

            <h2 className="text-2xl font-display font-bold text-foreground">
              {language === "en" ? activeModule.title : activeModule.titleHi}
            </h2>
            <p className="text-muted-foreground text-lg">
              {language === "en" ? activeModule.description : activeModule.descHi}
            </p>

            {/* YouTube Video */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-border aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeModule.videoId}`}
                title={activeModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Code Snippet */}
            {activeModule.codeSnippet && (
              <div className="rounded-2xl overflow-hidden border border-border">
                <div className="bg-foreground/5 px-4 py-2 flex items-center gap-2 border-b border-border">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{language === "en" ? "Code Example" : "कोड उदाहरण"}</span>
                </div>
                <pre className="p-4 bg-foreground/[0.03] overflow-x-auto text-sm leading-relaxed">
                  <code className="text-foreground">{activeModule.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Quiz Section */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                🧠 {language === "en" ? "Quiz Time" : "क्विज़ का समय"}
              </h3>

              {!quizCompleted ? (
                <>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>{language === "en" ? "Question" : "प्रश्न"} {currentQuestionIndex + 1} / {totalQuestions}</span>
                    <span>{language === "en" ? "Score" : "स्कोर"}: {score}</span>
                  </div>

                  <p className="text-foreground font-medium mb-4 text-lg">
                    {language === "en"
                      ? activeModule.questions[currentQuestionIndex].question
                      : activeModule.questions[currentQuestionIndex].questionHi}
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {activeModule.questions[currentQuestionIndex].options.map((opt, i) => {
                      let borderClass = "border-border";
                      if (isAnswerSubmitted) {
                        if (opt.correct) borderClass = "border-accent bg-accent/10";
                        else if (selectedOption === i) borderClass = "border-destructive bg-destructive/10";
                      } else if (selectedOption === i) {
                        borderClass = "border-primary bg-primary/5";
                      }

                      return (
                        <button
                          key={i}
                          disabled={isAnswerSubmitted}
                          onClick={() => setSelectedOption(i)}
                          className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${borderClass} ${!isAnswerSubmitted ? "hover:border-primary/50" : ""}`}
                        >
                          <span className="text-foreground">{opt.text}</span>
                          {isAnswerSubmitted && opt.correct && <span className="ml-2 float-right">✅</span>}
                          {isAnswerSubmitted && !opt.correct && selectedOption === i && <span className="ml-2 float-right">❌</span>}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    {!isAnswerSubmitted ? (
                      <Button
                        onClick={submitAnswer}
                        disabled={selectedOption === null}
                        className="w-full sm:w-auto"
                      >
                        {language === "en" ? "Check Answer" : "उत्तर जांचें"}
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
                        {currentQuestionIndex < totalQuestions - 1
                          ? (language === "en" ? "Next Question" : "अगला प्रश्न")
                          : (language === "en" ? "Finish Quiz" : "क्विज़ समाप्त करें")}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <h4 className="text-2xl font-bold mb-2">
                    {language === "en" ? "Quiz Completed!" : "क्विज़ पूर्ण!"}
                  </h4>
                  <p className="text-lg text-muted-foreground mb-6">
                    {language === "en" ? "You scored" : "आपने स्कोर किया"} {score} / {totalQuestions}
                  </p>
                  {score >= Math.ceil(totalQuestions / 2) ? (
                    <div className="text-accent flex flex-col items-center gap-2">
                      <CheckCircle className="h-12 w-12" />
                      <span className="font-bold">{language === "en" ? "Great job! Module Passed." : "बहुत बढ़िया! मॉड्यूल पास हुआ।"}</span>
                    </div>
                  ) : (
                    <div className="text-destructive flex flex-col items-center gap-2">
                      <RefreshCcw className="h-12 w-12" />
                      <span className="font-bold">{language === "en" ? "Keep practicing!" : "अभ्यास करते रहें!"}</span>
                    </div>
                  )}
                  <div className="mt-6 flex justify-center gap-4">
                     <Button variant="outline" onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setQuizCompleted(false);
                        setSelectedOption(null);
                        setIsAnswerSubmitted(false);
                     }}>
                        {language === "en" ? "Retry Quiz" : "फिर से क्विज़ करें"}
                     </Button>
                     <Button onClick={() => setActiveModuleId(null)}>
                        {language === "en" ? "Back to Modules" : "मॉड्यूल पर वापस"}
                     </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </main>
    </div>
  );
}
