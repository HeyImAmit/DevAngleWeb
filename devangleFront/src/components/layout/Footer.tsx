// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-background border-t py-8 mt-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 mx-auto text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} DevAngle — Crafted by developers, for
          developers.
        </div>
        <div className="flex gap-4">
          <a className="hover:underline" href="/privacy">
            Privacy Policy
          </a>
          <a className="hover:underline" href="/terms">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
