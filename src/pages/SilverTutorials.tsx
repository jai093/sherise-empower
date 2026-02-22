import { useState, useEffect } from "react";
import { tutorials, Tutorial } from "@/data/tutorials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardNav from "@/components/DashboardNav";
import { t } from "@/lib/i18n";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, XCircle, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SilverTutorials() {
  const { language } = useAuth();
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showMCQ, setShowMCQ] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // Reset state when a new tutorial is selected
    if (selectedTutorial) {
      setCurrentStep(0);
      setShowMCQ(false);
      setSelectedOption(null);
      setIsCorrect(null);
      stopSpeech();
    }
  }, [selectedTutorial]);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to set language based on app language, default to English
      utterance.lang = language === "hi" ? "hi-IN" : "en-US";

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleNext = () => {
    stopSpeech();
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowMCQ(true);
    }
  };

  const handlePrev = () => {
    stopSpeech();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const checkAnswer = (index: number) => {
    if (!selectedTutorial) return;
    setSelectedOption(index);
    const correct = index === selectedTutorial.mcq.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      speak(language === "en" ? "Correct! Well done." : "सही है! बहुत अच्छे।");
    } else {
      speak(language === "en" ? "Incorrect. Try again." : "गलत। पुनः प्रयास करें।");
    }
  };

  if (!selectedTutorial) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav ageGroup="silver" />
        <main className="container py-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-6">
            {t(language, "tutorials.title")}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                onClick={() => setSelectedTutorial(tutorial)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Volume2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{tutorial.title}</h3>
                  <p className="text-muted-foreground">{tutorial.description}</p>
                  <Button className="w-full">{t(language, "tutorials.start")}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const step = selectedTutorial.steps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-card shadow-sm p-4 sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Button variant="ghost" onClick={() => setSelectedTutorial(null)} className="gap-2">
            <Home className="h-5 w-5" />
            {t(language, "tutorials.back")}
          </Button>
          <span className="font-bold text-lg hidden md:block">{selectedTutorial.title}</span>
          <div className="w-24"></div>
        </div>
      </div>

      <main className="container flex-1 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          {!showMCQ ? (
            <motion.div
              key="step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Image Area */}
              <div className={`aspect-video rounded-xl flex items-center justify-center text-4xl shadow-md ${step.image}`}>
                {/* Placeholder for real image */}
                <div className="text-center p-4">
                   Screenshot Placeholder
                </div>
              </div>

              {/* Text & Voice */}
              <div className="bg-card p-6 rounded-xl shadow-sm border space-y-4">
                <p className="text-2xl font-medium leading-relaxed">{step.text}</p>
                <Button
                  variant={speaking ? "destructive" : "secondary"}
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-lg"
                  onClick={() => speaking ? stopSpeech() : speak(step.voiceText)}
                >
                  <Volume2 className="h-6 w-6" />
                  {speaking ? t(language, "tutorials.stopVoice") : t(language, "tutorials.playVoice")}
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="text-lg px-8"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  {t(language, "tutorials.prev")}
                </Button>
                <Button size="lg" onClick={handleNext} className="text-lg px-8">
                  {currentStep === selectedTutorial.steps.length - 1 ? t(language, "tutorials.quiz") : t(language, "tutorials.next")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mcq"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-center mb-8">{t(language, "tutorials.quizTitle")}</h2>

              <div className="bg-card p-8 rounded-xl shadow-md border space-y-6">
                <h3 className="text-2xl font-semibold">{selectedTutorial.mcq.question}</h3>

                <div className="space-y-4">
                  {selectedTutorial.mcq.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(index)}
                      className={`w-full p-4 text-left text-xl rounded-lg border-2 transition-all flex items-center justify-between
                        ${selectedOption === index
                          ? (isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50")
                          : "border-border hover:border-primary hover:bg-accent"
                        }
                      `}
                    >
                      <span>{option}</span>
                      {selectedOption === index && (
                        isCorrect ? <CheckCircle className="h-6 w-6 text-green-600" /> : <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </button>
                  ))}
                </div>

                {isCorrect !== null && (
                  <div className={`p-4 rounded-lg text-center text-lg font-medium ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {isCorrect ? t(language, "tutorials.correctMessage") : t(language, "tutorials.incorrectMessage")}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button size="lg" variant="outline" onClick={() => setSelectedTutorial(null)}>
                  {t(language, "tutorials.finish")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
