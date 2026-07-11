const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const restart = document.querySelector('.restart')
const reverse= document.querySelector('.reverse')
const seek= document.querySelector('.seek')

const tl = gsap.timeline({paused: true}) //keep the animation paused initially

tl.to(".box",{
  x:1200,
  duration: 1.3,
  ease: "power4.out"
}).to(".box2",{
  x:1200,
  duration: 1.3,
  ease: "power4.out"
}).to(".box3",{
  x:1200,
  duration: 1.3,
  ease: "power4.out"
}).to(".box4",{
  x:1200,
  duration: 1.3,
  ease: "power4.out"
}).to(".box5",{
  x:1200,
  duration: 1.3,
  ease: "power4.out"
})

play.addEventListener('click', () => {
  tl.play() //play animation
})
pause.addEventListener('click', () => {
  tl.pause() //pause animation
})
restart.addEventListener('click', () => {
  tl.restart() //restart animation
})
reverse.addEventListener('click', () => {
  tl.reverse() //reverse animation
})
seek.addEventListener('click', () => {
  tl.seek(2) //seek animation, we can also seek to an animtion by adding ".addLabel(label_name)" at any part of the timeline
})
// tl.timescale() for 2x, 3x speed etc
//nested timeline: We can create a function after breaking one large timeline into chunks of timelines then nest them together

