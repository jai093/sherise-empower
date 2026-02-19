import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/i18n";
import { Heart, MessageCircle, Share2, Mic, MicOff, Send, ArrowLeft, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import DashboardNav from "@/components/DashboardNav";

interface Story {
  id: string;
  nickname: string;
  content: string;
  voiceUrl?: string;
  ageGroup: string;
  likesCount: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

// Demo stories for showcase
const demoStories: Story[] = [
  {
    id: "1",
    nickname: "TechDidi",
    content: "I started learning coding at 35 after a 10-year career break. Today, I work as a frontend developer! Never think it's too late. The journey was hard but every small step counted. 💪",
    ageGroup: "mid",
    likesCount: 24,
    liked: false,
    comments: [
      { id: "c1", nickname: "CodeGirl", content: "So inspiring! I'm 28 and just starting — this gives me hope! 🙌", createdAt: "2h ago" },
    ],
    createdAt: "5h ago",
  },
  {
    id: "2",
    nickname: "NaniWisdom",
    content: "At 62, my granddaughter taught me WhatsApp video calling. Now I teach other seniors in my colony. Technology connects hearts across distances. ❤️",
    ageGroup: "silver",
    likesCount: 41,
    liked: false,
    comments: [],
    createdAt: "1d ago",
  },
  {
    id: "3",
    nickname: "FutureEngineer",
    content: "Just completed my first Python project — a calculator app! It's small but I built it myself. Next goal: building a website! 🚀",
    ageGroup: "young",
    likesCount: 18,
    liked: false,
    comments: [
      { id: "c2", nickname: "MentorAnjali", content: "Great start! Try building a to-do app next — it teaches state management!", createdAt: "3h ago" },
    ],
    createdAt: "8h ago",
  },
];

export default function StoriesPage() {
  const { user, language } = useAuth();
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>(demoStories);
  const [newStory, setNewStory] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const ageGroup = user?.ageGroup || "mid";

  const getAgeLabel = (group: string) => {
    switch(group) {
      case "silver": return language === "en" ? "Silver Wisdom" : "सिल्वर विज़डम";
      case "mid": return language === "en" ? "Mid-Career Pro" : "मिड-करियर प्रो";
      case "young": return language === "en" ? "Young Pioneer" : "यंग पायनियर";
      default: return "";
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        // Add story with voice
        const story: Story = {
          id: Date.now().toString(),
          nickname: user?.nickname || "Anonymous",
          content: language === "en" ? "🎤 Voice Note" : "🎤 वॉइस नोट",
          voiceUrl: url,
          ageGroup,
          likesCount: 0,
          liked: false,
          comments: [],
          createdAt: language === "en" ? "Just now" : "अभी",
        };
        setStories((prev) => [story, ...prev]);
        toast({ title: language === "en" ? "Voice note shared!" : "वॉइस नोट साझा!" });
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      toast({ title: language === "en" ? "Microphone access denied" : "माइक्रोफ़ोन अनुमति अस्वीकार", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const postStory = () => {
    if (!newStory.trim()) return;
    const story: Story = {
      id: Date.now().toString(),
      nickname: user?.nickname || "Anonymous",
      content: newStory.trim(),
      ageGroup,
      likesCount: 0,
      liked: false,
      comments: [],
      createdAt: language === "en" ? "Just now" : "अभी",
    };
    setStories((prev) => [story, ...prev]);
    setNewStory("");
    toast({ title: language === "en" ? "Story shared!" : "कहानी साझा!" });
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav ageGroup={ageGroup} />
      <main className="container max-w-2xl py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/dashboard/${ageGroup}`}>
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              {language === "en" ? "Community Mentorship" : "सामुदायिक मेंटरशिप"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en" ? "Connect & learn across generations" : "पीढ़ियों के पार जुड़ें और सीखें"}
            </p>
          </div>
        </div>

        {/* Global Feed Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl border border-primary/20 mb-8 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary flex-shrink-0" />
          <p className="text-sm font-medium text-foreground">
             {language === "en"
               ? "You are viewing the global community feed. Advice from Silver Wisdom, Mid-Career Pros, and Young Pioneers is visible to everyone!"
               : "आप वैश्विक समुदाय फ़ीड देख रहे हैं। सिल्वर विज़डम, मिड-करियर पेशेवरों और यंग पायनियर्स की सलाह सभी के लिए दृश्यमान है!"}
          </p>
        </div>

        {/* Post new story */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8"
        >
          <Textarea
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            placeholder={language === "en" ? "Share your experience, advice, or story..." : "अपना अनुभव, सलाह या कहानी साझा करें..."}
            className="min-h-[100px] text-base mb-4 resize-none"
          />
          <div className="flex items-center gap-3">
            <Button variant="hero" onClick={postStory} disabled={!newStory.trim()}>
              <Send className="h-4 w-4" /> {language === "en" ? "Share to Community" : "समुदाय में साझा करें"}
            </Button>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isRecording
                ? language === "en" ? "Stop" : "रुकें"
                : language === "en" ? "Voice Note" : "वॉइस नोट"}
            </Button>
          </div>
        </motion.div>

        {/* Stories feed */}
        <div className="space-y-5">
          <AnimatePresence>
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground shadow-md ${
                      story.ageGroup === "young" ? "gradient-young" : story.ageGroup === "mid" ? "gradient-mid" : "gradient-silver"
                    }`}>
                      {story.nickname[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground block">{story.nickname}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                         story.ageGroup === "young" ? "bg-cyan-100 text-cyan-700" : story.ageGroup === "mid" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                      }`}>
                         {getAgeLabel(story.ageGroup)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{story.createdAt}</span>
                </div>

                <p className="text-foreground leading-relaxed mb-4 text-base">{story.content}</p>

                {story.voiceUrl && (
                  <audio controls className="w-full mb-4 rounded-lg">
                    <source src={story.voiceUrl} type="audio/webm" />
                  </audio>
                )}

                <div className="flex items-center gap-4 text-muted-foreground border-t border-border pt-4">
                  <button
                    onClick={() => toggleLike(story.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${story.liked ? "text-primary" : "hover:text-primary"}`}
                  >
                    <Heart className={`h-5 w-5 ${story.liked ? "fill-current" : ""}`} />
                    {story.likesCount}
                  </button>
                  <button
                    onClick={() => setExpandedComments((prev) => {
                      const next = new Set(prev);
                      next.has(story.id) ? next.delete(story.id) : next.add(story.id);
                      return next;
                    })}
                    className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {story.comments.length}
                  </button>
                  <button onClick={() => copyLink(story.id)} className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors ml-auto">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Comments section */}
                <AnimatePresence>
                  {expandedComments.has(story.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-border space-y-3 overflow-hidden"
                    >
                      {story.comments.map((c) => (
                        <div key={c.id} className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                            {c.nickname[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-foreground">{c.nickname}</span>
                              <span className="text-xs text-muted-foreground">{c.createdAt}</span>
                            </div>
                            <p className="text-sm text-foreground">{c.content}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <input
                          value={commentText[story.id] || ""}
                          onChange={(e) => setCommentText((prev) => ({ ...prev, [story.id]: e.target.value }))}
                          onKeyDown={(e) => e.key === "Enter" && addComment(story.id)}
                          placeholder={language === "en" ? "Add a supportive comment..." : "टिप्पणी जोड़ें..."}
                          className="flex-1 h-9 px-3 rounded-lg border border-input bg-background text-sm"
                        />
                        <Button size="sm" variant="default" onClick={() => addComment(story.id)}>
                          <Send className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
