"use client";
import { useState } from "react";

interface Props {
  children: string;
}

function TextExpander({ children }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 5).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary underline text-sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "see less" : "see more"}
      </button>
    </span>
  );
}

export default TextExpander;