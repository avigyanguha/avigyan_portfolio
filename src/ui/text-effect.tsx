"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from "motion/react";

import { cn } from "@/lib/utils";

export type PresetType =
  | "blur"
  | "fade-in-blur"
  | "scale"
  | "fade"
  | "slide";

export type PerType = "word" | "char" | "line";

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;

  variants?: {
    container?: Variants;
    item?: Variants;
  };

  className?: string;
  preset?: PresetType;

  delay?: number;
  speedReveal?: number;
  speedSegment?: number;

  trigger?: boolean;

  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;

  segmentWrapperClassName?: string;

  containerTransition?: Transition;
  segmentTransition?: Transition;

  style?: React.CSSProperties;
};


/* =========================================
   DEFAULT STAGGER TIMING
========================================= */

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};


/* =========================================
   DEFAULT CONTAINER VARIANTS
========================================= */

const defaultContainerVariants: Variants = {
  hidden: {
    opacity: 1,
  },

  visible: {
    opacity: 1,
  },

  exit: {
    opacity: 1,
  },
};


/* =========================================
   DEFAULT ITEM VARIANTS
========================================= */

const defaultItemVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};


/* =========================================
   PRESET VARIANTS
========================================= */

const presetVariants: Record<
  PresetType,
  {
    container: Variants;
    item: Variants;
  }
> = {
  blur: {
    container: defaultContainerVariants,

    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
      },

      visible: {
        opacity: 1,
        filter: "blur(0px)",
      },

      exit: {
        opacity: 0,
        filter: "blur(12px)",
      },
    },
  },

  "fade-in-blur": {
    container: defaultContainerVariants,

    item: {
      hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(12px)",
      },

      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },

      exit: {
        opacity: 0,
        y: 20,
        filter: "blur(12px)",
      },
    },
  },

  scale: {
    container: defaultContainerVariants,

    item: {
      hidden: {
        opacity: 0,
        scale: 0,
      },

      visible: {
        opacity: 1,
        scale: 1,
      },

      exit: {
        opacity: 0,
        scale: 0,
      },
    },
  },

  fade: {
    container: defaultContainerVariants,

    item: {
      hidden: {
        opacity: 0,
      },

      visible: {
        opacity: 1,
      },

      exit: {
        opacity: 0,
      },
    },
  },

  slide: {
    container: defaultContainerVariants,

    item: {
      hidden: {
        opacity: 0,
        y: 30,
      },

      visible: {
        opacity: 1,
        y: 0,
      },

      exit: {
        opacity: 0,
        y: 30,
      },
    },
  },
};


/* =========================================
   SPLIT TEXT
========================================= */

const splitText = (
  text: string,
  per: PerType,
): string[] => {
  if (per === "line") {
    return text.split("\n");
  }

  if (per === "word") {
    return text.split(/(\s+)/);
  }

  return text.split("");
};


/* =========================================
   TRANSITION TYPE CHECK
========================================= */

const hasTransition = (
  variant?: Variant,
): variant is TargetAndTransition & {
  transition?: Transition;
} => {
  if (!variant) return false;

  return (
    typeof variant === "object" &&
    "transition" in variant
  );
};


/* =========================================
   APPLY TRANSITIONS
========================================= */

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition,
): Variants => {
  if (!transition) {
    return baseVariants;
  }

  return {
    ...baseVariants,

    visible: {
      ...baseVariants.visible,

      transition: {
        ...(hasTransition(baseVariants.visible)
          ? baseVariants.visible.transition
          : {}),

        ...transition,
      },
    },
  };
};


/* =========================================
   ANIMATED SEGMENT
========================================= */

type AnimationComponentProps = {
  segment: string;
  variants: Variants;
  per: PerType;
  segmentWrapperClassName?: string;
};

const AnimationComponent = React.memo(
  ({
    segment,
    variants,
    per,
    segmentWrapperClassName,
  }: AnimationComponentProps) => {
    const className =
      per === "line"
        ? "block"
        : "inline-block whitespace-pre";

    return (
      <motion.span
        variants={variants}
        aria-hidden="true"
        className={cn(
          className,
          segmentWrapperClassName,
        )}
      >
        {segment}
      </motion.span>
    );
  },
);

AnimationComponent.displayName = "AnimationComponent";


/* =========================================
   TEXT EFFECT
========================================= */

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  const segments = splitText(children, per);

  const MotionTag =
    motion[
      as as keyof typeof motion
    ] as typeof motion.div;

  const baseVariants = presetVariants[preset];

  const stagger =
    defaultStaggerTimes[per] /
    speedReveal;

  const duration =
    0.3 / speedSegment;

  const computedVariants = {
    container: {
      ...(variants?.container ??
        baseVariants.container),

      visible: {
        ...(variants?.container?.visible ??
          baseVariants.container.visible),

        transition: {
          staggerChildren: stagger,
          delayChildren: delay,

          ...containerTransition,
        },
      },
    },

    item: createVariantsWithTransition(
      variants?.item ?? baseVariants.item,
      {
        duration,

        ...segmentTransition,
      },
    ),
  };


  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >

          {/* Accessible text — visually hidden */}
          <span className="sr-only">
            {children}
          </span>

          {/* Animated visible text */}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={
                segmentWrapperClassName
              }
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}