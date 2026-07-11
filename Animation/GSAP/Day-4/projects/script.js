document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".imageDiv", {
    scale: 0.3,
  });

  gsap.set(".sand", {
    left: "-800px",
    opacity: 0
  });

  gsap.set(".sea", {
    right: "-800px",
    opacity: 0
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      start: "top top",
      end: "top -100%",
      scrub: true,
      pin: true,
    },
  });

  tl.to(".imageDiv", {
    scale: 1,
    ease: "power4.out",
  })
    .to(
      ".sand",
      {
        left: "600px",
        opacity: 100
      },
      "<",
    )
    .to(
      ".sea",
      {
        right: "600px",
        opacity: 100

      },
      "<",
    )
    .from(
      ".content .and",
      {
        yPercent: 10,
        duration: 0.75,
        ease: "expo.out",
        opacity: 0,
      },
      ">",
    );
});
