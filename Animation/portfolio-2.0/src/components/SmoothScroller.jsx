"use client"
import useLenis from "@/hooks/useLenis";
import React from "react";

const SmoothScroller = ({ children }) => {
  useLenis();
  return <>{children}</>;
};

export default SmoothScroller;
