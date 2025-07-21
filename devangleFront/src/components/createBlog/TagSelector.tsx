import React, { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TAGS = [
  "Web",
  "Tech",
  "AI",
  "React",
  "Travel",
  "Design",
  "Tutorial",
  "Personal",
  "Photography",
  "Cooking",
  "Finance",
  "Health",
  "Education",
  "Startup",
  "Productivity",
  "Gaming",
  "Books",
  "Music",
  "Self Improvement",
];

export default function TagSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [customTag, setCustomTag] = useState("");

  function handleAddTag(tag: string) {
    if (!tag || selected.includes(tag)) return;
    onChange([...selected, tag]);
    setCustomTag("");
  }

  function handleRemoveTag(tag: string) {
    onChange(selected.filter((t) => t !== tag));
  }

  function handleCustomTagInput(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomTag(e.target.value);
  }

  function maybeAddCustomTag(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && customTag.trim()) {
      handleAddTag(customTag.trim());
      e.preventDefault();
    }
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <Button
            key={tag}
            type="button"
            variant={selected.includes(tag) ? "default" : "outline"}
            onClick={() => handleAddTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Add your own tag"
          value={customTag}
          onChange={handleCustomTagInput}
          onKeyDown={maybeAddCustomTag}
          className="w-40"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (customTag.trim()) handleAddTag(customTag.trim());
          }}
        >
          Add
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap mt-3">
        {selected.map((tag) => (
          <Button
            type="button"
            key={tag}
            size="sm"
            variant="destructive"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} ✕
          </Button>
        ))}
      </div>
    </div>
  );
}
