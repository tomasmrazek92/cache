import CustomBounce from './utils/CustomBounce';

gsap.registerPlugin(CustomEase, CustomBounce);

// ---- Hero Elems

// Els
let heroVisual = $('.hp-hero_visual');
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

// Avatar Animation

CustomBounce.create('boxBounce', {
  strength: 0.25,
  squash: 10,
});
CustomBounce.create('mainBounce', {
  strength: 0.3,
  squash: 0.3,
});

// ---- Intro Animation
let introTl = gsap.timeline({
  onComplete: () => {
    introOut.add(scrollOut());
  },
});

introTl
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
  .to(orderedBoxes.eq(4), { rotate: -24, xPercent: -0.5 }, '-=0.3');

// ---- Main Animation
// Label Text
let activeIndex = 0;
let stocks = ['AMZN dropped 55% in 2022', 'TSLA dropped 72% in 2022', 'NVDA dropped 65% in 2022'];
let stocksLabel = ['amzn', 'tsla', 'nvda'];
let splitPil;
let splitLabel;

// Functions
function typeStock(index, containerSelector, dataArray, splitVar) {
  let parentContainer = document.querySelector(containerSelector);
  let content = dataArray[index];
  let container = document.createElement('div');
  container.textContent = '$' + content;
  parentContainer.innerHTML = '';
  parentContainer.appendChild(container);

  // Use the provided split variable
  if (splitVar === 'pill') {
    splitPil = new SplitType(container, { types: 'chars' });
  } else if (splitVar === 'label') {
    splitLabel = new SplitType(container, { types: 'chars' });
  }
  let tl = gsap.timeline();

  // Animate characters appearing
  tl.fromTo(
    $(splitPil.chars),
    { display: 'none' },
    { display: 'inline', ease: 'power2', stagger: 0.08 }
  );

  return tl; // Return the timeline
}

function moveAvatar() {
  let tl = gsap.timeline();
  tl.fromTo(
    avatar,
    { opacity: 0, scale: 0.5 },
    { ...fastReveal, scale: 1, xPercent: -105, duration: 0.5 }
  )
    .to(avatar, {
      duration: 0.001,
      onStart: () => avatar.css('z-index', 1),
      onReverseComplete: () => avatar.css('z-index', 1),
      onComplete: () => avatar.css('z-index', 5),
    })
    .to(avatar, { xPercent: -50 });
  return tl;
}
function createAvatarAnimation() {
  let avatarTl = gsap.timeline({
    onReverseComplete: updateAvatar,
  });

  avatarTl.add(moveAvatar());

  return avatarTl; // Return the timeline
}
function removeStockAnimation(splitVar) {
  // Animate characters disappearing
  let tl = gsap.timeline();
  tl.to($(splitVar.chars).toArray().reverse(), { display: 'none', ease: 'power2', stagger: 0.03 });
  return tl;
}
function updateAvatar() {
  let avatars = avatar.find('.image');
  avatars.hide();
  console.log('Avatar:', activeIndex);
  avatars.eq(activeIndex).show();
}
function updateStockStyle(index) {
  let tl = gsap.timeline();

  tl.add(() => {
    // Remove any existing stock label classes
    stocksLabel.forEach((label) => {
      heroVisual.removeClass(label);
    });

    // Add the new style class for the current index
    let style = stocksLabel[index];
    heroVisual.addClass(style);
  });

  return tl;
}
function setupAnimations() {
  // Clear the timeline and add new animations
  masterTimeline.clear();
  masterTimeline.add(updateStockStyle(activeIndex));
  masterTimeline.add(typeStock(activeIndex, '#hero-stocks', stocks, 'pill'));
  masterTimeline.add(typeStock(activeIndex, '#label-stock', stocksLabel, 'label'), '<');
  masterTimeline.addLabel('Avatar');
  masterTimeline.add(createAvatarAnimation(), '<'); // Adjust timing as needed
  // Increment activeIndex
  activeIndex = (activeIndex + 1) % stocks.length;
  masterTimeline.add(removeStockAnimation(splitPil), '+=1'); // Adjust timing as needed
  masterTimeline.add(createAvatarAnimation().reverse(), '<'); // Adjust timing as needed
}

let masterTimeline = gsap.timeline({
  repeat: -1,
  onRepeat: setupAnimations,
});

// Start the first cycle
setupAnimations();

