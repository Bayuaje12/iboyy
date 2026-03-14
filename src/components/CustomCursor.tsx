import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const isHovering = useRef(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringSpringX = useSpring(ringX, { damping: 20, stiffness: 200, mass: 0.8 });
  const ringSpringY = useSpring(ringY, { damping: 20, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringSpringX, y: ringSpringY }}
      />
    </>
  );
};

export default CustomCursor;
