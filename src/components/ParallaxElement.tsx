import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;          // How far to travel vertically
  direction?: "up" | "down"; // Parallax sweep direction
  className?: string;       // Style overrides
}

export default function ParallaxElement({
  children,
  offset = 50,
  direction = "down",
  className = "",
}: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // start parallax when element top hits viewport bottom, end when element bottom leaves viewport top
  });

  // Calculate high performance hardware-accelerated transform matrix values
  const yRange = direction === "down" ? [-offset, offset] : [offset, -offset];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <div ref={targetRef} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
