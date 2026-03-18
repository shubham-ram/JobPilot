import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export function TextGenerateEffect({ words, className }) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)" },
      { duration: 0.3, delay: stagger(0.02) },
    );
  }, [words, animate]);

  return (
    <div className={className}>
      <motion.div ref={scope} className="leading-relaxed">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="opacity-0"
            style={{ filter: "blur(4px)" }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
