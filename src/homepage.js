import CustomBounce from './utils/CustomBounce';

gsap.registerPlugin(CustomEase, CustomBounce);

// Els
let mainBox = $('.hp-hero_main-box');
let avatar = $('.hp-hero_avatar');

let boxes = $('.hp-hero_box');
let order = [1, 4, 0, 3, 2];
let orderedBoxes = $($.map(order, (index) => boxes[index]));

// Vars
let fastReveal = { keyframes: { '50%': { opacity: 1 } } };
let boxDuration = 0.7;
let boxStagger = 0.15;
let hasMainBoxAnimated = false;

// Parts
let avatarTl = gsap.timeline({ paused: true });
avatarTl.fromTo(
  avatar,
  { opacity: 0, scale: 0.5 },
  {
    ...fastReveal,
    scale: 1,
    xPercent: -105,
    duration: 0.5,
  }
);
// Front
avatarTl.to(avatar, {
  duration: 0.001,
  onStart: () => avatar.css('z-index', 1),
  onReverseComplete: () => avatar.css('z-index', 1),
  onComplete: () => avatar.css('z-index', 5),
});
avatarTl.to(avatar, { xPercent: -50 });

CustomBounce.create('boxBounce', {
  strength: 0.25,
  squash: 10,
});
CustomBounce.create('mainBounce', {
  strength: 0.3,
  squash: 0.3,
});

// MainTo Timeline
let mainTo = gsap.timeline();

mainTo
  .fromTo(
    orderedBoxes,
    { opacity: 0, y: '-30em' },
    { ...fastReveal, y: '0', stagger: boxStagger, ease: 'boxBounce', duration: boxDuration }
  )
  .add(function () {
    if (!hasMainBoxAnimated) {
      gsap.fromTo(
        mainBox,
        { opacity: 0, rotate: 8, y: '-30em' },
        { ...fastReveal, y: '0', rotate: 0, ease: 'mainBounce', duration: 1 }
      );
      hasMainBoxAnimated = true; // Update the flag
    }
  }, '<0.2')
  .to(
    orderedBoxes,
    {
      yPercent: -50,
      rotate: 8,
      duration: boxDuration,
      stagger: boxStagger,
      ease: 'boxBounce-squash',
    },
    0
  )
  .to(orderedBoxes.eq(4), { rotate: -24, xPercent: -0.5 }, '-=0.3')
  .call(() => {
    avatarTl.play();
  });

// MainFrom
let mainFrom = gsap.timeline({ paused: true });
mainFrom.to(boxes.eq(0).add(boxes.eq(1)), {
  x: '-15rem',
  keyframes: { '50%': { opacity: 0 } },
  stagger: 0.2,
  duration: 0.5,
});
mainFrom.to(
  boxes.eq(3).add(boxes.eq(4)),
  {
    x: '15rem',
    keyframes: { '50%': { opacity: 0 } },
    stagger: 0.2,
    duration: 0.5,
  },
  '<'
);
mainFrom.to(
  boxes.eq(2),
  {
    y: '10em',
    keyframes: { '50%': { opacity: 0 } },
    stagger: 0.2,
    duration: 0.5,
  },
  '<'
);

// Function to check scroll position and play/reverse timeline
function checkScrollAndAnimate() {
  if (window.scrollY === 0) {
    mainFrom.reverse();
    avatarTl.play();
  } else {
    mainFrom.play();
    avatarTl.reverse();
  }
}

// Add scroll event listener
window.addEventListener('scroll', checkScrollAndAnimate);
