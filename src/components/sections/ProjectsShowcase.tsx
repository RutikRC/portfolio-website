"use client"

import { motion } from "motion/react"
import { ExternalLink, Code } from "lucide-react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconBrandGithub } from "@tabler/icons-react"
import rwaImage from "@/assets/RWA.png"
import volantixImage from "@/assets/volantix.png"
import dfmImage from "@/assets/DFM.png"

const projects = [
  {
    title: "VMAP",
    description: "Comprehensive CRM system for Vishwa Medical Admission Point, managing data for 2,000+ users with high performance. Features include user management, data analytics, and scalable backend infrastructure.",
    image: "/crm-2.png",
    techStack: ["NestJS", "TypeScript", "Tailwind CSS", "React.js", "AWS EC2", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Full-Stack",
    company: "Karmacts Systems Pvt. Ltd.",
    duration: "August 2024 - March 2025"
  },
  {
    title: "Ample CRM",
    description: "Comprehensive CRM system for Ample Electricals, managing data for 2,000+ users with high performance. Features include user management, data analytics, and scalable backend infrastructure.",
    image: "/crm-1.png",
    techStack: ["NestJS", "TypeScript", "Tailwind CSS", "AWS EC2", "MongoDB"],
    liveUrl: "https://app.ampleelectricals.in/",
    githubUrl: "#",
    category: "Full-Stack",
    company: "Karmacts Systems Pvt. Ltd.",
    duration: "August 2024 - October 2024"
  },
  {
    title: "Stock Market Analysis",
    description: "Machine learning model using Linear Regression to predict future opening prices of NSE-listed bank stocks with 85% accuracy. Includes comprehensive data analysis and interactive visualizations.",
    image: "/stock-analytics.jpg",
    techStack: ["Python", "Machine Learning", "Linear Regression", "Power BI", "NSE Data"],
    liveUrl: "#",
    githubUrl: "https://github.com/RutikRC/Stock-Market-Analysis",
    category: "AI/ML",
    company: "Edubridge Learning Pvt. Ltd.",
    duration: "September 2023 - December 2023"
  },
  {
    title: "Spacemate Interior Solutions",
    description: "Complete interior design platform with CRM integration, serving 1,500+ users. Features include project management, customer tracking, and comprehensive business analytics.",
    image: "/home.jpg",
    techStack: ["Django", "React.js", "Ant Design", "Redux Toolkit", "Python Anywhere", "MySQL"],
    liveUrl: "https://www.spacemate.in/",
    githubUrl: "#",
    category: "Full-Stack",
    company: "Karmacts Systems Pvt. Ltd.",
    duration: "February 2024 - September 2024"
  },
  {
    title: "DeFi Market MVP",
    description: "DeFi Trading Platform built for creating, managing, and trading Decentralized Token Folios (DTFs) across multiple blockchains. Our next-generation platform enables permissionless vault creation for ETFs (exchange-traded funds), powered by automated rebalancing, multi-asset portfolio management, and fully transparent fee structures - delivering scalable, secure, and efficient DeFi trading experiences.",
    image: dfmImage.src,
    imageClassName: "object-center scale-[1.06]",
    techStack: ["Rust", "Anchor", "Solana web3.js", "TypeScript", "React", "Nest.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Blockchain",
    company: "Personal Project",
    duration: "2025"
  },
  {
    title: "Volantix AMM Bot - Automated Market Maker Trading System",
    description: "Automated Market Maker (AMM) trading system on Binance Smart Chain focused on high-frequency, rule-driven execution with liquidity management, slippage protection, and anti-volatility controls. It combines custom smart contracts, real-time dashboards, and backend APIs to deliver reliable, scalable DeFi trade operations and portfolio visibility.",
    image: volantixImage.src,
    imageClassName: "object-center scale-[1.12]",
    techStack: ["Solidity", "Node.js", "React", "Web3.js", "Express.js", "MongoDB", "Binance Smart Chain", "PancakeSwap", "AWS", "Nginx", "PM2"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Blockchain",
    company: "Personal Project",
    duration: "2025"
  },
  {
    title: "RWA Tokenization",
    description: "Real World Asset (RWA) tokenization platform designed to bridge on-chain smart contracts with secure off-chain systems for compliant asset issuance, tracking, and liquidity operations. The platform includes payment and wallet integrations, low-latency analytics pipelines, and production-grade cloud deployment for reliable scale.",
    image: rwaImage.src,
    imageClassName: "object-center scale-[1.18]",
    techStack: ["Node.js", "Web3.js", "MongoDB", "Redis", "AWS EC2", "AWS Route 53", "Nginx", "JWT", "PM2", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Blockchain",
    company: "Personal Project",
    duration: "2025"
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
  "Kubernetes": "bg-blue-100 text-blue-800",
  "NestJS": "bg-red-100 text-red-800",
  "Tailwind CSS": "bg-cyan-100 text-cyan-800",
  "AWS EC2": "bg-orange-100 text-orange-800",
  "Machine Learning": "bg-purple-100 text-purple-800",
  "Linear Regression": "bg-green-100 text-green-800",
  "Power BI": "bg-yellow-100 text-yellow-800",
  "NSE Data": "bg-indigo-100 text-indigo-800",
  "Django": "bg-green-100 text-green-800",
  "Ant Design": "bg-blue-100 text-blue-800",
  "Redux Toolkit": "bg-purple-100 text-purple-800",
  "Python Anywhere": "bg-teal-100 text-teal-800",
  "MySQL": "bg-blue-100 text-blue-800",
  "React.js": "bg-cyan-100 text-cyan-800",
  "Rust": "bg-orange-100 text-orange-800",
  "Anchor": "bg-purple-100 text-purple-800",
  "Solana web3.js": "bg-violet-100 text-violet-800",
  "Nest.js": "bg-red-100 text-red-800",
  "Solidity": "bg-slate-100 text-slate-800",
  "Web3.js": "bg-indigo-100 text-indigo-800",
  "Express.js": "bg-gray-100 text-gray-800",
  "Binance Smart Chain": "bg-yellow-100 text-yellow-800",
  "PancakeSwap": "bg-amber-100 text-amber-800",
  "Nginx": "bg-emerald-100 text-emerald-800",
  "PM2": "bg-lime-100 text-lime-800",
  "AWS Route 53": "bg-orange-100 text-orange-800",
  "JWT": "bg-zinc-100 text-zinc-800"
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
  const priorityOrder = [
    "DeFi Market MVP",
    "Volantix AMM Bot - Automated Market Maker Trading System",
    "RWA Tokenization",
  ]

  const orderedProjects = [...projects].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.title)
    const bIndex = priorityOrder.indexOf(b.title)
    const aPriority = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex
    const bPriority = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex
    return aPriority - bPriority
  })

  return (
    <section className="py-24 bg-background" id='projects'>
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
          {orderedProjects.map((project, index) => (
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
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${project.imageClassName || ""}`}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-headline mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="font-medium">{project.company}</span>
                    <span>•</span>
                    <span>{project.duration}</span>
                  </div>
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
                  {project.liveUrl !== "#" && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl !== "#" && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-105"
                    >
                      <IconBrandGithub className="w-4 h-4" />
                      Source Code
                    </Button>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
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
        </motion.div> */}
      </div>
    </section>
  )
}