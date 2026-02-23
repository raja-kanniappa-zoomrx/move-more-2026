import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  themes,
  themeLabels,
  themeSwatches,
  type ThemeName,
} from "@/config/themes";

interface ThemePickerProps {
  current: ThemeName;
  onSelect: (theme: ThemeName) => void;
}

export function ThemePicker({ current, onSelect }: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-medium hover:bg-secondary transition-colors"
        title="Switch theme"
      >
        <Palette className="size-3.5" />
        <span className="hidden sm:inline">{themeLabels[current]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 rounded-xl border border-border bg-card shadow-xl p-2 min-w-[160px]"
          >
            <p className="text-[10px] text-muted-foreground px-2 pb-2 font-medium uppercase tracking-wide">
              Theme
            </p>
            {(Object.keys(themes) as ThemeName[]).map((name) => {
              const [bg, primary, accent] = themeSwatches[name];
              const isActive = name === current;
              return (
                <button
                  key={name}
                  onClick={() => {
                    onSelect(name);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  {/* Swatch preview */}
                  <div
                    className="w-8 h-5 rounded flex items-center justify-center gap-0.5 shrink-0 border border-border/50"
                    style={{ backgroundColor: bg }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: primary }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>
                  {themeLabels[name]}
                  {isActive && (
                    <span className="ml-auto text-[10px] text-primary">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
