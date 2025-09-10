// bg-gradient-to-b from-purple-900 via-purple-900 to-indigo-900
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaJava,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiTypescript,
  SiPytorch,
  SiSpringboot,
  SiTailwindcss,
  SiJavascript,
  SiLangchain,
} from "react-icons/si";

// Floating title text
const FloatingText = React.memo(({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { duration: 0.9, delay },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
    }}
    className="text-center will-change-transform"
  >
    {children}
  </motion.div>
));

// Optimized background glow (only transforms, no animated gradients)
const BackgroundGlow = React.memo(() => (
  <>
    <motion.div
      className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-20"
      style={{ background: "#6366F1" }}
      animate={{ x: [0, 40, 0, -30, 0], y: [0, 20, 0, -15, 0] }}
      transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-10 right-0 h-80 w-80 rounded-full blur-3xl opacity-20"
      style={{ background: "#8B5CF6" }}
      animate={{ x: [0, -30, 0, 20, 0], y: [0, -15, 0, 25, 0] }}
      transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
));

// Particle (icons or dots)
const Particle = React.memo(({ item }) => {
  const {
    type,
    top,
    left,
    size,
    color,
    amplitudeX,
    amplitudeY,
    delay,
    duration,
  } = item;
  return (
    <motion.div
      className="absolute pointer-events-none select-none will-change-transform"
      style={{ top: `${top}%`, left: `${left}%`, zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.45],
        x: [0, amplitudeX, 0, -amplitudeX, 0],
        y: [0, amplitudeY, 0, -amplitudeY, 0],
      }}
      transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {type === "icon" ? (
        <div style={{ fontSize: size, color, opacity: 0.85 }}>
          <item.Icon />
        </div>
      ) : (
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: "rgba(255,255,255,0.15)",
            filter: "blur(0.5px)",
          }}
        />
      )}
    </motion.div>
  );
});

// Particle wrapper
const Particles = React.memo(() => {
  const Icons = [
    FaReact,
    FaPython,
    FaNodeJs,
    SiTensorflow,
    SiTypescript,
    FaDatabase,
    SiPytorch,
    SiSpringboot,
    SiTailwindcss,
    SiJavascript,
    SiLangchain,
    FaJava,
  ];
  const colors = {
    FaReact: "#61DAFB",
    FaPython: "#3776AB",
    FaNodeJs: "#68A063",
    SiTensorflow: "#FF6F00",
    SiTypescript: "#3178C6",
    FaDatabase: "#9CA3AF",
    SiPytorch: "#EE4C2C",
    SiSpringboot: "#68A063",
    SiTailwindcss: "#38BDF8",
    SiJavascript: "#FACC15",
    SiLangchain: "#68A063",
    FaJava: "#E76F00",
  };

  // Generate particles once
  const items = useMemo(() => {
    const total = 10; // reduced for performance
    const arr = [];
    for (let i = 0; i < total; i++) {
      const isIcon = i % 2 === 0; // mix of icons and dots
      const Icon = Icons[i % Icons.length];
      const name = Icon.displayName || Icon.name;
      arr.push({
        type: isIcon ? "icon" : "dot",
        Icon: isIcon ? Icon : null,
        top: 8 + Math.random() * 84,
        left: 6 + Math.random() * 88,
        size: isIcon
          ? 22 + Math.floor(Math.random() * 8)
          : 7 + Math.floor(Math.random() * 3),
        color: isIcon ? colors[name] || "#ffffff" : "#ffffff",
        amplitudeX: 12 + Math.random() * 36,
        amplitudeY: 10 + Math.random() * 32,
        delay: Math.random() * 3,
        duration: 25 + Math.random() * 10,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {items.map((p, idx) => (
        <Particle key={idx} item={p} />
      ))}
    </div>
  );
});

const MobileWelcome = () => {
  const roles = ["Software Engineer", "AI Engineer", "Data Scientist"];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const scrollToAbout = useCallback(() => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Cycle roles with a brief pause
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 700);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping) {
      setDisplayText("");
      return;
    }
    const text = roles[currentRole];
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 85);
    return () => clearInterval(typing);
  }, [currentRole, isTyping]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-primary">
      {/* Background layers */}
      <BackgroundGlow />
      <Particles />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <FloatingText delay={0.15}>
          <h1 className="text-4xl font-bold mb-2 text-white">I'm a Junior</h1>
        </FloatingText>

        {/* Typing role */}
        <div className="h-16 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                {displayText}
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="px-4 py-2 mb-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold shadow-lg hover:bg-white/20 text-sm transition"
        >
          Explore More
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <p className="text-white/70 text-xs mb-1">Scroll Down</p>
            <FiArrowDown className="text-white/80 text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(MobileWelcome);
