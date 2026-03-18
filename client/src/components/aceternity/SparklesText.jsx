import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SparklesText({ children, className }) {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold",
        className,
      )}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
