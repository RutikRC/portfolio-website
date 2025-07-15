"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { TypewriterEffect } from '@/components/sections/TypewriterHero'
import { WavingDogBot } from '@/components/ui/waving-dog-bot'
import { motion } from 'framer-motion'
import { BackgroundVideo } from '@/components/sections/DeveloperDogBackground'
import AnimatedBackground from '@/components/sections/AnimatedBackground'

// const navigation = [
//   { name: 'Skills', href: '#skills' },
//   { name: 'Projects', href: '#projects' },
//   { name: 'Experience', href: '#experience' },
//   { name: 'Contact', href: '#contact' },
// ]

export default function SimpleCentered() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const typewriterSequences = [
    {
      text: "Hello, I'm Rutik Chavan",
      segments: [
        { text: "Hello, I'm ", color: 'default' as const },
        { text: "Rutik Chavan", color: 'primary' as const },
      ],
      typingSpeed: 80,
      pauseAfter: 2500,
      shouldBackspace: true,
      backspaceSpeed: 40
    },
    {
      text: "Building intelligent software solutions",
      segments: [
        { text: "Building ", color: 'default' as const },
        { text: "intelligent", color: 'primary' as const },
        { text: " software ", color: 'default' as const },
        { text: "solutions", color: 'secondary' as const },
      ],
      typingSpeed: 70,
      pauseAfter: 2500,
      shouldBackspace: true,
      backspaceSpeed: 35
    },
    {
      text: "Specializing in MERN Stack & AI",
      segments: [
        { text: "Specializing in ", color: 'default' as const },
        { text: "MERN Stack", color: 'primary' as const },
        { text: " & ", color: 'default' as const },
        { text: "AI", color: 'secondary' as const },
      ],
      typingSpeed: 75,
      pauseAfter: 2500,
      shouldBackspace: true,
      backspaceSpeed: 38
    },
    {
      text: "welcome to Orchids AI",
      segments: [
        { text: "welcome to ", color: 'default' as const },
        { text: "Orchids AI", color: 'primary' as const },
      ],
      typingSpeed: 85,
      pauseAfter: 3000,
      shouldBackspace: true,
      backspaceSpeed: 45
    }
  ]

  return (
    <div className="bg-transparent relative" id='about'>
      
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Rutik's Portfolio - Orchids AI</span>
              {/* <motion.div
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                R
              </motion.div> */}
            </a>
          </div>
          {/* <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div> */}
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <motion.a 
                key={item.name} 
                href={item.href} 
                className="text-sm/6 font-semibold text-gray-900 hover:text-primary transition-colors font-[var(--font-display)]"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div> */}
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.a 
              href="#contact" 
              className="text-sm/6 font-semibold text-secondary hover:text-primary transition-colors font-[var(--font-display)]"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get in touch <span aria-hidden="true">&rarr;</span>
            </motion.a>
          </div> */}
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-lg p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Rutik's Portfolio</span>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  R
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-primary/10 hover:text-primary transition-colors font-[var(--font-display)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-6">
                  <a
                    href="#contact"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-primary/10 hover:text-primary transition-colors font-[var(--font-display)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-2" id='home'>
      <AnimatedBackground/>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-5">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <WavingDogBot size="md" showGreeting={true} />
          </motion.div>

          <motion.div 
            className="hidden sm:mb-8 sm:flex sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-full px-4 py-2 text-sm/6 text-gray-600 ring-1 ring-primary/20 hover:ring-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 font-[var(--font-display)] bg-white/50 backdrop-blur-sm">
              Currently building AI-powered solutions with modern tech stack{' '}
              <a href="#projects" className="font-semibold text-secondary hover:text-primary transition-colors">
                <span aria-hidden="true" className="absolute inset-0" />
                View Projects <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </motion.div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <TypewriterEffect
                sequences={typewriterSequences}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
                cursorColor="text-primary"
                loop={true}
                initialDelay={1000}
              />
            </motion.div>

            <motion.h1 
              className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl lg:text-7xl font-[var(--font-display)] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient">
                Welcome to my Portfolio
              </span>
            </motion.h1>

            <motion.p 
              className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 font-[var(--font-display)] max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              I'm a Junior Blockchain Developer specializing in{' '}
              <span className="text-primary font-semibold">Blockchain</span>,{' '}
              <span className="text-secondary font-semibold">AI Integration</span> &{' '}
              <span className="text-primary font-semibold">Web3</span>. 
              Passionate about creating innovative solutions that bridge technology and user experience. With hands-on
              experience in {' '}
              <span className="text-primary font-semibold">MERN Stack</span>,{' '}

            </motion.p>

            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6 flex-wrap gap-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              <motion.a
                href="#projects"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary font-[var(--font-display)] transition-all duration-200"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="text-sm/6 font-semibold text-secondary hover:text-primary transition-colors font-[var(--font-display)] flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Download Resume{' '}
                <motion.span 
                  aria-hidden="true"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              className="mt-16 flex items-center justify-center gap-8 flex-wrap opacity-60"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <div className="text-xs font-medium text-gray-500 mb-4 w-full">Built with modern technology stack</div>
              {['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Python'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 border border-gray-200"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}