import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Show navbar when user scrolls past 60% of the viewport
      // This ensures it appears as they approach the second section
      setIsVisible(scrollPosition > viewportHeight * 0.6);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check on mount in case page is already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/logo1.png" 
                  alt="GreenCycle Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-slate-900 tracking-tight text-lg">GREENCYCLE</span>
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide text-sm">
                  Features
                </a>
                <a href="#how-it-works" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide text-sm">
                  How It Works
                </a>
                <a href="#impact" className="text-slate-600 hover:text-emerald-600 transition-colors tracking-wide text-sm">
                  Impact
                </a>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 tracking-wide text-sm h-9">
                  Get Started
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-slate-900"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4 space-y-3"
              >
                <a href="#features" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2 text-sm">
                  Features
                </a>
                <a href="#how-it-works" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2 text-sm">
                  How It Works
                </a>
                <a href="#impact" className="block text-slate-600 hover:text-emerald-600 transition-colors py-2 text-sm">
                  Impact
                </a>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-sm h-9">
                  Get Started
                </Button>
              </motion.div>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}