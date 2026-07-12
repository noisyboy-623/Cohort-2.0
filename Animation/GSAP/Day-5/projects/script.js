document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Flip);

  const img = document.querySelector(".specialImage");
  const img2 = document.querySelector(".specialImage2");

  img.addEventListener("click", () => {
    const state = Flip.getState("img");
    const state2 = Flip.getState("img2");

    document.querySelector(".imageGallery").appendChild(img2);
    document.querySelector(".imageShow").appendChild(img);

    Flip.from(state, {
      duration: 1.3,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
    });
    Flip.from(state2, {
      duration: 1.3,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
    });
  });
});
