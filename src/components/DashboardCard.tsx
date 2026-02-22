import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

export default function DashboardCard({ icon: Icon, title, description, gradient, delay = 0, onClick }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: delay
      }}
      onClick={onClick}
      className="relative text-left w-full h-full rounded-2xl overflow-hidden bg-card border border-border shadow-sm group hover:shadow-xl transition-all duration-300"
    >
      <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1`}>
        <ArrowRight className="h-5 w-5 text-primary/50" />
      </div>

      <div className={`${gradient} p-5 transition-all duration-300 group-hover:brightness-110`}>
        <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.button>
  );
}
