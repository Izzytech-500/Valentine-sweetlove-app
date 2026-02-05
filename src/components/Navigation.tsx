import { motion } from "framer-motion";
import { Heart, MessageCircle, Music, Sparkles, MapPin } from "lucide-react";

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "question", icon: Heart, label: "Valentine" },
  { id: "hobbies", icon: Sparkles, label: "Hobbies" },
  { id: "poems", icon: Music, label: "Poems" },
  { id: "pickup", icon: MessageCircle, label: "Lines" },
  { id: "places", icon: MapPin, label: "Places" },
  { id: "admirer", icon: Heart, label: "Admirer" },
];

const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border z-50 safe-area-inset-bottom"
    >
      <div className="flex justify-around items-center py-2 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "scale-110" : ""}`}
                fill={isActive ? "currentColor" : "none"}
              />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
