"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StaticImageData } from "next/image";

interface NavItem {
  name: string;
  href: string;
  id: string;
}

type LogoProp = string | StaticImageData;

interface AnimatedHeaderProps {
  logo?: LogoProp;
  brandName?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  logo,
  brandName = "Portfolio",
  ctaText = "Download CV",
  ctaAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerPadding = useTransform(scrollY, [0, 100], [5, 12]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 16]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Scroll direction detection
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setIsScrolled(scrollY > 50);
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    console.log('Navigating to:', href, 'Element found:', !!element);
    if (element) {
      // Close mobile menu first
      setIsOpen(false);
      
      // Add a small delay to ensure menu is closed before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      console.warn('Element not found for href:', href);
    }
  };

  const handleCTAClick = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      // Default download CV action
      const link = document.createElement("a");
      link.href = "/Rutik-Chavan.pdf";
      link.download = "Rutik-Chavan-CV.pdf";
      link.click();
    }
  };

  const resolvedLogoSrc = typeof logo === "string" ? logo : logo?.src;

  // Animation variants
  const headerVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: scrollDirection === "down" && isScrolled ? -100 : 0,
      opacity: scrollDirection === "down" && isScrolled ? 0 : 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        duration: 0.3,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.6 },
    animate: { scale: 4, opacity: 0 },
  };

  return (
    <>
      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          scale: headerScale,
          borderRadius,
        }}
        className="fixed top-5 left-0 right-0 z-50 mx-auto max-w-7xl"
      >
        <motion.div
          style={{ 
            paddingTop: headerPadding,
            paddingBottom: headerPadding,
            backdropFilter: `blur(${backdropBlur}px)`,
          }}
          className="relative mx-4 lg:mx-8"
        >
          {/* Navbar background (ultra subtle Web3 blockchain + glassmorphism) */}
          <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none bg-gradient-to-r from-cyan-400/15 via-violet-500/15 to-cyan-400/15 animate-gradient bg-300% opacity-70">
            <div className="h-full w-full rounded-2xl bg-black/35 border border-white/10 backdrop-blur-xl overflow-hidden">
              {/* Soft ambient gradients */}
              <div className="absolute inset-0 opacity-90">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_200px_at_20%_0%,rgba(34,211,238,0.22),transparent_55%),radial-gradient(900px_220px_at_70%_30%,rgba(139,92,246,0.18),transparent_60%),linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(34,211,238,0.06)_30%,rgba(139,92,246,0.05)_60%,rgba(0,0,0,0)_100%)]" />
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1920 150"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="25"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 25"
                          fill="none"
                          stroke="rgba(96,165,250,0.22)"
                          strokeWidth="1"
                        />
                      </pattern>
                      <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(34,211,238,0.00)" />
                        <stop offset="25%" stopColor="rgba(34,211,238,0.55)" />
                        <stop offset="70%" stopColor="rgba(139,92,246,0.55)" />
                        <stop offset="100%" stopColor="rgba(139,92,246,0.00)" />
                      </linearGradient>
                      <filter id="glow" x="-50%" y="-100%" width="200%" height="300%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" />
                      </filter>
                    </defs>

                    {/* Grid */}
                    <rect x="0" y="0" width="1920" height="150" fill="url(#grid)" opacity="0.35" />

                    {/* Blockchain network lines */}
                    <g filter="url(#glow)" opacity="0.22">
                      <path
                        d="M -120 88 C 180 35, 330 135, 620 80 S 1080 58, 1320 92 S 1820 140, 2080 70"
                        fill="none"
                        stroke="url(#netGrad)"
                        strokeWidth="1.4"
                        strokeDasharray="6 10"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;-140"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M -90 112 C 210 65, 420 155, 700 108 S 1140 88, 1420 118 S 1800 160, 2120 100"
                        fill="none"
                        stroke="rgba(34,211,238,0.55)"
                        strokeWidth="1"
                        strokeDasharray="10 14"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;120"
                          dur="8s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>

                    {/* Interconnected nodes (subtle horizontal flow) */}
                    <g opacity="0.7" filter="url(#glow)">
                      <circle cx="190" cy="88" r="2.4" fill="rgba(34,211,238,0.9)">
                        <animate
                          attributeName="cx"
                          values="190;520;190"
                          dur="5.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.18;0.65;0.18"
                          dur="5.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="470" cy="84" r="2.2" fill="rgba(139,92,246,0.9)">
                        <animate
                          attributeName="cx"
                          values="470;760;470"
                          dur="6.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.12;0.55;0.12"
                          dur="6.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="740" cy="96" r="2.3" fill="rgba(34,211,238,0.9)">
                        <animate
                          attributeName="cx"
                          values="740;1060;740"
                          dur="5.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="1080" cy="72" r="2.1" fill="rgba(139,92,246,0.9)">
                        <animate
                          attributeName="cx"
                          values="1080;1380;1080"
                          dur="7.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="1430" cy="102" r="2.4" fill="rgba(34,211,238,0.9)">
                        <animate
                          attributeName="cx"
                          values="1430;1710;1430"
                          dur="6.0s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="1720" cy="86" r="2.2" fill="rgba(139,92,246,0.9)">
                        <animate
                          attributeName="cx"
                          values="1720;1900;1720"
                          dur="8.0s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Blurred "digital" texture blocks (no text; abstract hashes/code-like bars) */}
                    <g opacity="0.18" filter="url(#softBlur)">
                      <rect x="120" y="28" width="170" height="10" rx="3" fill="rgba(34,211,238,0.35)" />
                      <rect x="310" y="42" width="130" height="7" rx="3" fill="rgba(139,92,246,0.30)" />
                      <rect x="520" y="30" width="140" height="9" rx="3" fill="rgba(96,165,250,0.28)" />
                      <rect x="980" y="24" width="190" height="10" rx="3" fill="rgba(139,92,246,0.28)" />
                      <rect x="1210" y="40" width="160" height="8" rx="3" fill="rgba(34,211,238,0.28)" />
                      <rect x="1470" y="26" width="190" height="10" rx="3" fill="rgba(96,165,250,0.25)" />
                      {/* diagonal fragments */}
                      <rect x="760" y="70" width="90" height="3" rx="2" fill="rgba(34,211,238,0.35)" />
                      <rect x="820" y="84" width="120" height="3" rx="2" fill="rgba(139,92,246,0.32)" />
                      <rect x="420" y="110" width="120" height="3" rx="2" fill="rgba(96,165,250,0.28)" />
                    </g>

                    {/* Faint light streaks */}
                    <g opacity="0.25">
                      <rect x="-220" y="10" width="520" height="2" fill="rgba(34,211,238,0.8)">
                        <animate
                          attributeName="x"
                          values="-220;520;-220"
                          dur="7.5s"
                          repeatCount="indefinite"
                        />
                      </rect>
                      <rect x="-260" y="136" width="560" height="2" fill="rgba(139,92,246,0.75)">
                        <animate
                          attributeName="x"
                          values="-260;540;-260"
                          dur="9s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavClick("#home")}
            >
              {resolvedLogoSrc ? (
                <img
                  src={resolvedLogoSrc}
                  alt={brandName}
                  className="h-14 w-14 rounded-[10px] object-cover object-center"
                />
              ) : (
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(139, 92, 246, 0.4)",
                      "0 0 0 10px rgba(139, 92, 246, 0)",
                      "0 0 0 0 rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                >
                  {brandName.charAt(0)}
                </motion.div>
              )}
              <span className="text-xl font-bold text-neutral bg-gradient-to-r from-neutral via-primary to-secondary bg-clip-text text-transparent">
                {brandName}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.href)}
                  className="relative group px-3 py-2 text-white/85 bg-white/0 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-colors duration-300"
                >
                  <span className="relative z-10 text-white/90 group-hover:text-white">
                    {item.name}
                  </span>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: activeSection === item.id ? 1 : 0,
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ width: "100%" }}
                  />

                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    variants={rippleVariants}
                    initial="initial"
                    whileTap="animate"
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="group relative"
              >
                <Button
                  onClick={handleCTAClick}
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>{ctaText}</span>
                  </span>
                  
                  {/* Magnetic hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-neutral" />
                ) : (
                  <Menu className="h-6 w-6 text-neutral" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="md:hidden overflow-hidden mx-4 lg:mx-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-r from-cyan-400/15 via-violet-500/15 to-cyan-400/15 p-[1px] pointer-events-none">
              <div className="h-full w-full rounded-b-2xl bg-black/45 border border-white/10 backdrop-blur-xl" />
            </div>
            
            <div className="relative p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  variants={mobileMenuItemVariants}
                  whileHover={{ x: 4, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-white/85 hover:text-white transition-all duration-300 relative overflow-hidden cursor-pointer border border-white/10 hover:bg-white/5"
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeMobileBg"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                variants={mobileMenuItemVariants}
                className="pt-2"
              >
                <Button
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>{ctaText}</span>
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
};