// ---- Scroll Out Animation
function scrollOut() {
  let introOut = gsap.timeline();

  // Get the current 'x' positions of the elements
  let B0X0 = gsap.getProperty(boxes.eq(0)[0], 'x');
  let B1X1 = gsap.getProperty(boxes.eq(1)[0], 'x');

  // Animate the elements
  introOut.fromTo(
    boxes.eq(0).add(boxes.eq(1)),
    {
      x: (index) => (index === 0 ? B0X0 : B1X1),
      opacity: 1,
    },
    {
      x: '-15rem',
      keyframes: { '50%': { opacity: 0 } },
      stagger: 0.2,
      duration: 0.5,
    }
  );

  let B3X0 = gsap.getProperty(boxes.eq(3)[0], 'x');
  let B4X1 = gsap.getProperty(boxes.eq(4)[0], 'x');
  introOut.fromTo(
    boxes.eq(3).add(boxes.eq(4)),
    {
      x: (index) => (index === 0 ? B3X0 : B4X1),
      opacity: 1,
    },
    {
      x: '15rem',
      keyframes: { '50%': { opacity: 0 } },
      stagger: 0.2,
      duration: 0.5,
    },
    '<'
  );
  introOut.fromTo(
    boxes.eq(2),
    {
      y: gsap.getProperty(boxes.eq(2)[0], 'Y'),
      opacity: 1,
    },
    {
      y: '10em',
      keyframes: { '50%': { opacity: 0 } },
      stagger: 0.2,
      duration: 0.5,
    },
    '<'
  );

  return introOut;
}

// Scroll Out / To Logic
let introOut = gsap.timeline({ paused: true });

function checkScrollAndAnimate() {
  let distance = $(window).width() < 991 ? 15 : 1;
  if (window.scrollY === 0) {
    masterTimeline.timeScale(1).progress(1).play();
    introOut.reverse();
  } else if (window.scrollY >= distance) {
    $('#hero-stocks').html(`<div>${$('#hero-stocks').text()}</div>`);
    masterTimeline.timeScale(3).reverse();
    introOut.play();
  }
}

// Add scroll event listener
window.addEventListener('scroll', checkScrollAndAnimate);

// --- Profiles Animation
let profilesTl = gsap.timeline({ paused: true });

// Select all groups with IDs starting with "Avatars"
profilesTl.from($('svg [id^="Avatars"]').get().reverse(), {
  opacity: 0,
  duration: 1,
  stagger: {
    each: 0.05,
    onStart: function () {
      // 'this' refers to the currently animated 'Avatars' element
      const currentAvatarGroup = this.targets()[0];

      // Select all 'Avatar' elements inside the current 'Avatars' group
      const innerAvatars = $(currentAvatarGroup).find('[id^="Avatar"]');

      // Animate the inner 'Avatar' elements
      gsap.from(innerAvatars, {
        scale: 0,
        duration: 0.5,
        stagger: 0.05,
        transformOrigin: 'center',
      });
    },
  },
});

function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      profilesTl.timeScale(2).reverse();
    } else {
      profilesTl.timeScale(1).play();
    }
  });
}

// Creating an observer
const observer = new IntersectionObserver(handleIntersect, { threshold: 0.8 });
observer.observe($('.hp-hero_wall-trigger')[0]);

// --- Overlap Animation
function updateDimensions() {
  let heroSection = $('.section_hp-hero');
  let followingSection = $('.hp-hero_visual-down');
  let heroHeight = heroSection.outerHeight();

  followingSection.css('margin-top', '-' + heroHeight + 'px');
}

// Initial call to set dimensions
updateDimensions();

// Recalculate on resize
$(window).resize(updateDimensions);

// --- Pointer Hero
$('.hp-hero_wall-trigger').each(function () {
  // Function to handle the intersection change
  function handlePointer(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Code to execute when the element is in view
        $('.section_hp-hero').css('pointer-events', 'auto');
      } else {
        // Code to execute when the element is not in view
        $('.section_hp-hero').css('pointer-events', 'none');
      }
    });
  }

  // Creating a new Intersection Observer instance
  const observer = new IntersectionObserver(handlePointer);

  // Targeting the element to observe
  const target = $(this)[0];
  if (target) {
    observer.observe(target);
  }
});

// --- Homepage Video
$('.hp-videos_button').on('click', function () {
  $(this).hide();
  $(this).closest('.hp-videos').find('video')[0].play();
  $(this).closest('.hp-videos').find('video').attr('controls', 'true');
});
