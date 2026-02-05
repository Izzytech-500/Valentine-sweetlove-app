import { motion } from "framer-motion";
import { Heart, Play, ChevronRight } from "lucide-react";

interface LovePoemsProps {
  onComplete: () => void;
}

const poems = [
  {
    id: 1,
    title: "How Do I Love Thee",
    author: "Elizabeth Barrett Browning",
    videoUrl: "https://www.youtube.com/embed/0p0gDvIE4XM",
    thumbnail: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Sonnet 18",
    author: "William Shakespeare",
    videoUrl: "https://www.youtube.com/embed/DluEwM8-7vE",
    thumbnail: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "She Walks in Beauty",
    author: "Lord Byron",
    videoUrl: "https://www.youtube.com/embed/nZYtQWQZKgs",
    thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "A Red, Red Rose",
    author: "Robert Burns",
    videoUrl: "https://www.youtube.com/embed/p_i-VlXJPg8",
    thumbnail: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Love's Philosophy",
    author: "Percy Bysshe Shelley",
    videoUrl: "https://www.youtube.com/embed/Jq7n-9VVjl0",
    thumbnail: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "i carry your heart",
    author: "E.E. Cummings",
    videoUrl: "https://www.youtube.com/embed/lT92P6mCvcg",
    thumbnail: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=300&fit=crop"
  }
];

const LovePoems = ({ onComplete }: LovePoemsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 px-4 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Heart className="w-10 h-10 text-primary mx-auto mb-4" fill="currentColor" />
        <h2 className="romantic-title text-3xl mb-2">Love Poems</h2>
        <p className="text-muted-foreground">Beautiful words for beautiful moments 💕</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
        {poems.map((poem, index) => (
          <motion.a
            key={poem.id}
            href={poem.videoUrl.replace('/embed/', '/watch?v=')}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img
              src={poem.thumbnail}
              alt={poem.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-display font-bold text-lg">{poem.title}</h3>
              <p className="text-white/70 text-sm">{poem.author}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <button onClick={onComplete} className="btn-yes flex items-center gap-2 mx-auto">
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LovePoems;
