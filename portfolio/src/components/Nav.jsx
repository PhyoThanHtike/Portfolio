import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";
import logo from "../assets/Logo.png";

export const Navigation = ({
  activeSection,
  setActiveSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Check if we're in mobile view
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Delay to let mobile menu animate closed
      setMobileMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }, 300); // Match duration in AnimatePresence
    } else {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };
  // w-full py-4 bg-primary md:bg-secondary shadow-md z-50 mb-[-10px]

  return (
    <nav
      className="w-full sticky md:static top-0 z-50 py-4 
    bg-blue-900/70 md:bg-secondary 2xl:bg-blue-900/70
    backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-8">
          <div className="flex items-center justify-center">
            <img src={logo} className="w-12 h-12 " alt="logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-lg space-x-8">
            {["about", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-link ${
                  activeSection === item ? "active" : ""
                } hover:text-indigo-400 hover:cursor-pointer`}
              >
                {item === "contact" && "Contact Me"}
                {item === "projects" && "Projects"}
                {item === "about" && "About"}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1locBt5Y-_pzoyGRYVssGMsOVKBuhrzN5/view"
              className="btn-primary flex items-center gap-2"
            >
              <FaFilePdf /> Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`text-gray-400 hover:text-indigo-400 focus:outline-none`}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left capitalize ${
                    activeSection === item
                      ? "bg-gray-700 text-indigo-400"
                      : "text-gray-400 hover:bg-gray-700 hover:text-indigo-400"
                  }`}
                >
                  {item === "contact" ? "Contact Me" : item}
                </button>
              ))}
              <a
                href="https://drive.google.com/file/d/1locBt5Y-_pzoyGRYVssGMsOVKBuhrzN5/view"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium w-full text-left text-gray-400 hover:bg-gray-700 hover:text-indigo-400 flex items-center gap-2"
              >
                <FaFilePdf /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
