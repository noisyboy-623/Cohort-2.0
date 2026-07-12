document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const split = new SplitText(".title h1", {
    type: "chars, words, lines", //chars: split per char, words: split per word, lines: split per line
    charsClass: "titleChars" //giving custom class names from gsap, we can also use this to add css
  });

  const splitP = new SplitText(".title p", {
    type: "chars, words, lines", 
    linesClass: "paraLine"
  });

  const tl = gsap.timeline()

  tl
    .from(split.chars, {
      yPercent: 30,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: {
        each: 0.09,
        from: "edges",
      },
    })
    .from(splitP.words, {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: {
        each: 0.09,
        from: "center",
      },
    }, "<",);
});

//Draggable Plugin: Used to drag elements from one place to another => Draggable.create(".box"), this makes the box draggable
//We can also set its bounds =>
  // Draggable.create(".box", {
  //   bounds: "#app" this sets the bounds of the box to that of the app div
  // })

  //  Draggable.create(".box", {
  //   bounds:{
  //     minX: ,
  //     maxX: ,
  //     minY: ,
  //     maxY: 
  //     this helps us to give custom bound values
  //   }
  // })

  // Draggable.create(".box",{
  //   bounds: "#app",
  //   type: "x" locks the element for movement in x-axis only
  //   type: "y" locks the element for movement in y-axis only
  //   edgeResistance: 1 resists going into edges strongly(1), weakly(0)
  // })

// Inertia Plugin: works with the draggable plugin, is mainly used for a kind of sliding animation 

  // Draggable.create(".box",{
  //   bounds: "#app",
  //   type: "x",
  //   inertia: true,
  //   dragResistance: 1 resists dragging strongly(1), weakly(0)
  // })
//Flip Plugin: F: first, L: last, I: invert, P: play, Implementation in project
