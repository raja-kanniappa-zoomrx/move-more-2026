import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  iconBg: string;
  iconColor: string;
  delay?: number;
}

export function StatTile({
  icon: Icon,
  label,
  value,
  suffix = "",
  decimals = 0,
  iconBg,
  iconColor,
  delay = 0,
}: StatTileProps) {
  const displayValue = useAnimatedNumber(value, 1.5, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-card rounded-xl border p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="size-4" style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-2xl font-semibold text-stat-tile-value tabular-nums">
          {displayValue}
          {suffix && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {suffix}
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      </div>
    </motion.div>
  );
}
