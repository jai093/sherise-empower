import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import YoungPioneers from "./pages/dashboard/YoungPioneers";
import MidAge from "./pages/dashboard/MidAge";
import SilverAge from "./pages/dashboard/SilverAge";
import StoriesPage from "./pages/StoriesPage";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import LearningModules from "./pages/LearningModules";
import JobSearch from "./pages/JobSearch";
import SilverTutorials from "./pages/SilverTutorials";
import SosSafety from "./pages/SosSafety";
import NonTechPaths from "./pages/NonTechPaths";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard/young" element={<YoungPioneers />} />
            <Route path="/dashboard/mid" element={<MidAge />} />
            <Route path="/dashboard/silver" element={<SilverAge />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/resume-analysis" element={<ResumeAnalysis />} />
            <Route path="/learning" element={<LearningModules />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/silver-tutorials" element={<SilverTutorials />} />
            <Route path="/sos-safety" element={<SosSafety />} />
            <Route path="/non-tech-paths" element={<NonTechPaths />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
