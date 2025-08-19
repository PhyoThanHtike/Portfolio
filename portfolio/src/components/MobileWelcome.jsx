
// bg-gradient-to-b from-purple-900 via-purple-900 to-indigo-900
// bg-gradient-to-b from-purple-900 via-purple-900 to-indigo-900
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { FaReact, FaPython, FaNodeJs, FaDatabase, FaJava } from "react-icons/fa";
import { SiTensorflow, SiTypescript, SiPytorch, SiSpringboot, SiTailwindcss, SiJavascript, SiLangchain } from "react-icons/si";

// ---- Floating, recruiter-friendly mobile hero ----
// Notes:
// • Keeps your exact background gradient.
// • Adds lively but subtle animated glow + slowly drifting particles/icons.
// • Text floats gently; roles type with a blinking caret.
// • Explore button + Scroll indicator both smooth-scroll to #about.

const FloatingText = React.memo(({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{ opacity: { duration: 0.9, delay }, y: { duration: 5, repeat: Infinity, delay } }}
    className="text-center"
  >
    {children}
  </motion.div>
));

const BackgroundGlow = React.memo(() => {
  return (
    <>
      {/* Soft, shifting multi-radial wash */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent 70%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.2), transparent 70%)",
            "radial-gradient(circle at 75% 25%, rgba(139,92,246,0.25), transparent 70%), radial-gradient(circle at 35% 70%, rgba(99,102,241,0.2), transparent 70%)",
            "radial-gradient(circle at 40% 70%, rgba(99,102,241,0.25), transparent 70%), radial-gradient(circle at 15% 20%, rgba(139,92,246,0.2), transparent 70%)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Two very soft drifting blobs for depth */}
      <motion.div
        className="absolute -top-10 -left-10 h-56 w-56 rounded-full blur-3xl opacity-20"
        style={{ background: "#6366F1" }}
        animate={{ x: [0, 40, 0, -30, 0], y: [0, 20, 0, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-0 h-64 w-64 rounded-full blur-3xl opacity-20"
        style={{ background: "#8B5CF6" }}
        animate={{ x: [0, -30, 0, 20, 0], y: [0, -15, 0, 25, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
});

const Particle = React.memo(({ item }) => {
  const { type, top, left, size, color, amplitudeX, amplitudeY, delay, duration } = item;

  // We keep top/left static and animate x/y with transform for smoother perf
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ top: `${top}%`, left: `${left}%`, zIndex: 0, willChange: "transform" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 0.7, 0.45], x: [0, amplitudeX, 0, -amplitudeX, 0], y: [0, amplitudeY, 0, -amplitudeY, 0] }}
      transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {type === "icon" ? (
        <motion.div style={{ fontSize: size, color, opacity: 0.9 }}>
          <item.Icon />
        </motion.div>
      ) : (
        <motion.div
          className="rounded-full"
          style={{ width: size, height: size, background: "rgba(255,255,255,0.18)", filter: "blur(0.5px)" }}
        />
      )}
    </motion.div>
  );
});

const Particles = React.memo(() => {
  const Icons = [FaReact, FaPython, FaNodeJs, SiTensorflow, SiTypescript, FaDatabase, SiPytorch, SiSpringboot, SiTailwindcss, SiJavascript, SiLangchain, FaJava];
  const colors = {
    FaReact: "#61DAFB",
    FaPython: "#3776AB",
    FaNodeJs: "#68A063",
    SiTensorflow: "#FF6F00",
    SiTypescript: "#3178C6",
    FaDatabase: "#9CA3AF", // subtle steel for DB icon
    SiPytorch: "#EE4C2C",
    SiSpringboot: "#68A063",
    SiTailwindcss: "#3776AB",
    SiJavascript: "#FFFF00",
    SiLangchain: "#68A063",
    FaJava: "#68A063"
  };

  // Pre-generate once to avoid jitter on re-render
  const items = useMemo(() => {
    const total = 14; // reduced from 18 for better performance
    const arr = [];

    for (let i = 0; i < total; i++) {
      const isIcon = i % 2 === 0; // mix of icons and dots
      const Icon = Icons[i % Icons.length];
      const name = Icon.displayName || Icon.name;

      arr.push({
        type: isIcon ? "icon" : "dot",
        Icon: isIcon ? Icon : null,
        top: 8 + Math.random() * 84, // keep within safe bounds
        left: 6 + Math.random() * 88,
        size: isIcon ? 22 + Math.floor(Math.random() * 10) : 8 + Math.floor(Math.random() * 3),
        color: isIcon ? colors[name] || "#ffffff" : "#ffffff",
        amplitudeX: 14 + Math.random() * 52, // px movement range
        amplitudeY: 10 + Math.random() * 50,
        delay: Math.random() * 3,
        duration: 28 + Math.random() * 14, // slow + calm
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

  // Cycle roles with a brief pause for readability
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
      {/* Lively background layers */}
      <BackgroundGlow />
      <Particles />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <FloatingText delay={0.15}>
          <h1 className="text-4xl font-bold mb-2 text-white">I'm a Junior</h1>
        </FloatingText>

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
          whileHover={{ scale: 1.05 }}
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