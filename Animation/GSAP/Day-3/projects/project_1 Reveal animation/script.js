gsap.from('h1 span', {
    yPercent: 100,
    duration: 1.5,
    ease: 'expo.out',
    opacity: 0,
    stagger: {
        each: 0.08,
        from: 'edges'
    }
})