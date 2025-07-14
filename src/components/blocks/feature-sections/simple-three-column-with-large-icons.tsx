"use client"

import { useState, useEffect } from 'react'
import { Monitor, Server, Cloud, Database, Settings, Globe, Cpu, Code, Layers } from 'lucide-react'
import { motion } from 'motion/react'

const skillCategories = [
  {
    name: 'Frontend Development',
    description: 'Building modern, responsive user interfaces with cutting-edge frameworks and technologies.',
    icon: Monitor,
    skills: [
      { name: 'React', proficiency: 95, color: 'bg-blue-500', glowColor: 'shadow-blue-500/50' },
      { name: 'Next.js', proficiency: 90, color: 'bg-gray-800', glowColor: 'shadow-gray-800/50' },
      { name: 'TypeScript', proficiency: 88, color: 'bg-blue-600', glowColor: 'shadow-blue-600/50' },
      { name: 'Tailwind CSS', proficiency: 92, color: 'bg-cyan-500', glowColor: 'shadow-cyan-500/50' },
    ],
  },
  {
    name: 'Backend Development',
    description: 'Creating robust server-side applications and APIs with enterprise-grade backends.',
    icon: Server,
    skills: [
      { name: 'Node.js', proficiency: 85, color: 'bg-green-600', glowColor: 'shadow-green-600/50' },
      { name: 'NestJS', proficiency: 80, color: 'bg-red-600', glowColor: 'shadow-red-600/50' },
      { name: 'Django REST', proficiency: 82, color: 'bg-emerald-600', glowColor: 'shadow-emerald-600/50' },
      { name: 'Express', proficiency: 88, color: 'bg-yellow-500', glowColor: 'shadow-yellow-500/50' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    description: 'Deploying and scaling applications with modern cloud infrastructure and deployment strategies.',
    icon: Cloud,
    skills: [
      { name: 'AWS EC2', proficiency: 75, color: 'bg-orange-500', glowColor: 'shadow-orange-500/50' },
      { name: 'AWS Amplify', proficiency: 78, color: 'bg-orange-400', glowColor: 'shadow-orange-400/50' },
      { name: 'AWS S3', proficiency: 85, color: 'bg-orange-600', glowColor: 'shadow-orange-600/50' },
      { name: 'MongoDB Atlas', proficiency: 80, color: 'bg-green-500', glowColor: 'shadow-green-500/50' },
    ],
  },
]

export default function SkillsShowcase() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div className="bg-background py-24 sm:py-25">
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
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
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
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-muted-foreground">
                  <p className="flex-auto mb-6">{category.description}</p>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 
                        }}
                        onMouseEnter={() => setHoveredSkill(`${category.name}-${skill.name}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {skill.proficiency}%
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ 
                                duration: 1, 
                                delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                                ease: "easeOut"
                              }}
                              className={`h-full ${skill.color} transition-all duration-300 ${
                                hoveredSkill === `${category.name}-${skill.name}` 
                                  ? `shadow-lg ${skill.glowColor}` 
                                  : ''
                              }`}
                            />
                          </div>
                          
                          {hoveredSkill === `${category.name}-${skill.name}` && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`absolute -top-8 left-0 px-2 py-1 text-xs bg-foreground text-background rounded shadow-lg`}
                            >
                              {skill.proficiency}% proficiency
                            </motion.div>
                          )}
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