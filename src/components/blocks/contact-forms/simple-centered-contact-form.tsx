"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function SimpleCenteredContactForm() {
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    console.log(target);
  };

  const socials = [
    {
      title: "GitHub",
      href: "https://github.com/manuarora700",
      icon: Github,
      description: "Open source projects",
    },
    {
      title: "LinkedIn", 
      href: "https://linkedin.com/in/manuarora28",
      icon: Linkedin,
      description: "Professional network",
    },
    {
      title: "Email",
      href: "mailto:hello@johndoe.com",
      icon: Mail,
      description: "Direct contact",
    },
  ];

  return (
    <div className="bg-white w-full flex items-center justify-center font-[var(--font-body)] py-16 lg:py-24">
      <div className="flex relative px-4 z-20 items-center w-full justify-center">
        <div className="mx-auto w-full max-w-4xl">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-headline)] mb-6 font-[var(--font-display)]">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Ready to turn your ideas into reality? Let's discuss your project and create something extraordinary.
            </p>

            {/* Terminal Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center bg-gray-900 text-green-400 px-6 py-3 rounded-lg font-mono text-sm mb-8"
            >
              <Terminal className="w-4 h-4 mr-2" />
              <span>Status: Available for opportunities</span>
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>
                |
              </span>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--color-border-subtle)]"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Floating Label Input - Name */}
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder=" "
                    className="peer block w-full bg-white px-4 pt-6 pb-2 rounded-lg border-2 border-gray-200 text-[var(--color-foreground)] placeholder-transparent focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[var(--color-primary)]"
                  >
                    Full Name
                  </label>
                </div>

                {/* Floating Label Input - Email */}
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    className="peer block w-full bg-white px-4 pt-6 pb-2 rounded-lg border-2 border-gray-200 text-[var(--color-foreground)] placeholder-transparent focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[var(--color-primary)]"
                  >
                    Email Address
                  </label>
                </div>

                {/* Floating Label Input - Company */}
                <div className="relative">
                  <input
                    id="company"
                    type="text"
                    placeholder=" "
                    className="peer block w-full bg-white px-4 pt-6 pb-2 rounded-lg border-2 border-gray-200 text-[var(--color-foreground)] placeholder-transparent focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                  />
                  <label
                    htmlFor="company"
                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[var(--color-primary)]"
                  >
                    Company (Optional)
                  </label>
                </div>

                {/* Floating Label Textarea - Message */}
                <div className="relative">
                  <textarea
                    rows={5}
                    id="message"
                    placeholder=" "
                    className="peer block w-full bg-white px-4 pt-6 pb-2 rounded-lg border-2 border-gray-200 text-[var(--color-foreground)] placeholder-transparent focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200 resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-2 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[var(--color-primary)]"
                  >
                    Your Message
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Location & Availability */}
              <div className="bg-[var(--color-muted)] p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-[var(--color-secondary)] mr-3" />
                  <div>
                    <h3 className="font-semibold text-[var(--color-headline)]">Location</h3>
                    <p className="text-gray-600">San Francisco, CA</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Available for:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      Full-time opportunities
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                      Consulting projects
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-headline)] mb-4">
                  Connect with me
                </h3>
                <div className="space-y-4">
                  {socials.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.div
                        key={social.title}
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Link
                          href={social.href}
                          className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-muted)] group-hover:bg-[var(--color-primary)] transition-colors duration-200">
                            <IconComponent className="w-5 h-5 text-[var(--color-secondary)] group-hover:text-white transition-colors duration-200" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-[var(--color-headline)] group-hover:text-[var(--color-primary)] transition-colors duration-200">
                              {social.title}
                            </h4>
                            <p className="text-sm text-gray-600">{social.description}</p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}