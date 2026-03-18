import { motion } from "framer-motion";

export function BackgroundGradient({
  children,
  className,
  containerClassName,
}) {
  return (
    <div className={`relative group ${containerClassName || ""}`}>
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background:
            "linear-gradient(135deg, #6c47ff, #a855f7, #6c47ff, #7c3aed)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className={`relative bg-bg-card rounded-2xl ${className || ""}`}>
        {children}
      </div>
    </div>
  );
}
