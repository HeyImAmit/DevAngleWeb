// src/components/landing/BlogTemplatesSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Smartphone, Globe, Zap, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function BlogTemplatesSection() {
  const templates = [
    {
      name: "Minimalist",
      description: "Clean, focused design for content-first blogs",
      image: "bg-gradient-to-br from-gray-800 to-gray-900",
      category: "Popular"
    },
    {
      name: "Tech Blog",
      description: "Perfect for developers and tech enthusiasts",
      image: "bg-gradient-to-br from-blue-900 to-blue-800",
      category: "Featured"
    },
    {
      name: "Creative Portfolio",
      description: "Showcase your work with stunning visuals",
      image: "bg-gradient-to-br from-purple-900 to-purple-800",
      category: "New"
    }
  ];

  const features = [
    {
      icon: <Palette className="h-8 w-8 text-blue-400" />,
      title: "Beautiful Templates",
      description: "Choose from dozens of professionally designed templates"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-400" />,
      title: "Mobile Optimized",
      description: "Your blog looks perfect on every device"
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-400" />,
      title: "Custom Domain",
      description: "Use your own domain or get a free subdomain"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: "Lightning Fast",
      description: "Built for speed and performance"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "Community Features",
      description: "Comments, likes, and social sharing built-in"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime"
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-900 dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Templates Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Perfect Template
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start with a beautiful template and customize it to match your brand (currently not implemented)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(37,99,235,0.18)" }}
                className="transition-transform duration-300"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-800">
                  <div className={`h-48 ${template.image} relative border border-gray-700 dark:border-gray-800`}>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {template.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-700/80 dark:bg-gray-800/80 rounded-lg flex items-center justify-center mb-4">
                          <Palette className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-gray-300 text-sm">Template Preview</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {template.description}
                    </p>
                    <Button variant="outline" className="w-full border-gray-600 dark:border-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-800 mb-2">
                      Preview Template
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      Try this template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features that help you create, grow, and monetize your blog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="text-center p-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 