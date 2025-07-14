"use client"

import { motion } from "motion/react"
import { ExternalLink, Github, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard. Features include user authentication, shopping cart, order tracking, and admin panel.",
    image: "/api/placeholder/400/300",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    liveUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
    category: "Full-Stack"
  },
  {
    title: "AI-Powered Content Generator",
    description: "Machine learning application that generates high-quality content using natural language processing. Includes sentiment analysis, keyword optimization, and multi-language support.",
    image: "/api/placeholder/400/350",
    techStack: ["Python", "TensorFlow", "FastAPI", "MongoDB", "Docker"],
    liveUrl: "https://ai-content.example.com",
    githubUrl: "https://github.com/example/ai-content",
    category: "AI/ML"
  },
  {
    title: "Real-Time Chat Application",
    description: "Scalable messaging platform with end-to-end encryption, file sharing, group chats, and presence indicators. Built with modern WebSocket technology and optimized for high concurrency.",
    image: "/api/placeholder/400/320",
    techStack: ["Next.js", "Socket.io", "TypeScript", "Prisma", "AWS"],
    liveUrl: "https://chat.example.com",
    githubUrl: "https://github.com/example/chat-app",
    category: "Full-Stack"
  },
  {
    title: "GraphQL API Gateway",
    description: "High-performance API gateway with GraphQL federation, rate limiting, caching, and comprehensive logging. Designed to handle microservices architecture at enterprise scale.",
    image: "/api/placeholder/400/280",
    techStack: ["GraphQL", "Apollo", "Express", "Docker", "Kubernetes"],
    liveUrl: "https://api.example.com",
    githubUrl: "https://github.com/example/graphql-gateway",
    category: "API"
  }
]

const techStackColors: Record<string, string> = {
  "React": "bg-blue-100 text-blue-800",
  "Node.js": "bg-green-100 text-green-800",
  "PostgreSQL": "bg-indigo-100 text-indigo-800",
  "Stripe": "bg-purple-100 text-purple-800",
  "Redis": "bg-red-100 text-red-800",
  "Python": "bg-yellow-100 text-yellow-800",
  "TensorFlow": "bg-orange-100 text-orange-800",
  "FastAPI": "bg-teal-100 text-teal-800",
  "MongoDB": "bg-green-100 text-green-800",
  "Docker": "bg-blue-100 text-blue-800",
  "Next.js": "bg-gray-100 text-gray-800",
  "Socket.io": "bg-purple-100 text-purple-800",
  "TypeScript": "bg-blue-100 text-blue-800",
  "Prisma": "bg-indigo-100 text-indigo-800",
  "AWS": "bg-orange-100 text-orange-800",
  "GraphQL": "bg-pink-100 text-pink-800",
  "Apollo": "bg-purple-100 text-purple-800",
  "Express": "bg-gray-100 text-gray-800",
  "Kubernetes": "bg-blue-100 text-blue-800"
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
}

export default function ProjectsShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-headline mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-body-text max-w-3xl mx-auto">
            A curated selection of my recent work showcasing full-stack development,
            API design, and cutting-edge AI implementations.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
                y: -4
              }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className={`group relative bg-card border border-border-subtle rounded-xl overflow-hidden shadow-sm ${
                index % 3 === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image */}
              <div className="aspect-video overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Code className="w-16 h-16 text-primary opacity-50" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-headline mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-body-text leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`text-xs font-medium px-2.5 py-1 ${
                          techStackColors[tech] || "bg-gray-100 text-gray-800"
                        } border-0`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-border-subtle hover:border-primary hover:text-primary transition-all duration-200 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </Button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}