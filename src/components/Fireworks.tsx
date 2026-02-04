import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  size: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const colors = [
  "hsl(346, 77%, 50%)", // Rose
  "hsl(40, 80%, 55%)",  // Gold
  "hsl(330, 70%, 60%)", // Pink
  "hsl(350, 80%, 65%)", // Light rose
  "hsl(45, 90%, 70%)",  // Light gold
  "hsl(0, 0%, 100%)",   // White
];

const Fireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 0,
        y: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (i / 30) * 360,
        velocity: 100 + Math.random() * 150,
        size: 4 + Math.random() * 6,
      }));

      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 40,
        particles,
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== newFirework.id));
      }, 2000);
    };

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 200);
    }

    // Continuous fireworks
    const interval = setInterval(() => {
      createFirework();
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {firework.particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((particle.angle * Math.PI) / 180) * particle.velocity,
                y: Math.sin((particle.angle * Math.PI) / 180) * particle.velocity,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fireworks;
