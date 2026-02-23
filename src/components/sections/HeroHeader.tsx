import { motion } from "motion/react";
import { format } from "date-fns";
import { Activity, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CHALLENGE_START, CHALLENGE_END } from "@/data/constants";

interface HeroHeaderProps {
  athleteCount: number;
}

export function HeroHeader({ athleteCount }: HeroHeaderProps) {
  const dateRange = `${format(CHALLENGE_START, "MMM d")} – ${format(CHALLENGE_END, "MMM d, yyyy")}`;
  const dayCount = Math.round((CHALLENGE_END.getTime() - CHALLENGE_START.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const isComplete = CHALLENGE_END < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-darkest) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
        <div className="absolute -left-5 -bottom-5 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute right-1/4 bottom-0 h-24 w-24 rounded-full bg-white/15" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Activity className="size-6 text-white/90" />
          </motion.div>
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-white/30 text-xs"
          >
            {isComplete ? "Challenge Complete" : "Challenge In Progress"}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          ZoomRx Move More Challenge
        </h1>
        <p className="text-white/80 text-sm sm:text-base mb-4">
          A {dayCount > 0 ? `${dayCount}-day` : ""} fitness challenge bringing the team together through
          movement, consistency, and friendly competition.
        </p>

        <div className="flex flex-wrap gap-4 text-white/90 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <span>{dateRange}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-4" />
            <span>{athleteCount} Athletes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="size-4" />
            <span>Run, Walk & Hike tracked</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
