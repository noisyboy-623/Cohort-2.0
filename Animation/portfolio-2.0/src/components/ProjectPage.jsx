"use client";
import { useRef } from "react";
import TextReveal from "./TextReveal";
import gsap, { ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";

const ProjectPage = ({ project, nextProject }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray("section");

      gsap.to(imageRef.current, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.7,
      });

      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });

        // Fade out the pinned section as the next one comes up
        // so it doesn't peek through the padding gaps of the next section!
        gsap.to(section, {
          opacity: 0,
          scrollTrigger: {
            trigger: sections[idx + 1],
            start: "top 1%",
            end: "top 0.5%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [project] },
  );

  const { navigateTo } = useViewTransition();

  const handleClick = () => {
    navigateTo(`/project/${nextProject.slug}`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[6vh] bg-white z-20"></div>
      <main ref={containerRef} >
        <section className="h-screen w-full relative">
          <div className="sectionContainer h-full w-full flex pt-[8rem] pb-[4rem] px-[3rem] items-end">
            <div className="firstSegment h-full w-[10%] ">
              <TextReveal>
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-full w-[30%] flex flex-col justify-end">
              <div className="imageDiv overflow-hidden h-full w-full ">
                <img
                  ref={imageRef}
                  style={{
                    clipPath: "inset(100% 0 0 0)",
                  }}
                  className="h-full scale-[1.3] w-full object-cover"
                  src={project.coverImage}
                  alt=""
                />
              </div>
            </div>
            <div className="thirdSegment pl-[6rem] h-full w-[60%] flex flex-col justify-end pb-2">
              <div className="heading">
                <TextReveal delay="0.8" ease="power4.out" splitBy="chars">
                  <h1 className="text-[4rem] leading-[1.1] font-light ">
                    {project.title}
                  </h1>
                </TextReveal>
              </div>
              <div className="subHeading flex gap-[1rem]">
                <TextReveal delay="0.85" splitBy="words">
                  <h1 className="text-[2rem]">{project.subtitle}</h1>
                </TextReveal>
                <TextReveal delay="0.85" splitBy="words">
                  <h1 className="text-[2rem] font-thin"> | </h1>
                </TextReveal>
                <TextReveal delay="0.85" splitBy="chars">
                  <h1 className="text-[2rem]">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="description mt-[1rem] w-[90%] text-balance">
                <TextReveal delay="0.85" splitBy="lines">
                  <p className="text-[1.5rem] leading-[1.2] font-light ">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((elem, idx) => {
          return (
            
            <section key={idx} className="h-screen w-full flex items-center justify-center p-12 relative">
              <div
                style={{ transformOrigin: "bottom left" }}
                className="sectionContainer rotate-[30deg] h-full w-full rounded-2xl overflow-hidden"
              >
                <img className="h-full w-full object-cover" src={elem} alt="" />
              </div>
            </section>
          );
        })}

        <footer className="h-screen flex flex-col items-center justify-center gap-[1rem] w-full bg-white relative">
          <h1 className="text-[2rem]">Next Project</h1>
          <h1 className="text-[4rem] cursor-pointer hover:opacity-70 transition-opacity" onClick={handleClick}>{nextProject.title}</h1>
        </footer>
      </main>
    </>
  );
};

export default ProjectPage;