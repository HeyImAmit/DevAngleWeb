import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface StepThreeContentProps {
  content: string;
  setContent: (val: string) => void;
  title: string;
  username: string;
  tags: string[];
}

const StepThreeContent = ({
  content,
  setContent,
  title,
  username,
  tags,
}: StepThreeContentProps) => {
  return (
    <div className="flex flex-col h-[70vh] max-h-[70vh] gap-6">
      {/* Live preview */}
      <div className="flex flex-col space-y-2 p-4 border rounded-md bg-muted overflow-auto max-h-48">
        <h3 className="text-xl font-bold">{title || "Blog Title"}</h3>
        <p className="text-sm text-muted-foreground">
          By {username || "Author"}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.length ? (
            tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground italic">No tags selected</p>
          )}
        </div>
      </div>

      {/* Textarea */}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something amazing..."
        className="flex-grow resize-none"
        rows={10} // base height, but flex-grow expands it
      />
    </div>
  );
};

export default StepThreeContent;
