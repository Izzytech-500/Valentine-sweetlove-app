import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Fireworks from "./Fireworks";
import PlacesGallery from "./PlacesGallery";

type Stage = "question" | "celebration" | "gallery";

const ValentineQuestion = () => {
  const [stage, setStage] = useState<Stage>("question");
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noEscapeCount, setNoEscapeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoPress = () => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 56;
    const padding = 20;

    const maxX = container.width - buttonWidth - padding * 2;
    const maxY = container.height - buttonHeight - padding * 2 - 200; // Account for content above

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2 + 50;

    setNoPosition({ x: newX, y: newY });
    setNoEscapeCount((prev) => prev + 1);
  };

  const handleYesPress = () => {
    setStage("celebration");
    setTimeout(() => {
      setStage("gallery");
    }, 4000);
  };

  const getNoButtonText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really?",
      "Think again!",
      "Please? 🥺",
      "Try catching me!",
      "Can't touch this!",
      "So close!",
      "One more try?",
      "Just say Yes!",
    ];
    return texts[Math.min(noEscapeCount, texts.length - 1)];
  };

  if (stage === "gallery") {
    return <PlacesGallery />;
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative"
      style={{ background: "var(--gradient-romantic)" }}
    >
      <FloatingHearts />

      <AnimatePresence>
        {stage === "celebration" && <Fireworks />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center z-10"
          >
            {/* Heart icon */}
            <motion.div
              className="mb-8 inline-block"
              animate={{
                scale: [1, 1.15, 1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                size={80}
                className="text-primary mx-auto"
                fill="currentColor"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="romantic-title text-4xl md:text-5xl mb-4 leading-tight"
            >
              Will You Be My
              <br />
              Valentine?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-12"
            >
              I promise endless love & adventures 💕
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 relative min-h-[150px]">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesPress}
                className="btn-yes animate-pulse-glow"
              >
                Yes! 💖
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: noPosition.x,
                  ...(noPosition.y !== 0 && { y: noPosition.y }),
                }}
                transition={{
                  delay: noPosition.x === 0 && noPosition.y === 0 ? 0.8 : 0,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onClick={handleNoPress}
                onTouchStart={handleNoPress}
                className="btn-no"
              >
                {getNoButtonText()}
              </motion.button>
            </div>

            {noEscapeCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-sm mt-8"
              >
                {noEscapeCount < 5
                  ? "Catch the No button if you can! 😏"
                  : "Just give up and say Yes! 😄"}
              </motion.p>
            )}
          </motion.div>
        )}

        {stage === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Heart
                size={120}
                className="text-primary mx-auto mb-6"
                fill="currentColor"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="romantic-title text-4xl md:text-5xl mb-4"
            >
              Yay! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-foreground/80"
            >
              You made me the happiest! 💕
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-muted-foreground mt-4"
            >
              Let me show you our future adventures...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineQuestion;
