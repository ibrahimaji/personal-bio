import Typed from 'typed.js';
import Lenis from '@studio-freight/lenis';
import { Application } from '@splinetool/runtime';

//spline usage
const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app
  .load("https://prod.spline.design/ANywe8quojo7u-Zp/scene.splinecode")
  .then(() => {
    const childObject = app.findObjectByName("child");

    gsap.set(childObject.scale, { x: 1, y: 1, z: 1 });
    gsap.set(childObject.position, { x: 320, y: 0 });

    let rotatechildObject = gsap.to(childObject.rotation, {
      y: Math.PI * 2 + childObject.rotation.y,
      x: 0,
      z: 0,
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    let rotationProgress = 0;
    let interval;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part1",
          start: "top 60%",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            rotationProgress = rotatechildObject.progress();

            interval = setInterval(() => {
              app.emitEvent("keyDown", "childObject");
            }, 1500);

            rotatechildObject.pause();
            gsap.to(childObject.rotation, {
              y: Math.PI / 12,
              duration: 1
            });
          },
          onLeaveBack: () => {
            const newProgress = childObject.rotation.y / (Math.PI * 2);
            rotatechildObject.progress(newProgress).resume();
            clearInterval(interval);
          }
        }
      })
      .to(childObject.rotation, { x: -Math.PI / 14, z: Math.PI / 36 }, 0)
      .to(childObject.position, { x: -500, y: -200 }, 0)
      .to(childObject.scale, { x: 2, y: 2, z: 2 }, 0);

    gsap
      .timeline({
        onComplete: () => {
          clearInterval(interval);
          app.emitEvent("mouseDown", "childObject");
        },
        scrollTrigger: {
          trigger: "#part2",
          start: "top bottom",
          end: "center bottom",
          scrub: true
        }
      })
      .to(childObject.rotation, { x: Math.PI / 36, y: -Math.PI / 10 }, 0)
      .to(childObject.position, { x: 350, y: 50 }, 0)
      .to(childObject.scale, { x: 0.8, y: 0.8, z: 0.8 }, 0);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#part3",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
      .to(childObject.position, { x: -500, y: 200 }, 0);
  });

//animate text on content
new Typed('#content1', {
    strings:["Civil Servant","Software Engineer",""],
    typeSpeed:60,
    backSpeed:30,
    loop:true,
    showCursor:false
  });

  new Typed('#content2', {
    strings:["Web Dev","UI/UX","3D Design"],
    typeSpeed:60,
    backSpeed:30,
    loop:true,
    showCursor:false
  });

//childObject text effect
const keys = document.querySelectorAll(".key");

function pressRandomKey() {
  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  randomKey.style.animation = "pressDown 0.2s ease-in-out";

  randomKey.onanimationend = () => {
    randomKey.style.animation = "";
    setTimeout(pressRandomKey, 100 + Math.random() * 300);
  };
}

pressRandomKey();

// gsap animation on content container
let tl1=gsap.timeline({
    scrollTrigger:{
        trigger: '.el-1',
        start: '30% center',
        end: 'bottom center',
        scrub: false,
        // markers: true,
        toggleActions:'play reverse play reverse'
    }
});
tl1.to('.el-1',{
    x:1000
});

let tl2=gsap.timeline({
    scrollTrigger:{
        trigger: '.el-2',
        start: 'top center',
        end: 'bottom center',
        scrub: false,
        // markers: true,
        toggleActions:'play reverse play reverse'
    }
})
tl2.to('.el-2',{
    x:-1000
})

let tl3=gsap.timeline({
  scrollTrigger:{
      trigger: '.el-3',
      start: 'top center',
      end: '200% center',
      scrub: false,
      // markers: true,
      toggleActions:'play reverse play reverse'
  }
})
tl3.to('.el-3',{
  x:1300
})

let tl4=gsap.timeline({
  scrollTrigger:{
      trigger: '.card',
      start: '-30% center',
      end: 'bottom center',
      scrub: false,
      // markers: true,
      toggleActions:'play reverse play reverse'
  }
})
tl4.to('.card',{
  x:-1500
});

//lenis smooth scroll
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

