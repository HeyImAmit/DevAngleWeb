// src/components/landing/HeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { PenTool, Sparkles, ArrowRight, Play, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { motion } from "framer-motion";

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-400/10 blur-3xl opacity-60"
        />
      </motion.div>
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Main Heading */}
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
            Create a blog that
            <span className="text-blue-400"> stands out</span>
          </h1>
          <p className="max-w-2xl text-xl text-gray-300 mt-6 mx-auto">
            Build a beautiful blog that grows with you. Try for free, then upgrade your plan as you grow.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            size="lg"
            className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
          >
            Start Your Blog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg border-2 border-gray-600 hover:border-gray-500 text-white rounded-lg"
            onClick={() => navigate("/login")}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mt-12 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <PenTool className="h-4 w-4 text-blue-400" />
            <span>Free 14-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-medium">&#10003;</span>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Animated Blog Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 w-full max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(37,99,235,0.18)" }}
            className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700 flex flex-col items-center"
          >
            <div className="w-full max-w-xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 items-start text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-base">Amit Prasad Lal</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">July 2025</div>
                </div>
              </div>
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">How to Build a Modern Blog in 2025</div>
              <div className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">Discover the latest tools and techniques for building a beautiful, fast, and scalable blog using modern web technologies.</div>
              <div className="flex gap-2 mt-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs">#webdev</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded-full text-xs">#blogging</span>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <ChevronDown className="h-8 w-8 text-blue-400 animate-bounce" />
                <span className="text-xs text-blue-400 mt-1">Scroll down</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
