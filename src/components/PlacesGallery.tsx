import { motion } from "framer-motion";
import PlaceCard from "./PlaceCard";
import santorini from "@/assets/places/santorini.jpg";
import paris from "@/assets/places/paris.jpg";
import maldives from "@/assets/places/maldives.jpg";
import iceland from "@/assets/places/iceland.jpg";
import venice from "@/assets/places/venice.jpg";
import tokyo from "@/assets/places/tokyo.jpg";

const places = [
  {
    image: santorini,
    name: "Santorini, Greece",
    description: "Where white-washed buildings kiss the Aegean Sea, and every sunset is a masterpiece painted just for lovers.",
  },
  {
    image: paris,
    name: "Paris, France",
    description: "The City of Love awaits with its twinkling Eiffel Tower, charming cafés, and romantic strolls along the Seine.",
  },
  {
    image: maldives,
    name: "Maldives",
    description: "Paradise on Earth where crystal waters meet pristine beaches, and overwater bungalows promise endless romance.",
  },
  {
    image: iceland,
    name: "Iceland",
    description: "Dance under the Northern Lights, where nature's most magical light show illuminates your love story.",
  },
  {
    image: venice,
    name: "Venice, Italy",
    description: "Glide through enchanted canals on a gondola, serenaded by the whispers of ancient romance.",
  },
  {
    image: tokyo,
    name: "Tokyo, Japan",
    description: "Walk hand in hand beneath cherry blossoms, where ancient temples guard timeless love stories.",
  },
];

const PlacesGallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background py-8 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="romantic-title text-3xl mb-2">
          Our Dream Destinations
        </h2>
        <p className="text-muted-foreground">
          Places we'll explore together 💕
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {places.map((place, index) => (
          <PlaceCard
            key={place.name}
            image={place.image}
            name={place.name}
            description={place.description}
            delay={0.5 + index * 0.15}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center text-muted-foreground mt-8 text-sm"
      >
        Tap any card to flip ✨
      </motion.p>
    </motion.div>
  );
};

export default PlacesGallery;
