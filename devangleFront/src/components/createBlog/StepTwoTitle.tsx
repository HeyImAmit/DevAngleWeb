// components/StepTwoTitle.tsx
import { Input } from "@/components/ui/input";

const StepTwoTitle = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (val: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <p>Enter your blog title:</p>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Mastering React Hooks"
      />
    </div>
  );
};

export default StepTwoTitle;
