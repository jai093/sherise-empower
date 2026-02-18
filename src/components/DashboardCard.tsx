import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="text-left w-full rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group border border-border bg-card"
    >
      <div className={`${gradient} p-4`}>
        <Icon className="h-8 w-8 text-primary-foreground" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold font-display text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.button>
  );
}
