//Stagger: Is used to animate each element with the same name with a certain amount of delay

// gsap.to(".box", {
//   x: 1200,
//   duration: 1.3,
//   ease: "power4.out",
//   delay: 0.6,
//   stagger: 0.08, //plays animation in order
// //   stagger: -0.08 plays animation in order
// });

gsap.to(".box", {
  x: 1200,
  duration: 1.3,
  ease: "power4.out",
  delay: 0.6,
  stagger: {
    each: 0.08,
    from: 'center' // we can choose from which element we need to start the animation from
  }
});
