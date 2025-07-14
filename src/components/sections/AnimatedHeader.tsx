"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimationProps } from "framer-motion";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
  id: string;
}

interface AnimatedHeaderProps {
  logo?: string;
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleCTAClick = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      // Default download CV action
      const link = document.createElement("a");
      link.href = "/cv.pdf";
      link.download = "CV.pdf";
      link.click();
    }
  };

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
        type: "spring",
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
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
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
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-[1px] animate-gradient bg-300%">
            <div className="h-full w-full rounded-2xl bg-white/80 backdrop-blur-xl" />
          </div>

          {/* Floating shadow */}
          <div className="absolute inset-0 rounded-2xl shadow-[0_8px_32px_rgba(139,92,246,0.2)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(139,92,246,0.3)]" />

          {/* Content */}
          <div className="relative flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavClick("#home")}
            >
              {logo ? (
                <img src={logo} alt={brandName} className="h-14 w-12 rounded-[10px]" />
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
                  className="relative group px-0 py-2 text-neutral bg-white rounded-5 hover:text-primary transition-colors duration-300"
                >
                  <span className="relative z-10 text-black">{item.name}</span>
                  
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
                    className="absolute inset-0 rounded-lg"
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
            <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-[1px]">
              <div className="h-full w-full rounded-b-2xl bg-white/95 backdrop-blur-xl" />
            </div>
            
            <div className="relative p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  variants={mobileMenuItemVariants}
                  whileHover={{ x: 4, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-neutral hover:text-primary transition-all duration-300 relative overflow-hidden"
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