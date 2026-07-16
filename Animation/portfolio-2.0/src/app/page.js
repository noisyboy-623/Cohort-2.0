"use client";

import InfiniteCarousel from "@/components/InfiniteCarousal";
import TextReveal from "@/components/TextReveal";
import { projects } from "@/data/projects";
import { useRef } from "react";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center w-full">
      <InfiniteCarousel projects={projects} />
    </main>
  );
}
