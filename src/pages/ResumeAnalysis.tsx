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
import { ArrowLeft, Upload, FileSearch, Loader2, CheckCircle2, XCircle, TrendingUp, BookOpen, ExternalLink } from "lucide-react";
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

    // Read text from file
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
    } catch (err: any) {
      console.error(err);
      toast({ title: language === "en" ? "Analysis failed" : "विश्लेषण विफल", description: err.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup="mid" />
      <main className="container max-w-3xl py-8">
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
              {language === "en" ? "AI-powered career gap analysis" : "AI-संचालित करियर गैप विश्लेषण"}
            </p>
          </div>
        </div>

        {/* Input section */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-card border border-border mb-6 space-y-5">
          <div className="space-y-2">
            <Label className="text-base">{language === "en" ? "Upload Resume (TXT/PDF text)" : "रिज़्यूमे अपलोड करें"}</Label>
            <div className="flex gap-3">
              <label className="flex-1 flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{fileName || (language === "en" ? "Choose file..." : "फ़ाइल चुनें...")}</span>
                <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">{language === "en" ? "Or paste your resume text" : "या अपना रिज़्यूमे टेक्स्ट पेस्ट करें"}</Label>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={language === "en" ? "Paste your resume content here..." : "अपना रिज़्यूमे यहाँ पेस्ट करें..."}
              className="min-h-[120px] text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">{language === "en" ? "Desired Job Role" : "वांछित नौकरी भूमिका"}</Label>
            <Input
              value={desiredRole}
              onChange={(e) => setDesiredRole(e.target.value)}
              placeholder={language === "en" ? "e.g., Frontend Developer, Data Analyst..." : "जैसे, फ्रंटएंड डेवलपर, डेटा एनालिस्ट..."}
              className="h-12 text-base"
            />
          </div>

          <Button variant="hero" size="lg" onClick={analyze} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? <><Loader2 className="h-5 w-5 animate-spin" /> {language === "en" ? "Analyzing..." : "विश्लेषण..."}</> : <><FileSearch className="h-5 w-5" /> {language === "en" ? "Analyze My Resume" : "मेरा रिज़्यूमे विश्लेषण करें"}</>}
          </Button>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Score */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                {language === "en" ? "Overall Match Score" : "कुल मिलान स्कोर"}
              </h2>
              <div className="flex items-center gap-4">
                <Progress value={result.overallScore} className="flex-1 h-4" />
                <span className="text-2xl font-bold text-primary">{result.overallScore}%</span>
              </div>
              {result.encouragement && (
                <p className="mt-3 text-accent font-medium italic">"{result.encouragement}"</p>
              )}
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {language === "en" ? "Your Strengths" : "आपकी ताकत"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.strengths?.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-primary" />
                  {language === "en" ? "Skills to Learn" : "सीखने के कौशल"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills?.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Roadmaps */}
            {[
              { plan: result.shortTermPlan, icon: "🏃‍♀️", label: language === "en" ? "3-Month Quick Plan" : "3 महीने की योजना" },
              { plan: result.longTermPlan, icon: "🎯", label: language === "en" ? "6-Month Deep Plan" : "6 महीने की गहन योजना" },
            ].map(({ plan, icon, label }) => plan && (
              <div key={label} className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                  {icon} {label}
                </h3>
                <ol className="space-y-3">
                  {plan.steps?.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-mid flex items-center justify-center text-sm font-bold text-primary-foreground">{i + 1}</span>
                      <p className="text-foreground text-sm leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
