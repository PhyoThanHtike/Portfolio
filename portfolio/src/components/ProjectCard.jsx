import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const ProjectCard = ({ project, index }) => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewProject = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Play and fullscreen the video
    videoEl.play();
    if (videoEl.requestFullscreen) {
      videoEl.requestFullscreen();
    } else if (videoEl.webkitEnterFullscreen) {
      videoEl.webkitEnterFullscreen();
    } else if (videoEl.mozRequestFullScreen) {
      videoEl.mozRequestFullScreen();
    } else if (videoEl.msRequestFullscreen) {
      videoEl.msRequestFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* VIDEO or POSTER IMAGE */}
      <div className="md:w-1/2">
        <div className="card overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-[300px] bg-black">
            {isMobile ? (
              <>
                {/* <img
                  src={project.image || '/fallback.jpg'}
                  ref={videoRef}
                  alt="Project Poster"
                  className="w-full h-full object-cover"
                /> */}
                {/* Hidden video for fullscreen */}
                {/* <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.image || '/fallback.jpg'}
                  // className="hidden"
                  controls
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                /> */}
                <video
                ref={videoRef}
                // className="absolute inset-0 w-full h-full object-cover"
                src={project.video}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster={project.image || "/fallback.jpg"}
              ></video>
              </>
            ) : (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={project.video}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster={project.image || "/fallback.jpg"}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold text-gray-100 mb-3">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewProject}
            className="btn-primary"
          >
            View Project
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.url}
            className="px-4 py-2 border border-indigo-600 text-indigo-400 rounded-md hover:bg-indigo-900/30 transition"
          >
            Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

