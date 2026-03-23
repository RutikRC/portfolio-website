"use client"

import { Monitor, Server, Cloud, Database, Code } from 'lucide-react'
import { motion } from 'motion/react'
import {
  IconBrandAws,
  IconBrandBinance,
  IconBrandDjango,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandRust,
  IconBrandSocketIo,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandUbuntu,
  IconCurrencyEthereum,
  IconCurrencySolana,
  IconAnchor,
  IconCodeCircle,
  IconBuildingSkyscraper,
  IconFlask,
  IconHierarchy2,
  IconGraph,
  IconPolygon,
  IconGitCommit,
  IconServer,
  IconShieldCheck,
} from '@tabler/icons-react'

const skillCategories = [
  {
    name: 'Frontend Development',
    description: 'Building modern, responsive user interfaces with cutting-edge frameworks and technologies.',
    icon: Monitor,
    skills: [
      { name: 'React', icon: IconBrandReact, gradient: 'from-blue-500/25 to-blue-500/5', text: 'text-blue-200' },
      { name: 'Next.js', icon: IconBrandNextjs, gradient: 'from-foreground/20 to-foreground/5', text: 'text-white' },
      { name: 'TypeScript', icon: IconBrandTypescript, gradient: 'from-blue-500/25 to-cyan-500/5', text: 'text-cyan-200' },
      { name: 'Tailwind CSS', icon: IconBrandTailwind, gradient: 'from-cyan-500/25 to-cyan-500/5', text: 'text-cyan-200' },
    ],
  },
  {
    name: 'Backend Development',
    description: 'Creating robust server-side applications and APIs with enterprise-grade backends.',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: IconBrandNodejs, gradient: 'from-green-500/25 to-emerald-500/5', text: 'text-emerald-200' },
      { name: 'NestJS', icon: IconBrandNodejs, gradient: 'from-green-500/25 to-emerald-500/5', text: 'text-emerald-200' },
      { name: 'Redis', icon: Database, gradient: 'from-red-500/25 to-red-500/5', text: 'text-red-200' },
      { name: 'Socket.io', icon: IconBrandSocketIo, gradient: 'from-zinc-500/25 to-zinc-500/5', text: 'text-zinc-200' },
      { name: 'Django REST', icon: IconBrandDjango, gradient: 'from-emerald-500/25 to-emerald-500/5', text: 'text-emerald-200' },
      { name: 'Express', icon: Code, gradient: 'from-amber-500/25 to-amber-500/5', text: 'text-amber-200' },
      { name: 'backend architecture', icon: IconBuildingSkyscraper, gradient: 'from-indigo-500/25 to-indigo-500/5', text: 'text-indigo-200' },
      { name: 'Research and development', icon: IconFlask, gradient: 'from-cyan-500/25 to-cyan-500/5', text: 'text-cyan-200' },
      { name: 'UML diagrams', icon: IconHierarchy2, gradient: 'from-violet-500/25 to-violet-500/5', text: 'text-violet-200' },
      { name: 'Flow diagrams', icon: IconGraph, gradient: 'from-teal-500/25 to-teal-500/5', text: 'text-teal-200' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    description: 'Deploying and scaling applications with modern cloud infrastructure and deployment strategies.',
    icon: Cloud,
    skills: [
      { name: 'Hostinger server', icon: IconServer, gradient: 'from-orange-500/25 to-orange-500/5', text: 'text-orange-200' },
      { name: 'Linux', icon: IconBrandUbuntu, gradient: 'from-emerald-500/25 to-emerald-500/5', text: 'text-emerald-200' },
      { name: 'CI/CD', icon: IconGitCommit, gradient: 'from-sky-500/25 to-sky-500/5', text: 'text-sky-200' },
      { name: 'AWS EC2', icon: IconBrandAws, gradient: 'from-orange-500/25 to-orange-500/5', text: 'text-orange-200' },
      { name: 'AWS Amplify', icon: IconBrandAws, gradient: 'from-orange-400/25 to-orange-400/5', text: 'text-orange-200' },
      { name: 'AWS S3', icon: IconBrandAws, gradient: 'from-orange-600/25 to-orange-600/5', text: 'text-orange-200' },
      { name: 'MongoDB Atlas', icon: IconBrandMongodb, gradient: 'from-lime-500/25 to-lime-500/5', text: 'text-lime-200' },
    ],
  },
  {
    name: 'Blockchain Development',
    description: 'Smart contract and Web3 development across modern chains.',
    icon: IconPolygon,
    skills: [
      { name: 'Solana', icon: IconCurrencySolana, gradient: 'from-indigo-500/25 to-indigo-500/5', text: 'text-indigo-200' },
      { name: 'Rust', icon: IconBrandRust, gradient: 'from-orange-500/25 to-orange-500/5', text: 'text-orange-200' },
      { name: 'Anchor Framework', icon: IconAnchor, gradient: 'from-purple-500/25 to-purple-500/5', text: 'text-purple-200' },
      { name: 'BSC', icon: IconBrandBinance, gradient: 'from-yellow-500/25 to-yellow-500/5', text: 'text-yellow-200' },
      { name: 'Ethereum', icon: IconCurrencyEthereum, gradient: 'from-sky-500/25 to-sky-500/5', text: 'text-sky-200' },
      { name: 'Polygon Network', icon: IconPolygon, gradient: 'from-fuchsia-500/25 to-fuchsia-500/5', text: 'text-fuchsia-200' },
      { name: 'Solidity smart contract', icon: IconCodeCircle, gradient: 'from-rose-500/25 to-rose-500/5', text: 'text-rose-200' },
      { name: 'Smart contract Auditing', icon: IconShieldCheck, gradient: 'from-emerald-500/25 to-emerald-500/5', text: 'text-emerald-200' },
      { name: 'Smart contract development', icon: IconCodeCircle, gradient: 'from-fuchsia-500/25 to-fuchsia-500/5', text: 'text-fuchsia-200' },
    ],
  },
]

export default function SkillsShowcase() {
  return (
    <div className="bg-background py-24 sm:py-25" id='skills'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl lg:mx-0"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            Technical Expertise
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            Full-stack proficiency across modern web technologies, cloud platforms, and development frameworks.
          </p>
        </motion.div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.name} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="flex flex-col"
              >
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary shadow-lg">
                    <category.icon aria-hidden="true" className="size-7 text-primary-foreground" />
                  </div>
                  {category.name}
                </dt>
                <dd className="mt-1 flex flex-col text-base/7 text-muted-foreground">
                  <p className="mb-6">{category.description}</p>
                  
                  <div className="grid w-full grid-cols-1 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                        whileHover={{ y: -2 }}
                        className="group w-full"
                      >
                        <div
                          className="flex min-w-0 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/0 backdrop-blur-sm px-3 py-2 transition-colors hover:border-primary/40"
                          title={skill.name}
                        >
                          <div
                            className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${skill.gradient} ring-1 ring-white/10`}
                          >
                            <skill.icon className={`size-5 ${skill.text}`} />
                          </div>
                          <span className="min-w-0 text-sm font-medium leading-tight text-foreground break-words">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}