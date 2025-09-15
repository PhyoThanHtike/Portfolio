import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const ProjectCard = ({ project, index }) => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionType, setConnectionType] = useState("unknown");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Optimize Cloudinary URLs with f_auto,q_auto
  const optimizeUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

  useEffect(() => {
    const detectConnection = () => {
      if (navigator.connection) {
        setConnectionType(navigator.connection.effectiveType);
        navigator.connection.addEventListener("change", () => {
          setConnectionType(navigator.connection.effectiveType);
        });
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    detectConnection();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const shouldLoadVideo = () => {
    if (videoLoaded) return true;
    if (["slow-2g", "2g", "3g"].includes(connectionType)) return false;
    return true;
  };

  const handleViewProject = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setVideoError(true));
    }

    if (videoEl.requestFullscreen) videoEl.requestFullscreen();
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -80 : 80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.8, type: "spring", bounce: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8`}
    >
      {/* MEDIA */}
      <motion.div
        whileHover={{ scale: 1.05, rotateZ: index % 2 === 0 ? 1.5 : -1.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="md:w-1/2 w-full"
      >
        <div className="card overflow-hidden rounded-2xl shadow-2xl relative group w-full min-h-[200px] md:min-h-[300px]">
          <motion.img
            src={optimizeUrl(project.image) || "/fallback.jpg"}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{
              scale: 1.1,
              filter: "brightness(1.15) saturate(1.2)",
            }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      {/* TEXT CONTENT */}
      <motion.div
        className="md:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3
          variants={textVariants}
          custom={1}
          className="text-3xl font-extrabold text-gray-100 mb-3"
        >
          {project.title}
        </motion.h3>

        <motion.p
          variants={textVariants}
          custom={2}
          className="text-gray-400 mb-4"
        >
          {project.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              variants={textVariants}
              custom={i + 3}
              className="px-3 py-1 rounded-full text-sm bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <motion.a
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 12px rgba(99,102,241,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 py-2 border border-indigo-600 text-indigo-400 rounded-md overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-indigo-500/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10">Source Code</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};
