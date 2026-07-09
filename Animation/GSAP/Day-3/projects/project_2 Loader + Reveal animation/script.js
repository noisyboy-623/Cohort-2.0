let count = 0;
const loaderCount = document.querySelector(".loader-count h1");

const interval = setInterval(() => {
  count++;
  loaderCount.innerHTML = `${count}%`;
  if (count === 100) {
    clearInterval(interval);
    landingAnimation()
  }
}, 25);

function landingAnimation() {
    const tl = gsap.timeline();

    tl.to(".loader-count", {
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    }).to(".loader",{
        yPercent: -100,
        duration: 1.7,
        ease: "expo.out"
    }, "-=0.9").from(".background img",{
        scale: 1.2,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1.1").from(".heading h1", {
        yPercent: 100,
        duration: 1.4,
        ease: "expo.out"
    }, "-=0.8").from(".subheading h2", {
        yPercent: 100,
        duration: 1.4,
        ease: "expo.out"
    }, "-=0.77")
}