// src/components/landing/FeatureCard.tsx
import type { ReactNode } from "react";

export function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-muted/40">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-center">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  );
}
