import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { Badge } from "@/components/ui/badge";

const allTags = [
  "React",
  "JavaScript",
  "Spring",
  "DevOps",
  "UI/UX",
  "Databases",
  "AI",
  "Security",
  "Java",
  "SpringBoot",
  "CI/CD",
];

interface StepOneTagsProps {
  tags: string[];
  setTags: (val: string[]) => void;
}

const StepOneTags = ({ tags, setTags }: StepOneTagsProps) => {
  const [inputValue, setInputValue] = useState("");

  const toggleTag = (tag: string) => {
    setTags(
      tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Prevent spaces being typed in input
    if (e.target.value.includes(" ")) return;
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // Prevent duplicates
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">
        Select or add tags for your blog (no spaces allowed):
      </p>

      <div className="flex flex-wrap gap-3">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={tags.includes(tag) ? "default" : "outline"}
            onClick={() => toggleTag(tag)}
            className="cursor-pointer select-none"
          >
            {tag}
          </Badge>
        ))}

        {tags
          .filter((tag) => !allTags.includes(tag))
          .map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="cursor-pointer select-none"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
      </div>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Add custom tag and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="
            border border-border
            rounded-lg
            px-4 py-2
            w-full max-w-md
            focus:outline-none
            focus:ring-2 focus:ring-primary
            transition
            text-center
          "
        />
      </div>
    </div>
  );
};

export default StepOneTags;
