import { useEffect, useRef, useState } from "react";
import { animate } from "motion";

export function useAnimatedNumber(
  target: number,
  duration: number = 1.5,
  decimals: number = 0
): string {
  const [display, setDisplay] = useState("0");
  const prevTarget = useRef(0);

  useEffect(() => {
    const controls = animate(prevTarget.current, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        setDisplay(
          decimals > 0
            ? value.toFixed(decimals)
            : Math.round(value).toLocaleString()
        );
      },
    });

    prevTarget.current = target;

    return () => controls.stop();
  }, [target, duration, decimals]);

  return display;
}
