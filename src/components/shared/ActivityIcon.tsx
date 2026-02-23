import { Footprints, Mountain } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ActivityType } from "@/types";

const iconMap: Record<ActivityType, LucideIcon> = {
  Run: Footprints,
  Walk: Footprints,
  Hike: Mountain,
};

interface ActivityIconProps {
  type: ActivityType;
  className?: string;
  size?: number;
}

export function ActivityIcon({
  type,
  className = "",
  size = 16,
}: ActivityIconProps) {
  const Icon = iconMap[type];
  return <Icon className={className} size={size} />;
}

export function getActivityIcon(type: ActivityType): LucideIcon {
  return iconMap[type];
}
