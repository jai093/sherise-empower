import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Heart, MessageCircle, Share2, Mic, MicOff, Send, ArrowLeft, Users, Sparkles, X, Play, Square, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Comment {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

type StoryCategory = "achievement" | "failure" | "comeback" | "motivation" | "life_lesson" | "other";

interface Story {
  id: string;
  nickname: string;
  content: string;
  type: "text" | "audio";
  audioBase64?: string;
  ageGroup: string;
  likesCount: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
  timestamp: number;
  category: StoryCategory;
}

// Initial demo data
const initialStories: Story[] = [];

// Changed key to v2 to invalidate old static data seeded in v1
const STORAGE_KEY = "sherise_stories_v2";

const CATEGORIES: StoryCategory[] = ["achievement", "failure", "comeback", "motivation", "life_lesson"];

export default function StoriesPage() {
  const { user, language } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | undefined>(undefined);
  const [filterCategory, setFilterCategory] = useState<StoryCategory | "all">("all");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript, hasRecognition } = useSpeechRecognition();

  const ageGroup = user?.ageGroup || "mid";

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stories", e);
        setStories(initialStories);
      }
    } else {
      setStories(initialStories);
    }
  }, []);

  // Save to localStorage whenever stories change
  useEffect(() => {
    if (stories.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    }
  }, [stories]);

  // Handle Voice Input
  useEffect(() => {
    if (transcript) {
      setNewStory((prev) => prev + (prev ? " " : "") + transcript);
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const getAgeLabel = (group: string) => {
    switch(group) {
      case "silver": return language === "en" ? "Silver Wisdom" : "सिल्वर विज़डम";
      case "mid": return language === "en" ? "Mid-Career Pro" : "मिड-करियर प्रो";
      case "young": return language === "en" ? "Young Pioneer" : "यंग पायनियर";
      default: return "";
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case "achievement": return t(language, "stories.filterAchievements");
      case "failure": return t(language, "stories.filterFailures");
      case "comeback": return t(language, "stories.filterComebacks");
      case "motivation": return t(language, "stories.filterMotivation");
      case "life_lesson": return t(language, "stories.filterLifeLessons");
      default: return cat;
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;

          const story: Story = {
            id: Date.now().toString(),
            nickname: user?.nickname || "Anonymous",
            content: language === "en" ? "Shared a voice experience 🎤" : "एक वॉइस अनुभव साझा किया 🎤",
            type: "audio",
            audioBase64: base64data,
            ageGroup,
            likesCount: 0,
            liked: false,
            comments: [],
            createdAt: language === "en" ? "Just now" : "अभी",
            timestamp: Date.now(),
            category: selectedCategory || "other",
          };
          setStories((prev) => [story, ...prev]);
          toast({ title: language === "en" ? "Voice note shared!" : "वॉइस नोट साझा!", description: "Your voice is now part of the community." });
        };

        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
        setRecordingTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            stopVoiceRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error(err);
      toast({ title: language === "en" ? "Microphone access denied" : "माइक्रोफ़ोन अनुमति अस्वीकार", variant: "destructive" });
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const postStory = () => {
    if (!newStory.trim()) return;
    const story: Story = {
      id: Date.now().toString(),
      nickname: user?.nickname || "Anonymous",
      content: newStory.trim(),
      type: "text",
      ageGroup,
      likesCount: 0,
      liked: false,
      comments: [],
      createdAt: language === "en" ? "Just now" : "अभी",
      timestamp: Date.now(),
      category: selectedCategory || "other",
    };
    setStories((prev) => [story, ...prev]);
    setNewStory("");
    setSelectedCategory(undefined);
    toast({ title: language === "en" ? "Story shared!" : "कहानी साझा!", description: "Your experience has been posted." });
  };

  const toggleLike = (id: string) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, liked: !s.liked, likesCount: s.liked ? s.likesCount - 1 : s.likesCount + 1 }
          : s
      )
    );
  };

  const addComment = (storyId: string) => {
    const text = commentText[storyId]?.trim();
    if (!text) return;
    const comment: Comment = {
      id: Date.now().toString(),
      nickname: user?.nickname || "Anonymous",
      content: text,
      createdAt: language === "en" ? "Just now" : "अभी",
    };
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, comments: [...s.comments, comment] } : s))
    );
    setCommentText((prev) => ({ ...prev, [storyId]: "" }));
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/stories/${id}`);
    toast({ title: language === "en" ? "Link copied!" : "लिंक कॉपी!" });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredStories = filterCategory === "all"
    ? stories
    : stories.filter(s => s.category === filterCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardNav ageGroup={ageGroup} />
      <main className="container max-w-2xl py-8 px-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/dashboard/${ageGroup}`}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-display font-bold text-foreground flex items-center gap-2"
            >
              <Users className="h-8 w-8 text-primary" />
              {language === "en" ? "Community Mentorship" : "सामुदायिक मेंटरशिप"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground"
            >
              {language === "en" ? "Connect & learn across generations" : "पीढ़ियों के पार जुड़ें और सीखें"}
            </motion.p>
          </div>
        </div>

        {/* Global Feed Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-4 rounded-xl border border-primary/20 mb-8 flex items-center gap-4 shadow-sm"
        >
          <div className="bg-primary/20 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground leading-snug">
             {language === "en"
               ? "You are viewing the global community feed. Share your journey—successes, failures, and advice—to inspire Silver Wisdom, Mid-Career Pros, and Young Pioneers alike!"
               : "आप वैश्विक समुदाय फ़ीड देख रहे हैं। अपनी यात्रा—सफलताएं, असफलताएं और सलाह—साझा करें और सभी को प्रेरित करें!"}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={filterCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("all")}
          >
            {t(language, "stories.filterAll")}
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={filterCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className="whitespace-nowrap"
            >
              {getCategoryLabel(cat)}
            </Button>
          ))}
        </div>

        {/* Post new story */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8 relative overflow-hidden group hover:shadow-warm transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            {language === "en" ? "Share your experience" : "अपना अनुभव साझा करें"}
          </h2>

          <Textarea
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            placeholder={language === "en" ? "What did you learn today? What challenge did you overcome?" : "आज आपने क्या सीखा? आपने किस चुनौती को पार किया?"}
            className="min-h-[100px] text-base mb-4 resize-none bg-muted/30 focus:bg-background transition-colors border-muted focus:border-primary"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-2">
                 {/* Category Selector */}
                <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as StoryCategory)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t(language, "stories.selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="other">Other</SelectItem>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{getCategoryLabel(cat)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

               {/* Speech to Text Button */}
               {hasRecognition && (
                 <Button
                    variant={isListening ? "destructive" : "secondary"}
                    size="icon"
                    onClick={isListening ? stopListening : startListening}
                    title={isListening ? t(language, "stories.stopSpeaking") : t(language, "stories.startSpeaking")}
                 >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                 </Button>
               )}
            </div>

            <div className="flex items-center gap-3">
               {isRecording && (
                 <span className="text-red-500 font-mono font-bold animate-pulse flex items-center gap-2 text-sm bg-red-100 px-2 py-1 rounded-md">
                   <span className="w-2 h-2 bg-red-500 rounded-full block"></span>
                   {formatTime(recordingTime)}
                 </span>
               )}

               <Button
                variant={isRecording ? "destructive" : "outline"}
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`transition-all duration-300 ${isRecording ? "px-6" : ""}`}
                disabled={newStory.length > 0}
              >
                {isRecording ? <Square className="h-4 w-4 mr-2 fill-current" /> : <Mic className="h-4 w-4 mr-2" />}
                {isRecording
                  ? language === "en" ? "Stop Recording" : "रिकॉर्डिंग रोकें"
                  : language === "en" ? "Voice Note" : "वॉइस नोट"}
              </Button>

              <Button
                variant="hero"
                onClick={postStory}
                disabled={!newStory.trim() && !isRecording} // Allow if recording or text
                className="shadow-lg hover:shadow-primary/20"
              >
                <Send className="h-4 w-4 mr-2" /> {language === "en" ? "Post" : "पोस्ट करें"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stories feed */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300, delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-primary-foreground shadow-md bg-gradient-to-br ${
                      story.ageGroup === "young" ? "from-cyan-400 to-blue-600" : story.ageGroup === "mid" ? "from-purple-400 to-pink-600" : "from-orange-400 to-red-600"
                    }`}>
                      {story.nickname[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-foreground block text-lg">{story.nickname}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          story.ageGroup === "young" ? "bg-cyan-50 border-cyan-200 text-cyan-700" : story.ageGroup === "mid" ? "bg-purple-50 border-purple-200 text-purple-700" : "bg-orange-50 border-orange-200 text-orange-700"
                        }`}>
                          {getAgeLabel(story.ageGroup)}
                        </span>
                        {story.category && story.category !== "other" && (
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {getCategoryLabel(story.category)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{story.createdAt}</span>
                </div>

                <div className="mb-5">
                    {story.type === 'text' ? (
                        <p className="text-foreground leading-relaxed text-base whitespace-pre-wrap">{story.content}</p>
                    ) : (
                        <div className="bg-muted/30 p-4 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                <Mic className="h-4 w-4" /> {story.content}
                            </p>
                            {story.audioBase64 && (
                                <audio controls className="w-full h-10 rounded-lg opacity-90 hover:opacity-100 transition-opacity">
                                    <source src={story.audioBase64} type="audio/webm" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-6 text-muted-foreground border-t border-border pt-4">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleLike(story.id)}
                    className={`flex items-center gap-2 text-sm transition-colors group ${story.liked ? "text-primary font-medium" : "hover:text-primary"}`}
                  >
                    <Heart className={`h-5 w-5 transition-all ${story.liked ? "fill-current scale-110" : "group-hover:scale-110"}`} />
                    <span>{story.likesCount} {language === "en" ? "Likes" : "पसंद"}</span>
                  </motion.button>

                  <button
                    onClick={() => setExpandedComments((prev) => {
                      const next = new Set(prev);
                      if (next.has(story.id)) {
                        next.delete(story.id);
                      } else {
                        next.add(story.id);
                      }
                      return next;
                    })}
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span>{story.comments.length} {language === "en" ? "Comments" : "टिप्पणियाँ"}</span>
                  </button>

                  <button onClick={() => copyLink(story.id)} className="flex items-center gap-2 text-sm hover:text-primary transition-colors ml-auto group">
                    <Share2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>

                {/* Comments section */}
                <AnimatePresence>
                  {expandedComments.has(story.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-border space-y-4 overflow-hidden bg-muted/10 -mx-6 px-6 pb-2"
                    >
                      {story.comments.length > 0 ? (
                        story.comments.map((c) => (
                          <div key={c.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0 border border-border">
                              {c.nickname[0]}
                            </div>
                            <div className="bg-background p-3 rounded-lg rounded-tl-none border border-border shadow-sm flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-foreground">{c.nickname}</span>
                                <span className="text-[10px] text-muted-foreground">{c.createdAt}</span>
                              </div>
                              <p className="text-sm text-foreground/90">{c.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic text-center py-2">{language === "en" ? "No comments yet. Be the first!" : "अभी तक कोई टिप्पणी नहीं। सबसे पहले बनें!"}</p>
                      )}

                      <div className="flex gap-3 mt-4 items-end">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mb-1">
                            {user?.nickname?.[0] || "U"}
                        </div>
                        <div className="flex-1 relative">
                            <Textarea
                            value={commentText[story.id] || ""}
                            onChange={(e) => setCommentText((prev) => ({ ...prev, [story.id]: e.target.value }))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    addComment(story.id);
                                }
                            }}
                            placeholder={language === "en" ? "Write a supportive comment..." : "एक सहायक टिप्पणी लिखें..."}
                            className="min-h-[40px] max-h-[100px] resize-none pr-10 text-sm py-3"
                            />
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute right-1 bottom-1 h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                                onClick={() => addComment(story.id)}
                                disabled={!commentText[story.id]?.trim()}
                            >
                            <Send className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {filteredStories.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                 {t(language, "jobs.noResults")}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
