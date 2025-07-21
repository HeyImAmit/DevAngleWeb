// src/components/landing/TestimonialsSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Blogger",
      avatar: "SC",
      content: "I started my tech blog with DevAngle and grew to 50K monthly readers in just 6 months. The platform is incredibly intuitive and the community features are amazing.",
      rating: 5,
      blog: "TechWithSarah.com"
    },
    {
      name: "Marcus Rodriguez",
      role: "Developer Advocate",
      avatar: "MR",
      content: "The best blogging platform I've ever used. Clean templates, fast performance, and the developer-friendly features make it perfect for technical content.",
      rating: 5,
      blog: "DevInsights.blog"
    },
    {
      name: "Emma Thompson",
      role: "Freelance Writer",
      avatar: "ET",
      content: "Switched from WordPress to DevAngle and never looked back. The writing experience is so smooth, and my readers love the clean design.",
      rating: 5,
      blog: "EmmaWrites.dev"
    }
  ];

  const [index, setIndex] = useState(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="w-full py-20 bg-gray-900 dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loved by Bloggers Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of successful bloggers who've built their audience with DevAngle
          </p>
        </div>

        {/* Carousel for mobile, grid for desktop */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="relative bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[index].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </motion.span>
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-400 mb-4" />
                  <p className="text-gray-300 dark:text-gray-200 mb-6 leading-relaxed">
                    "{testimonials[index].content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonials[index].avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonials[index].name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonials[index].role}
                      </p>
                      <p className="text-sm text-blue-400 font-medium">
                        {testimonials[index].blog}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-900 text-white flex items-center justify-center disabled:opacity-40"
                  onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                  disabled={index === 0}
                  aria-label="Previous testimonial"
                >
                  &#8592;
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-900 text-white flex items-center justify-center disabled:opacity-40"
                  onClick={() => setIndex((index + 1) % testimonials.length)}
                  disabled={index === testimonials.length - 1}
                  aria-label="Next testimonial"
                >
                  &#8594;
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="relative bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-800">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </motion.span>
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-gray-300 dark:text-gray-200 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-blue-400 font-medium">
                      {testimonial.blog}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm">Active Bloggers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-sm">Blog Posts Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
          <div className="mt-8">
            <a href="#" className="text-blue-400 hover:underline text-base font-medium">See more stories &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
