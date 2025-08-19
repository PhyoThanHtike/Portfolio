import React, { useState, useEffect } from "react";
import man_cliff from "../assets/man_for_port_2-Photoroom.png";
import jungle1 from "../assets/jungle1-Photoroom.png";
import jungle2 from "../assets/jungle2-Photoroom.png";
import jungle3 from "../assets/jungle3-Photoroom.png";
import jungle4 from "../assets/jungle4-Photoroom.png";
import jungle5 from "../assets/jungle5-Photoroom.png";
import background from "../assets/background-Photoroom.png";
import { motion, useScroll, useTransform } from "framer-motion";

const Welcome = ({ registerImage }) => {
  const { scrollY } = useScroll();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Register all images
    if (registerImage) {
      registerImage(man_cliff);
      registerImage(jungle1);
      registerImage(jungle2);
      registerImage(jungle3);
      registerImage(jungle4);
      registerImage(jungle5);
      registerImage(background);
    }
  }, [registerImage]);

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const yCity = useTransform(scrollY, [0, screenHeight * 0.5], [-50, -105]);
  const yHero = useTransform(scrollY, [0, screenHeight * 0.5], [100, 20]);
  const xHero = useTransform(scrollY, [0, screenHeight * 0.5], [100, 0]);
  const opacityCity = useTransform(
    scrollY,
    [0, screenHeight * 0.2, screenHeight * 0.4, screenHeight * 0.5],
    [1, 0.9, 0.5, 0]
  );
  const opacityHero = useTransform(scrollY, [0, screenHeight * 0.5], [1, 1]);

  const xjungle = useTransform(scrollY, [0, screenHeight * 0.5], [0, 0]);
  const xjungle2 = useTransform(scrollY, [0, screenHeight * 0.5], [0, 0]);
  const xjungle3 = useTransform(scrollY, [0, screenHeight * 0.5], [0, 0]);
  const xjungle4 = useTransform(scrollY, [0, screenHeight * 0.5], [-50, 0]);
  const xjungle5 = useTransform(scrollY, [0, screenHeight * 0.5], [-100, 0]);

  const yjungle = useTransform(scrollY, [0, screenHeight * 0.5], [40, -10]);
  const yjungle2 = useTransform(scrollY, [0, screenHeight * 0.5], [60, -5]);
  const yjungle3 = useTransform(scrollY, [0, screenHeight * 0.5], [80, 5]);
  const yjungle4 = useTransform(scrollY, [0, screenHeight * 0.5], [100, 10]);
  const yjungle5 = useTransform(scrollY, [0, screenHeight * 0.5], [100, 20]);

  const yText = useTransform(
    scrollY,
    [0, screenHeight * 0.4, screenHeight * 0.7],
    [-100, 50, 100]
  );

  // Text rotation logic
  const titles = ["Software Engineer", "Data Scientist", "AI Engineer"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const rotateTitles = () => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }, 1000);
    };

    const interval = setInterval(rotateTitles, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTyping) {
      setDisplayText("");
      return;
    }

    const currentTitle = titles[currentTitleIndex];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < currentTitle.length) {
        setDisplayText(currentTitle.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentTitleIndex, isTyping]);

  return (
    <>
      <header className="relative h-[95vh] w-full overflow-hidden">
        {/* Background image */}
        <motion.img
          style={{
            opacity: opacityCity,
            y: yCity,
          }}
          className="absolute z-10 w-full h-8/11 md:h-4/5 object-cover"
          src={background}
          alt="background"
        />

        {/* Text overlay - centered with high z-index */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{
            y: yText,
            opacity: opacityCity,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-indigo-400 mb-2"
          >
            I'm Junior
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-7xl text-center font-bold"
          >
            {displayText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Jungle images */}
        {[jungle1, jungle2, jungle3, jungle4, jungle5].map((jungle, index) => (
          <motion.img
            key={index}
            style={{
              opacity: opacityHero,
              y: [yjungle, yjungle2, yjungle3, yjungle4, yjungle5][index],
              x: [xjungle, xjungle2, xjungle3, xjungle4, xjungle5][index],
              height: "800px",
            }}
            className="absolute z-20 w-full h-full object-contain"
            src={jungle}
            alt={`jungle${index + 1}`}
          />
        ))}

        {/* Man cliff image */}
        <motion.img
          style={{
            opacity: opacityHero,
            y: yHero,
            x: xHero,
            // Fixed width (adjust to your image's natural size)
            height: "800px", // Fixed height (adjust as needed)
          }}
          className="absolute z-30 object-contain pointer-events-none"
          src={man_cliff}
          alt="man on cliff"
        />
      </header>
    </>
  );
};

export default Welcome;
