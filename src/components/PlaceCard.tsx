import { motion } from "framer-motion";
import { useState } from "react";

interface PlaceCardProps {
  image: string;
  name: string;
  description: string;
  delay: number;
}

const PlaceCard = ({ image, name, description, delay }: PlaceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay }}
      className="w-full aspect-[3/4] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Image */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-display text-xl font-bold">{name}</h3>
            <p className="text-white/80 text-sm">Tap to flip</p>
          </div>
        </div>

        {/* Back - Description */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg bg-card p-6 flex flex-col justify-center items-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="font-display text-2xl font-bold text-primary mb-3">
            {name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <p className="text-sm text-muted-foreground/70 mt-4">Tap to see image</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceCard;
