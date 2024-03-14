gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Functions
function formatNumber(number) {
  // Define or replace with appropriate formatting logic
  return number.toLocaleString('en');
}
const animateCounter = ($element, value) => {
  $($element).each(function () {
    const currentText = $(this).text().trim().replace(/,/g, ''); // Remove commas before parsing
    const startValue = parseFloat(currentText) || 0; // Fallback to 0 if not a number
    const targetValue = parseFloat(value);

    if (!isNaN(targetValue) && startValue !== targetValue) {
      const Cont = { val: startValue }; // Initialize with current value

      const onUpdate = () => {
        let formattedValue = formatNumber(Math.round(Cont.val));
        $(this).text(formattedValue);
      };

      gsap.fromTo(
        Cont,
        { val: startValue },
        {
          val: targetValue,
          duration: 1,
          onUpdate: onUpdate,
        }
      );
    }
  });
};

function hideElement(element) {
  if ($(element).css('visibility') !== 'hidden') {
    $(element).css('visibility', 'hidden');
  }
}

function showElement(element) {
  if ($(element).css('visibility') !== 'visible') {
    $(element).css('visibility', 'visible');
  }
}

// Function to calculate actual start time of each part, excluding delays
function getActualStartTime(label, delay) {
  // Get the time of the label
  let labelTime = main.labels[label];
  // Calculate the actual start time by subtracting the delay
  return labelTime + 1;
}

// Timeline
function getActivePointCenterX(index) {
  let activePoint = $('[data-drag="point"]').eq(index);
  let dragTimeline = $('[data-drag="timeline"]'); // Adjust the selector as needed

  // Active Class
  $('[data-drag="point"]').removeClass('active');
  activePoint.addClass('active');

  if (activePoint.length > 0 && dragTimeline.length > 0) {
    let activePointCenterX = activePoint.offset().left;
    let timelineX = dragTimeline.offset().left;

    // Calculate relative position
    return activePointCenterX - timelineX;
  }
  console.warn('Active dragPoint or dragTimeline not found.');
  return 0; // Or handle this scenario as you see fit
}
const animateToActivePoint = (index) => {
  let fillWidth;
  if (index === 0) {
    fillWidth = 0;
  } else if (index === 1) {
    fillWidth = 50;
  } else fillWidth = 100;
  gsap.to(dragFill, { width: `${fillWidth}%`, duration: 0.75 });
  gsap.to(dragBall, { x: getActivePointCenterX(index), duration: 0.75 });
};

// Elements
let graphSection = $('[graph-section]');

let value1 = $('[data-value="1"]');
let value2 = $('[data-value="2"]');

let barWrap = $('[data-bar="wrap"]');
let bar1_1 = $('[data-bar=1-1]');
let bar1_2 = $('[data-bar=1-2]');
let bar2_1 = $('[data-bar=2-1]');
let bar2_2 = $('[data-bar=2-2]');

let gain1 = $('[data-gain="1"]');
let gain2Text = $('[data-gain="text-2"]');
let gain2Sign = $('[data-gain=sign-2]');
let gain2 = $('[data-gain="2"]');
let invst1 = $('[data-investment="1"]');
let invst2 = $('[data-investment="2"]');

let dragTimeline = $('[data-drag="timeline"]');
let dragBall = $('[data-drag="ball"]');
let dragPoint = $('[data-drag="point"]');
let dragFill = $('[data-drag="fill"]');

let contentReveal = $('.exchange__difference-cta-wrap');

// Values
let values = {
  value1: [300000, 300000, 584615],
  value2: [300000, 213125, 415320],
  taxDrag: 86875,
  gain1: 284615,
  gain2: 202195,
};
let greenHex = '#309157';
let orangeHex = '#e95c20';

// Defaults
gsap.defaults({ ease: Power3.easeInOut, duration: 1 });

// Init Set
gsap.set([bar1_1, bar2_1], { maxHeight: 0 });
gsap.set(bar2_1, { background: orangeHex });
gsap.set(contentReveal, { opacity: 0 });

