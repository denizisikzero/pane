"use client";

import * as React from "react";

const hearts = ["🫶", "❤️", "💖", "💗", "🩷"];

/** A small easter egg: each click swaps the heart for the next one. */
export function FooterHeart() {
  const [index, setIndex] = React.useState(0);

  return (
    <button
      type="button"
      onClick={() => setIndex((i) => (i + 1) % hearts.length)}
      aria-label="love"
      title="Click me"
      className="inline-block cursor-pointer rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {/* remounts on each change so the pop plays again */}
      <span
        key={index}
        aria-hidden="true"
        className="inline-block animate-in zoom-in-50 duration-200 motion-reduce:animate-none"
      >
        {hearts[index]}
      </span>
    </button>
  );
}
