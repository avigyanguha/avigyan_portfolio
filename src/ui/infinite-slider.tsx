"use client";

import { useMotionValue, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const isHorizontal = direction === "horizontal";

  const [isHovering, setIsHovering] = useState(false);
  const currentSpeed = isHovering && speedOnHover ? speedOnHover : speed;

  const [trackRef, { width: trackWidth, height: trackHeight }] = useMeasure();
  const translation = useMotionValue(0);

  const trackSize = isHorizontal ? trackWidth : trackHeight;

  useEffect(() => {
    if (!trackSize || !currentSpeed) {
      return;
    }
    const distance = (trackSize + gap) / 2;
    const start = reverse ? 0 : -distance;
    const end = reverse ? -distance : 0;
    const current = translation.get();
    const isInRange = current >= -distance && current <= 0;
    const from = isInRange ? current : start;
    const remaining = Math.abs(end - from);
    let cancelled = false;
    let controls: { stop: () => void } | undefined;
    const runLoop = () => {
      controls = animate(translation, [start, end], {
        ease: "linear",
        duration: distance / currentSpeed,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    };
    if (remaining < 0.5) {
      runLoop();
    } else {
      controls = animate(translation, [from, end], {
        ease: "linear",
        duration: remaining / currentSpeed,
        onComplete: () => {
          if (!cancelled) runLoop();
        },
      });
    }
    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [translation, trackSize, gap, currentSpeed, reverse]);
  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsHovering(true);
        },
        onHoverEnd: () => {
          setIsHovering(false);
        },
      }
    : {};
  const flexDirection = isHorizontal ? "row" : "column";
  const groupStyle: React.CSSProperties = {
    display: "flex",
    flexShrink: 0,
    flexDirection,
    gap: `${gap}px`,
  };
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection,
          gap: `${gap}px`,
          ...(isHorizontal
            ? { width: "max-content", x: translation }
            : { height: "max-content", y: translation }),
        }}
        {...hoverProps}
      >
        <div style={groupStyle}>{children}</div>
        <div style={groupStyle} aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
