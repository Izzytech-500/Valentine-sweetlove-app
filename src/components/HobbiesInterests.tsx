import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Check, Sparkles } from "lucide-react";

const hobbies = [
  "Reading", "Cooking", "Traveling", "Photography", "Gaming",
  "Dancing", "Painting", "Music", "Hiking", "Movies",
  "Yoga", "Gardening", "Writing", "Sports", "Crafts"
];

const interests = [
  "Art & Culture", "Technology", "Fashion", "Food & Wine",
  "Nature", "Animals", "Science", "History", "Music",
  "Fitness", "Adventure", "Books", "Cinema", "Romance", "Spirituality"
];

interface HobbiesInterestsProps {
  onComplete: () => void;
}

const HobbiesInterests = ({ onComplete }: HobbiesInterestsProps) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [step, setStep] = useState<"hobbies" | "interests" | "complete">("hobbies");

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleNextStep = () => {
    if (step === "hobbies") {
      setStep("interests");
    } else if (step === "interests") {
      setStep("complete");
      setTimeout(onComplete, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4"
      style={{ background: "var(--gradient-romantic)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="romantic-title text-3xl mb-2">
          {step === "hobbies" && "What Are Your Hobbies?"}
          {step === "interests" && "What Are Your Interests?"}
          {step === "complete" && "Perfect Match! 💕"}
        </h2>
        <p className="text-muted-foreground">
          {step === "hobbies" && "Select the things you love to do"}
          {step === "interests" && "What topics excite you?"}
          {step === "complete" && "We have so much in common!"}
        </p>
      </motion.div>

      {step !== "complete" && (
        <>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-wrap gap-3 justify-center max-w-lg mx-auto mb-8"
          >
            {(step === "hobbies" ? hobbies : interests).map((item, index) => {
              const isSelected = step === "hobbies"
                ? selectedHobbies.includes(item)
                : selectedInterests.includes(item);

              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => step === "hobbies" ? toggleHobby(item) : toggleInterest(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card text-foreground hover:bg-accent border border-border"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                  {item}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleNextStep}
              disabled={(step === "hobbies" ? selectedHobbies : selectedInterests).length === 0}
              className="btn-yes disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === "hobbies" ? "Next →" : "Continue 💖"}
            </button>
          </motion.div>
        </>
      )}

      {step === "complete" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 text-primary mx-auto" fill="currentColor" />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HobbiesInterests;
