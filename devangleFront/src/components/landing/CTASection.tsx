// src/components/landing/CTASection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { motion } from "framer-motion";

export function CTASection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const benefits = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime",
    "24/7 support"
  ];

  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Animated glassy background */}
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
      <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Blog?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of bloggers who've already built their audience with DevAngle. 
            Start your free trial today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
            >
              {isAuthenticated ? "Go to Dashboard" : "Start Your Free Trial"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-2 border-gray-600 text-white hover:bg-gray-800 hover:text-white rounded-lg"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll to top button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
} 