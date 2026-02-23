import type { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  children,
  action,
  className = "",
}: ChartCardProps) {
  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {action}
        </div>
        {description && (
          <CardDescription className="text-sm mt-1">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">{children}</CardContent>
    </Card>
  );
}