// Load 1
const part1 = () => {
  let tl = gsap.timeline({});
  tl.fromTo(barWrap, { height: 0 }, { height: '13.3em' });
  tl.call(animateToActivePoint, [0], '<');
  tl.add(stats1(), '<');
  return tl;
};
const stats1 = () => {
  let tl = gsap.timeline();
  tl.call(animateCounter, [value1, values.value1[0]], '<');
  tl.call(animateCounter, [value2, values.value2[0]], '<');
  tl.call(animateCounter, [invst1, values.value1[0]], '<');
  tl.call(animateCounter, [invst2, values.value2[0]], '<');
  return tl;
};

// Load 2
const part2 = () => {
  let tl = gsap.timeline({});
  tl.to(bar2_1, { maxHeight: '4.5em' });
  tl.set(gain2Text, { text: 'Tax Drag:' }, '<');
  tl.set(gain2Sign, { text: '-$' }, '<');
  tl.call(animateToActivePoint, [1], '<');
  tl.add(stats2(), '<');
  return tl;
};
const stats2 = () => {
  let tl = gsap.timeline();
  tl.call(animateCounter, [value1, values.value1[1]]);
  tl.call(animateCounter, [gain2, values.taxDrag], '<');
  tl.call(animateCounter, [value2, values.value2[1]], '<');
  tl.call(animateCounter, [invst2, values.value2[1]], '<');
  return tl;
};

// Load 3
const part3 = () => {
  let tl = gsap.timeline({});
  tl.to(barWrap.eq(0), { height: '97%' });
  tl.to(barWrap.eq(1), { height: '18em' }, '<');
  tl.to(bar1_1, { maxHeight: '12.5em' }, '<');
  tl.to(bar2_1, { maxHeight: '9em', background: greenHex }, '<');
  tl.set(gain2Text, { text: 'Capital Gain:' }, '<');
  tl.set(gain2Sign, { text: '$' }, '<');
  tl.call(animateToActivePoint, [2], '<');
  tl.add(stats3(), '<');

  return tl;
};
const stats3 = () => {
  let tl = gsap.timeline();
  tl.call(animateCounter, [value1, values.value1[2]], '<');
  tl.call(animateCounter, [value2, values.value2[2]], '<');
  tl.call(animateCounter, [gain1, values.gain1], '<');
  tl.call(animateCounter, [gain2, values.gain2], '<');
  return tl;
};

// Main TL
let main = gsap.timeline({
  scrollTrigger: {
    trigger: $('[graph-section]'),
    start: 'top center',
  },
});

main.addLabel('Part 1: Start');
main.add(part1());
main.addLabel('Part 1: End');
main.addLabel('Part 2: Start');
main.add(part2(), '+=1');
main.addLabel('Part 2: End');
main.addLabel('Part 3: Start');
main.add(part3(), '+=1');
main.addLabel('Part 3: End');
main.call(() => {
  gsap.to(contentReveal, { opacity: 1 });
});

// Events
dragPoint.on('click', function () {
  main.pause();
  let index = $(this).index();
  let startTime, endTime;

  if (index === 0) {
    startTime = 'Part 1: Start';
    endTime = 'Part 1: End';
    stats1();
  } else if (index === 1) {
    startTime = getActualStartTime('Part 2: Start', 1);
    endTime = 'Part 2: End';
    stats2();
  } else if (index === 2) {
    startTime = getActualStartTime('Part 3: Start', 1);
    endTime = 'Part 3: End';
  }

  main.seek(startTime);
  main.tweenTo(endTime);
  // Optionally play the stats animation for each part
  // stats[index]().play();
});

// Restart
$('[button-restart]').on('click', function () {
  main.restart();
  stats1();
  animateToActivePoint(0);
});

$(window).on('resize', function () {
  animateToActivePoint($(dragPoint.filter('.active')).index());
});
