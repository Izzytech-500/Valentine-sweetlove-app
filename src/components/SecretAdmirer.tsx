import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Send, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FloatingHearts from "./FloatingHearts";

interface Message {
  id: number;
  text: string;
  sender: "user" | "admirer";
  timestamp: Date;
}

const questions = [
  "What's your favorite memory of us?",
  "What made you fall for me?",
  "What's your idea of a perfect date?",
  "What song reminds you of me?",
  "What do you love most about me?",
  "Where would you love to travel with me?",
  "What's your favorite thing we do together?",
  "When did you first realize you liked me?"
];

const SecretAdmirer = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState<"phone" | "reveal" | "chat">("phone");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setStage("reveal");
      setTimeout(() => {
        setStage("chat");
        setMessages([
          {
            id: 1,
            text: "I Love You 💕",
            sender: "user",
            timestamp: new Date()
          },
          {
            id: 2,
            text: "I've been waiting to hear that! I love you too! 💖",
            sender: "admirer",
            timestamp: new Date()
          }
        ]);
      }, 3000);
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate admirer response
    setTimeout(() => {
      const responses = [
        "That's so sweet! 🥰",
        "You always know what to say 💕",
        "I feel the same way about you!",
        "You make my heart skip a beat! 💓",
        "I'm so lucky to have you!",
        "Every moment with you is special ✨"
      ];

      const admirerMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "admirer",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, admirerMessage]);
    }, 1500);
  };

  const askQuestion = () => {
    const question = questions[currentQuestion];
    const newMessage: Message = {
      id: messages.length + 1,
      text: question,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentQuestion((prev) => (prev + 1) % questions.length);

    // Simulate response
    setTimeout(() => {
      const responses: Record<number, string> = {
        0: "Every moment we spend together becomes my favorite! 💕",
        1: "Your smile, your kindness, everything about you! 😍",
        2: "Anywhere with you is perfect, but maybe a sunset picnic? 🌅",
        3: "Every love song reminds me of you now! 🎵",
        4: "The way you make me feel special and loved 💖",
        5: "Paris, Maldives, Tokyo... anywhere with you! ✈️",
        6: "Just being with you, talking for hours 💬",
        7: "The moment our eyes first met, I just knew ✨"
      };

      const admirerMessage: Message = {
        id: messages.length + 2,
        text: responses[currentQuestion] || "You're amazing! 💕",
        sender: "admirer",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, admirerMessage]);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
      style={{ background: "var(--gradient-romantic)" }}
    >
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {stage === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-16 h-16 text-primary mb-6" fill="currentColor" />
            </motion.div>

            <h2 className="romantic-title text-3xl mb-2 text-center">
              Find Your Secret Admirer
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Enter your phone number to reveal who's been thinking of you 💕
            </p>

            <div className="w-full max-w-sm space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className="pl-12 h-14 text-lg rounded-full border-2 border-primary/30 focus:border-primary bg-card"
                />
              </div>

              <Button
                onClick={handlePhoneSubmit}
                disabled={phoneNumber.length < 10}
                className="w-full h-14 text-lg rounded-full btn-yes"
              >
                Reveal My Admirer 💖
              </Button>
            </div>
          </motion.div>
        )}

        {stage === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="flex-1 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Heart className="w-24 h-24 text-primary" fill="currentColor" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="romantic-title text-4xl mt-8 text-center"
            >
              It's Me! 💕
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-muted-foreground text-xl mt-4 text-center"
            >
              I've been your secret admirer all along...
            </motion.p>
          </motion.div>
        )}

        {stage === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="bg-card/80 backdrop-blur-sm border-b border-border p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Your Secret Admirer</h3>
                <p className="text-muted-foreground text-sm">Online now 💚</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card border border-border rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="p-2 border-t border-border bg-card/50">
              <button
                onClick={askQuestion}
                className="w-full py-2 px-4 rounded-full bg-accent text-accent-foreground text-sm hover:bg-accent/80 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Ask a Question to Get to Know Each Other
              </button>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full"
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SecretAdmirer;
