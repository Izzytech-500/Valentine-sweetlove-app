import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, RefreshCw, ChevronRight, Sparkles } from "lucide-react";

interface PickupLinesProps {
  onComplete: () => void;
}

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
  "Do you have a map? Because I just got lost in your eyes. 👀",
  "Is your name Google? Because you have everything I've been searching for. 🔍",
  "Are you a parking ticket? Because you've got 'fine' written all over you. 🎫",
  "Do you believe in love at first sight, or should I walk by again? 😏",
  "If you were a vegetable, you'd be a cute-cumber! 🥒",
  "Are you a bank loan? Because you've got my interest. 💰",
  "Is your dad a boxer? Because you're a knockout! 🥊",
  "Do you have a sunburn, or are you always this hot? 🔥",
  "Are you a campfire? Because you're hot and I want s'more. 🏕️",
  "If beauty were time, you'd be an eternity. ⏰",
  "Are you a Wi-Fi signal? Because I'm feeling a connection. 📶",
  "Is your name Chapstick? Because you're da balm! 💋",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you. 🩹",
  "Are you a keyboard? Because you're just my type. ⌨️",
  "If you were a fruit, you'd be a fineapple. 🍍",
  "Are you a time traveler? Because I see you in my future. 🚀",
  "Is your dad an artist? Because you're a masterpiece. 🎨",
  "Do you have a mirror in your pocket? Because I can see myself in your pants... wait, that came out wrong! 😅",
  "Are you a 90-degree angle? Because you're looking right! 📐"
];

const PickupLines = ({ onComplete }: PickupLinesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextLine = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % pickupLines.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 flex flex-col"
      style={{ background: "var(--gradient-romantic)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="romantic-title text-3xl mb-2">Funny Pickup Lines</h2>
        <p className="text-muted-foreground">Warning: Extreme cheesiness ahead! 🧀</p>
      </motion.div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card rounded-3xl p-8 shadow-xl border border-border"
            >
              <div className="text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-4" fill="currentColor" />
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  {pickupLines[currentIndex]}
                </p>
                <p className="text-muted-foreground text-sm mt-4">
                  {currentIndex + 1} / {pickupLines.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4 mt-6"
          >
            <button
              onClick={nextLine}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card text-foreground border border-border hover:bg-accent transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Next Line
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <button onClick={onComplete} className="btn-yes flex items-center gap-2 mx-auto">
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PickupLines;
