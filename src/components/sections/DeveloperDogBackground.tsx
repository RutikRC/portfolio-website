"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer for performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && video.paused) {
          video.play().catch(() => {
            setHasError(true);
          });
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Video event handlers
    const handleLoadedData = () => {
      setIsLoaded(true);
      if (isIntersecting) {
        video.play().catch(() => {
          setHasError(true);
        });
      }
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, [isIntersecting]);

  // Fallback gradient background if video fails
  const fallbackBackground = (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-white opacity-40"
      style={{
        background: `linear-gradient(135deg, 
          rgba(139, 92, 246, 0.08) 0%, 
          rgba(96, 165, 250, 0.06) 35%, 
          rgba(248, 250, 252, 0.04) 70%, 
          rgba(139, 92, 246, 0.03) 100%)`
      }}
    />
  );

  if (hasError) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {fallbackBackground}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Element */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "blur(1.5px)",
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzhCNUNGNixzdG9wLW9wYWNpdHk6MC4wNSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjBBNUZBLHN0b3Atb3BhY2l0eTowLjAzIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9InVybCgjZ3JhZCkiLz4KPC9zdmc+"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <source
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/1eab43bd-00da-49a4-8b14-ee315cb86de6/generated_videos/cute-cartoon-developer-dog-character-wit-76011be4-20250713053429.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </motion.video>

      {/* Primary Overlay - Opacity Control */}
      <motion.div
        className="absolute inset-0 bg-white"
        style={{ 
          opacity: 0.75,
        }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: isLoaded ? 0.75 : 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Gradient Overlay - Design System Colors */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(139, 92, 246, 0.08) 0%, 
            rgba(96, 165, 250, 0.06) 25%, 
            rgba(248, 250, 252, 0.04) 50%, 
            rgba(139, 92, 246, 0.05) 75%, 
            rgba(96, 165, 250, 0.03) 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
      />

      {/* Subtle Dot Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 3, delay: 1, ease: "easeOut" }}
      />

      {/* Mobile-specific additional overlay */}
      <div className="absolute inset-0 bg-white/20 md:hidden" />

      {/* Loading state */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </motion.div>
      )}
    </div>
  );
};