import { gsap } from "gsap";
import './style.css'

gsap.to('.box2',{ //(g) animates from original to given values 
  x: 600,
  duration: 1,
  delay: 0.6,
})

gsap.set('.box', { //(r) instantly applies the given properties w/o any animation
  x: 200 
});

gsap.from('.box',{ //(r) animates from given to target
  x: 600,
  duration: 1,
  delay: 0.6,
})

gsap.fromTo('.box3',{ //(b) animates from given start values to given end values
  x: 0,
},{
duration: 1,
  delay: 0.6,
  x:400,
  y: 200
})

