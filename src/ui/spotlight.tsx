'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  motion,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

export type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 180,
  springOptions = {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  },
}: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [parentElement, setParentElement] =
    useState<HTMLElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const left = useTransform(
    mouseX,
    (x) => `${x - size / 2}px`
  );

  const top = useTransform(
    mouseY,
    (y) => `${y - size / 2}px`
  );

  useEffect(() => {
    if (spotlightRef.current?.parentElement) {
      setParentElement(spotlightRef.current.parentElement);
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;

      const rect =
        parentElement.getBoundingClientRect();

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

    parentElement.addEventListener(
      'mousemove',
      handleMouseMove
    );

    parentElement.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    parentElement.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    return () => {
      parentElement.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      parentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      parentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={spotlightRef}
      className={cn(
        'pointer-events-none absolute rounded-full',
        'transition-opacity duration-300',
        isHovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left,
        top,
      }}
    />
  );
}