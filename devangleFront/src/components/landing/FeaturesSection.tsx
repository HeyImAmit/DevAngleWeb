// src/components/landing/FeaturesSection.tsx
import { BookOpen, LayoutDashboard, Users2 } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="text-primary" size={34} />}
            title="Blog Publishing"
            description="Share guides, tutorials, and tech news. Syntax highlighting and MDX supported."
          />
          <FeatureCard
            icon={<LayoutDashboard className="text-primary" size={34} />}
            title="Team Dashboards"
            description="Collaborate in real-time, manage projects with advanced controls."
          />
          <FeatureCard
            icon={<Users2 className="text-primary" size={34} />}
            title="Community Focus"
            description="Connect with developers, comment, like, and discover great posts."
          />
        </div>
      </div>
    </section>
  );
}
