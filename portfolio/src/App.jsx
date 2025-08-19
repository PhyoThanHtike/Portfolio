import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Nav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import Welcome from './components/Welcome';
import MobileWelcome from './components/MobileWelcome';

// Loading Component with Animation
const LoadingScreen = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 to-gray-900 flex flex-col items-center justify-center z-50">
      <div className="relative w-24 h-24 mb-8">
        {/* Animated circles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-indigo-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translate(0, -35px)`,
              animation: `pulse 1.5s infinite ${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Central circle */}
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </div>
      
      <p className="text-indigo-200 text-xl font-light mb-2">Loading Adventures...</p>
      <div className="w-64 h-2 bg-indigo-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-300 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: rotate(0deg) translate(0, -35px) scale(0.8); }
          50% { opacity: 1; transform: rotate(0deg) translate(0, -35px) scale(1.2); }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imageUrls = useRef(new Set());

  // Function to collect image URLs from components
  const registerImage = (url) => {
    if (url && !imageUrls.current.has(url)) {
      imageUrls.current.add(url);
    }
  };

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Preload all images
  useEffect(() => {
    // Get all image URLs that need to be loaded
    const urls = Array.from(imageUrls.current);
    if (urls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / urls.length) * 100);
          setLoadingProgress(progress);
          resolve(url);
        };
        img.onerror = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / urls.length) * 100);
          setLoadingProgress(progress);
          resolve(url); // Continue even if some images fail
        };
        img.src = url;
      });
    };

    // Load all images
    Promise.all(urls.map(url => loadImage(url)))
      .then(() => {
        // Small delay for smoother transition
        setTimeout(() => setImagesLoaded(true), 500);
      })
      .catch(error => {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // Continue even if there are errors
      });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-gray-100">
      {!imagesLoaded && <LoadingScreen progress={loadingProgress} />}
      
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className={!imagesLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {isMobile ? 
          <MobileWelcome /> : 
          <Welcome registerImage={registerImage} />
        }
        <Hero scrollToSection={scrollToSection}/>
        <Projects />
        <Contact/>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Ethan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;