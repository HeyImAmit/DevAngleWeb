import { useEffect, useState } from "react";
import FancyLoader from "@/components/FancyLoader";

export default function RouteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FancyLoader show />;
  }
  return <>{children}</>;
} 