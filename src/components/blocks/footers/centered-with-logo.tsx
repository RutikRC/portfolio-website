import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-200 px-8 py-12 bg-[#F8FAFC] w-full relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Subtitle */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#8B5CF6] mb-2 font-[var(--font-display)]">
            JUNIOR BLOCKCHAIN DEVELOPER
          </h2>
          <p className="text-sm text-gray-600 font-[var(--font-body)]">
            Crafted with ♡ by Rutik Chavan
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <Link 
            href="https://github.com/RutikRC"
            className="text-gray-500 hover:text-[#8B5CF6] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link 
            href="https://www.linkedin.com/in/rutik-chavan/"
            className="text-gray-500 hover:text-[#8B5CF6] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link 
            href="mailto:chavanrutik133@gmail.com"
            className="text-gray-500 hover:text-[#8B5CF6] transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 font-[var(--font-body)]">
          © {currentYear} Rutik Chavan. All rights reserved.
        </p>
      </div>
    </div>
  );
}