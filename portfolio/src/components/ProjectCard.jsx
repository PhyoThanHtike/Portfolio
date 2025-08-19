import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const ProjectCard = ({ project, index }) => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [connectionType, setConnectionType] = useState('unknown');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Detect connection type
    const detectConnection = () => {
      if (navigator.connection) {
        setConnectionType(navigator.connection.effectiveType);
        // Listen for connection changes
        navigator.connection.addEventListener('change', () => {
          setConnectionType(navigator.connection.effectiveType);
        });
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    detectConnection();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video load events
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  // Only load videos on good connections or if user explicitly requests
  const shouldLoadVideo = () => {
    // Always load if user clicked view project
    if (videoLoaded) return true;
    
    // Don't load videos on slow connections
    if (['slow-2g', '2g', '3g'].includes(connectionType)) {
      return false;
    }
    
    return true;
  };

  const handleViewProject = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Try to play the video even if it wasn't preloaded
    const playPromise = videoEl.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // If video fails to play, show the fallback image
        setVideoError(true);
      });
    }
    
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
            {!shouldLoadVideo() || videoError ? (
              // Show poster image for slow connections or if video fails
              <img
                src={project.image || "/fallback.jpg"}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                // className="absolute inset-0 w-full h-full object-cover"
                src={shouldLoadVideo() ? project.video : ''}
                muted
                loop
                autoPlay={shouldLoadVideo()}
                playsInline
                preload="none" // Changed to none to prevent auto-loading
                poster={project.image || "/fallback.jpg"}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
              >
                Your browser does not support the video tag.
              </video>
            )}
            
            {/* Loading indicator */}
            {!videoLoaded && shouldLoadVideo() && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
            
            {/* Play button overlay for when video isn't autoplaying */}
            {!shouldLoadVideo() && (
              <button 
                onClick={handleViewProject}
                className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-40 transition-opacity hover:bg-opacity-20"
                aria-label="Load and play video"
              >
                <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
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
            {shouldLoadVideo() && !videoError ? 'View Project' : 'View Demo'}
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

