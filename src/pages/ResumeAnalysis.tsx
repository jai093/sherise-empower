import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import DashboardNav from "@/components/DashboardNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, FileSearch, Loader2, CheckCircle2, XCircle, TrendingUp, Map, Save, Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AnalysisResult {
  currentSkills: string[];
  missingSkills: string[];
  strengths: string[];
  shortTermPlan: { duration: string; steps: string[] };
  longTermPlan: { duration: string; steps: string[] };
  overallScore: number;
  encouragement: string;
}

export default function ResumeAnalysis() {
  const { user, language } = useAuth();
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState("");
  const [desiredRole, setDesiredRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState("");

  if (!user) return <Navigate to="/signin" />;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const text = await file.text();
    setResumeText(text);
    toast({ title: language === "en" ? `Loaded: ${file.name}` : `लोड: ${file.name}` });
  };

  const analyze = async () => {
    if (!resumeText.trim() || !desiredRole.trim()) {
      toast({ title: language === "en" ? "Please provide resume and desired role" : "कृपया रिज़्यूमे और वांछित भूमिका प्रदान करें", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText: resumeText.slice(0, 5000), desiredRole },
      });

      if (error) throw error;
      if (data?.analysis) {
        setResult(data.analysis);
        toast({ title: language === "en" ? "Analysis complete!" : "विश्लेषण पूरा!" });
      } else {
        throw new Error("No analysis returned");
      }
    } catch (err) {
      console.error(err);
      toast({ title: language === "en" ? "Analysis failed" : "विश्लेषण विफल", description: (err as Error).message || "Unknown error", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveRoadmap = () => {
    toast({
      title: language === "en" ? "Roadmap Saved!" : "रोडमैप सहेजा गया!",
      description: language === "en" ? "You can access this in your profile later." : "आप इसे बाद में अपनी प्रोफ़ाइल में एक्सेस कर सकते हैं।"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="mid" />
      <main className="container max-w-4xl py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/dashboard/mid">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              <FileSearch className="inline h-8 w-8 text-primary mr-2" />
              {language === "en" ? "Resume & Skill Analysis" : "रिज़्यूमे और कौशल विश्लेषण"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en" ? "AI-powered career gap analysis & roadmap" : "AI-संचालित करियर गैप विश्लेषण और रोडमैप"}
            </p>
          </div>
        </div>

        {/* Input section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card border border-border mb-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base">{language === "en" ? "Upload Resume (TXT/PDF text)" : "रिज़्यूमे अपलोड करें"}</Label>
              <div className="flex gap-3">
                <label className="flex-1 flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors bg-background/50">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">{fileName || (language === "en" ? "Choose file..." : "फ़ाइल चुनें...")}</span>
                  <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-base">{language === "en" ? "Desired Job Role" : "वांछित नौकरी भूमिका"}</Label>
              <Input
                value={desiredRole}
                onChange={(e) => setDesiredRole(e.target.value)}
                placeholder={language === "en" ? "e.g., Frontend Developer, Data Analyst..." : "जैसे, फ्रंटएंड डेवलपर, डेटा एनालिस्ट..."}
                className="h-[50px] text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">{language === "en" ? "Or paste your resume text" : "या अपना रिज़्यूमे टेक्स्ट पेस्ट करें"}</Label>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={language === "en" ? "Paste your resume content here..." : "अपना रिज़्यूमे यहाँ पेस्ट करें..."}
              className="min-h-[100px] text-base"
            />
          </div>

          <Button variant="hero" size="lg" onClick={analyze} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? <><Loader2 className="h-5 w-5 animate-spin" /> {language === "en" ? "Generating Roadmap..." : "रोडमैप बना रहा है..."}</> : <><Map className="h-5 w-5" /> {language === "en" ? "Generate Career Roadmap" : "करियर रोडमैप बनाएं"}</>}
          </Button>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

            {/* Score & Skills */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border md:col-span-1 text-center flex flex-col items-center justify-center">
                <h2 className="text-lg font-bold text-muted-foreground mb-2">
                  {language === "en" ? "Match Score" : "मिलान स्कोर"}
                </h2>
                <div className="relative h-24 w-24 flex items-center justify-center">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * result.overallScore) / 100} />
                  </svg>
                  <span className="text-3xl font-bold text-foreground">{result.overallScore}%</span>
                </div>
                {result.encouragement && <p className="mt-4 text-sm text-muted-foreground italic">"{result.encouragement}"</p>}
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border md:col-span-2">
                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    {language === "en" ? "Your Strengths" : "आपकी ताकत"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.strengths?.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    {language === "en" ? "Skills to Acquire" : "कौशल प्राप्त करने के लिए"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills?.map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-red-500/10 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Roadmap */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                      <Map className="h-6 w-6 text-primary" />
                      {language === "en" ? "Your Personalized Career Roadmap" : "आपका व्यक्तिगत करियर रोडमैप"}
                    </h2>
                    <p className="text-muted-foreground">
                      {language === "en" ? "Step-by-step guide to reach your goal" : "अपने लक्ष्य तक पहुँचने के लिए चरण-दर-चरण मार्गदर्शिका"}
                    </p>
                  </div>
                  <Button onClick={saveRoadmap} variant="outline" className="gap-2">
                    <Save className="h-4 w-4" /> {language === "en" ? "Save Roadmap" : "रोडमैप सहेजें"}
                  </Button>
               </div>

               <div className="space-y-12">
                  {/* Short Term */}
                  {result.shortTermPlan && (
                    <div className="relative border-l-2 border-primary/30 pl-8 ml-4 space-y-8">
                       <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                       <div>
                          <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {language === "en" ? "Phase 1: Foundation (0-3 Months)" : "चरण 1: नींव (0-3 महीने)"}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">{result.shortTermPlan.duration}</p>
                          <div className="space-y-4">
                            {result.shortTermPlan.steps.map((step, i) => (
                              <div key={i} className="bg-background/50 p-4 rounded-xl border border-border flex gap-4 items-start hover:border-primary/50 transition-colors">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">{i + 1}</div>
                                <p className="text-foreground">{step}</p>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Long Term */}
                  {result.longTermPlan && (
                    <div className="relative border-l-2 border-secondary/30 pl-8 ml-4 space-y-8">
                       <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-secondary ring-4 ring-secondary/20" />
                       <div>
                          <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            {language === "en" ? "Phase 2: Mastery (3-6 Months)" : "चरण 2: महारत (3-6 महीने)"}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">{result.longTermPlan.duration}</p>
                          <div className="space-y-4">
                            {result.longTermPlan.steps.map((step, i) => (
                              <div key={i} className="bg-background/50 p-4 rounded-xl border border-border flex gap-4 items-start hover:border-secondary/50 transition-colors">
                                <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold text-secondary flex-shrink-0 mt-0.5">{i + 1}</div>
                                <p className="text-foreground">{step}</p>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Goal */}
                  <div className="relative pl-8 ml-4">
                    <span className="absolute -left-[11px] top-0 h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary ring-4 ring-background shadow-lg flex items-center justify-center text-white text-[10px]">★</span>
                    <h3 className="text-lg font-bold text-foreground">
                       {language === "en" ? "Goal Achieved: " : "लक्ष्य प्राप्त: "} {desiredRole}
                    </h3>
                  </div>
               </div>
            </div>

          </motion.div>
        )}
      </main>
    </div>
  );
}
