// src/components/landing/PricingSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

export function PricingSection() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Personal",
      price: billing === 'monthly' ? "Free" : "Free",
      period: billing === 'monthly' ? "/month" : "/year",
      description: "Perfect for getting started",
      features: [
        "1 blog",
        "Basic templates",
        "Community features",
        "Mobile responsive",
        "Basic analytics"
      ],
      popular: false,
      cta: "Start Free",
      color: "border-gray-700"
    },
    {
      name: "Pro",
      price: billing === 'monthly' ? "$9" : "$90",
      period: billing === 'monthly' ? "/month" : "/year",
      description: "For serious bloggers",
      features: [
        "Unlimited blogs",
        "Premium templates",
        "Custom domain",
        "Advanced analytics",
        "Priority support",
        "Monetization tools",
        "SEO optimization"
      ],
      popular: true,
      cta: "Start Free Trial",
      color: "border-blue-500"
    },
    {
      name: "Business",
      price: billing === 'monthly' ? "$19" : "$190",
      period: billing === 'monthly' ? "/month" : "/year",
      description: "For growing businesses",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced security",
        "API access",
        "White-label options",
        "Dedicated support",
        "Custom integrations"
      ],
      popular: false,
      cta: "Start Free Trial",
      color: "border-gray-700"
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-800 dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-gray-900/70 dark:bg-gray-800/70 p-1 border border-gray-700 dark:border-gray-800">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${billing === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${billing === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setBilling('yearly')}
            >
              Yearly <span className="ml-1 text-xs text-green-400">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(37,99,235,0.18)" }}
              className={`relative rounded-2xl p-8 border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'} bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl transition-all`}
              style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
            >
              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse shadow-lg">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 text-lg ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 text-white'
                }`}
                onClick={() => navigate("/signup")}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <span>&#10003; Cancel anytime</span>
            <span>&#10003; No setup fees</span>
            <span>&#10003; 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
} 