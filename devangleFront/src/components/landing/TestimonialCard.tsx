// src/components/landing/TestimonialCard.tsx
export function TestimonialCard({
  name,
  role,
  quote,
  avatarUrl,
}: {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}) {
  return (
    <div className="flex flex-col items-center text-center bg-background rounded-xl p-6 shadow">
      <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full mb-4" />
      <blockquote className="italic mb-3 text-muted-foreground">
        "{quote}"
      </blockquote>
      <div className="font-semibold">{name}</div>
      <div className="text-xs text-muted-foreground">{role}</div>
    </div>
  );
}
