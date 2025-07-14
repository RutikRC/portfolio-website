"use client"

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";

interface TimelineItem {
  id: string;
  type: "education" | "work";
  date: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  achievements: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "education",
    date: "2022 - 2024",
    title: "Master of Computer Application",
    organization: "Zeal Institute of Computer Application, Business Administration and Research",
    location: "Pune, India",
    description: "Specializing in Blockchain and Full Stack Development with focus on machine learning applications.",
    achievements: [
      "Achievements: Awarded A Grade Certificate in Data Analytics",
      "CGPA: 7.63/10"
    ]
  },
  {
    id: "2",
    type: "work",
    date: "Dec 2023 - Mar 2024",
    title: "Web Developer",
    organization: "Karmacts Systems Pvt. Ltd.",
    location: "Pune, India",
    description: "Developed scalable web applications and contributed to core platform infrastructure.",
    achievements: [
      "Built real-time analytics dashboard serving 100+ daily users",
      "Optimized backend APIs reducing response time by 40%",
      "Collaborated with cross-functional teams on user experience improvements"
    ]
  },
  {
    id: "3",
    type: "work",
    date: "Apr 2024 - Sept 2024",
    title: "Trainee Software Developer",
    organization: "Karmacts Systems Pvt. Ltd.",
    location: "Pune, India",
    description: "Delivered custom web applications for startups and small businesses across various industries.",
    achievements: [
      "Completed 10+ projects using React, Node.js, and cloud technologies",
      "Maintained 98% client satisfaction rate with on-time delivery",
      "Generated 100K+ revenue through referrals and repeat clients"
    ]
  },
  {
    id: "4",
    type: "work",
    date: "Oct 2024 - Mar 2025",
    title: "Junior Software Developer",
    organization: "Karmacts Systems Pvt. Ltd.",
    location: "Pune, India",
    description: "Comprehensive computer science education with emphasis on software engineering and systems design.",
    achievements: [
      "Led 5+ projects using React, Node.js, and cloud technologies",
      "Mentored 5+ trainee developers on React, Node.js, and cloud technologies",
      "Developed 10+ projects using React, Node.js, and cloud technologies",
      "Maintained 98% client satisfaction rate with on-time delivery",
      "Worked on 10+ projects using React, Node.js, and cloud technologies"
    ]
  },
  {
    id: "5",
    type: "work",
    date: "Apr 2025 - Present",
    title: "Junior Blockchain Developer",
    organization: "Blocsys Technologies Pvt. Ltd.",
    location: "Pune, India",
    description: "Developing and maintaining as a single contributor blockchain-based applications and solutions.",
    achievements: [
      "Developed Real World Assets (RWA) platform for tokenization of physical assets using blockchain technology.",
      "Integrated MoonPay Fiat-to-Crypto Payment Gateway and Thirdweb wallet connectivity to support RWA transactions.",
      "Conducted R&D for new features and integrations in a Liquidity Pool Bot, handling frontend, backend, and bot services.",
      "Built a Liquidity Pool Bot that manages liquidity, executes trades based on target price and volume of token pairs on PancakeSwap.",
      "Deployed ERC-20 Tokens on both Ethereum and Binance Smart Chain (BSC) networks using Solidity.",
      "Created a server health monitoring system using Vite, providing real-time server status and performance metrics."
    ]
  }
];

const TimelineDot = ({ item, index }: { item: TimelineItem; index: number }) => {
  const Icon = item.type === "education" ? GraduationCap : Briefcase;
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg border-4 border-background group cursor-pointer"
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="h-5 w-5 text-primary-foreground" />
      <div className="absolute inset-0 rounded-full bg-primary opacity-20 scale-0 group-hover:scale-150 transition-transform duration-300" />
    </motion.div>
  );
};

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
      className={`relative bg-card rounded-lg shadow-md border border-border p-4 md:p-6 max-w-md md:max-w-md ${
        isEven ? "mr-auto" : "ml-auto"
      } hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calendar className="h-4 w-4" />
        <span className="font-medium">{item.date}</span>
        <MapPin className="h-4 w-4 ml-2" />
        <span>{item.location}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {item.title}
      </h3>
      
      <p className="text-secondary font-medium mb-3">
        {item.organization}
      </p>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {item.description}
      </p>
      
      <div className="space-y-2">
        {item.achievements.map((achievement, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {achievement}
            </p>
          </div>
        ))}
      </div>
      
      <div
        className={`absolute top-6 hidden md:block ${
          isEven ? "-right-3" : "-left-3"
        } w-0 h-0 border-t-8 border-b-8 border-transparent ${
          isEven ? "border-l-8 border-l-card" : "border-r-8 border-r-card"
        }`}
      />
    </motion.div>
  );
};

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional experience and educational background,
            showcasing key achievements and continuous learning.
          </p>
        </motion.div>
        
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Animated Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-border h-full hidden md:block">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Mobile Timeline Line */}
          <div className="absolute left-6 w-0.5 bg-border h-full md:hidden">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative flex items-start md:items-center">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                  <TimelineDot item={item} index={index} />
                </div>
                
                {/* Mobile Timeline Dot */}
                <div className="absolute left-6 transform -translate-x-1/2 z-10 md:hidden">
                  <TimelineDot item={item} index={index} />
                </div>
                
                {/* Timeline Card - Desktop */}
                <div className={`w-1/2 hidden md:block ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  {index % 2 === 0 ? (
                    <TimelineCard item={item} index={index} />
                  ) : (
                    <div />
                  )}
                </div>
                
                <div className={`w-1/2 hidden md:block ${index % 2 === 1 ? "pl-8" : "pr-8"}`}>
                  {index % 2 === 1 ? (
                    <TimelineCard item={item} index={index} />
                  ) : (
                    <div />
                  )}
                </div>
                
                {/* Timeline Card - Mobile */}
                <div className="w-full pl-16 md:hidden">
                  <TimelineCard item={item} index={index} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Current Status Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: timelineData.length * 0.2 + 0.5, duration: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-10 hidden md:block"
          >
            <div className="relative">
              <div className="h-12 w-12 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-primary-foreground rounded-full animate-pulse" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-medium text-primary">Present</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}