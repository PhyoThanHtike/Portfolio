import { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation } from './components/Nav';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import Welcome from './components/Welcome';
import MobileWelcome from './components/MobileWelcome';

// Loading Component with Animation
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
              marginTop: '-0.5rem',
              marginLeft: '-0.5rem',
              animation: `pulse 1.5s infinite ${i * 0.2}s`,
            }}
          />
        ))}
        
        {/* Central circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-indigo-900 font-bold text-xs">{progress}%</span>
          </div>
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
          0% {
            transform: rotate(0deg) translate(0, -35px) scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: rotate(0deg) translate(0, -35px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: rotate(0deg) translate(0, -35px) scale(0.8);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imageUrls = useRef(new Set());

  // Use useCallback to memoize the registerImage function
  const registerImage = useCallback((url) => {
    if (url && !imageUrls.current.has(url)) {
      imageUrls.current.add(url);
    }
  }, []);

  // Check screen size and set appropriate state
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      // For MacBook Air M1 (13.3" with 2560×1600 resolution)
      // The viewport width at 100% zoom is around 1440px
      // At 1500px breakpoint, we'll show MobileWelcome for larger screens
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width >= 768 && width < 1024) {
        setScreenSize('tablet');
      } else if (width >= 1024 && width < 1500) {
        setScreenSize('desktop'); // MacBook Air M1 and similar 13-14" laptops
      } else {
        setScreenSize('xl'); // 15" and larger laptops/screens
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
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

  // Determine which welcome component to render
  const renderWelcomeComponent = () => {
    // Use MobileWelcome for extra large screens (15" and above)
    if (screenSize === 'xl') {
      return <MobileWelcome registerImage={registerImage} />;
    }
    // Use regular Welcome for all other sizes
    return <Welcome registerImage={registerImage} />;
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
        {renderWelcomeComponent()}
        <Hero scrollToSection={scrollToSection} registerImage={registerImage} />
        <Projects registerImage={registerImage} />
        <Contact registerImage={registerImage} />
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