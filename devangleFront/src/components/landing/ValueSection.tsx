// src/components/landing/ValueSection.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router-dom";

export function ValueSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-gradient-to-r from-primary/5 to-background/80">
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center gap-7">
        <h2 className="text-3xl font-bold mb-2">Why DevAngle?</h2>
        <p className="text-xl max-w-2xl text-muted-foreground">
          Unlimited free private and public posts. Native code blocks. Modern
          dark/light theming. Social login. Always improving.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Badge variant="outline" className="text-base">
            Next.js
          </Badge>
          <Badge variant="outline" className="text-base">
            Shadcn UI
          </Badge>
          <Badge variant="outline" className="text-base">
            Tailwind CSS
          </Badge>
          <Badge variant="outline" className="text-base">
            OpenAPI
          </Badge>
          <Badge variant="outline" className="text-base">
            OAuth
          </Badge>
        </div>
        <Button
          size="lg"
          className="mt-8 px-12 py-6 text-lg font-extrabold"
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
        >
          {isAuthenticated ? "Go to Dashboard" : "Get Started — Free"}
        </Button>
      </div>
    </section>
  );
}
