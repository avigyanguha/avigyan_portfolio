'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'motion/react';

export type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className = '',
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(
    mouseX,
    (x) => `${x - size / 2}px`
  );

  const spotlightTop = useTransform(
    mouseY,
    (y) => `${y - size / 2}px`
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;
    setParentElement(parent);
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const rect = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', handleMouseEnter);
    parentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', handleMouseEnter);
      parentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        background:
          'radial-gradient(circle, rgba(18, 33, 89, 0.9) 0%, rgba(61, 77, 107, 0.75) 45%, rgba(61, 77, 107, 0) 80%)',
        filter: 'blur(10px)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 80ms ease',
      }}
    />
  );
}

export function SpotlightBorder() {
  return (
    <div className="skill-card__spotlight-border">
      <Spotlight
        className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
        size={124}
        springOptions={{
          stiffness: 500,
          damping: 30,
          mass: 0.2,
        }}
      />
      <div className="skill-card__spotlight-surface" />
    </div>
  );
}