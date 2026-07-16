import { useEffect, useRef } from "react";
import CarousalCard from "./CarousalCard";
import gsap from "@/libs/gsap";

const CARD_W = 200;
const CARD_H = 320;
const SCALE = 1.05;
const CARD_GAP = 27;

const DURATION = 25;

const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      ease: "none",
      duration: DURATION,
      repeat: -1,
    });

    return () => tweenRef.current?.kill();
  }, [projects]);

  const doubled = [...projects, ...projects];

  return (
    <div
      style={{
        padding: `4rem 0`,
      }}
      className="overflow-hidden w-full flex justify-center"
    >
      <div
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
        className="track flex items-center "
      >
        {doubled.map((project, i) => (
          <CarousalCard
            key={i}
            project={project}
            onHoverStart={() => tweenRef.current?.pause()}
            onHoverEnd={() => tweenRef.current?.play()}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;