import gsap from "gsap";
import "./style.css";

// Day-2 - Easing, callback function

gsap.to(".box", {
  x: 800,
  duration: 1.5,
  delay: 0.6,
  ease: "power2.inOut", // easing (family.type(in, out, inOut))
  repeat: 3, // number of times to repeat (it repeats for: "repeat" + 1 (original animation once) times)
            // repeat: -1, repeat animation infinitely (loop)
  yoyo: true, // Back and forth motion
});

//Callback functions

// onStart = () => {} --> Runs when animation starts
// onComplete = () => {} --> Runs when animation ends
// onUpdate = () => {} --> Runs for each frame of the animation