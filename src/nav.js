// Nav Reveal
let nav = $('.nav_wrapper');
function checkNav() {
  var scroll = $(window).scrollTop();
  let nav = $('.nav_wrapper');

  if (typeof nav.attr('fixed-by-default') === 'undefined') {
    if (scroll >= 250) {
      nav.addClass('sticky');
      setTimeout(() => {
        $('.nav_wrapper').css('top', 0);
      });
    } else if (scroll === 0) {
      nav.removeClass('sticky');
      nav.attr('style', '');
    }
  }
}

$(window).scroll(checkNav);
checkNav();

// Force to White
// Debounce function to delay execution of specific actions
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Function to handle the case when no dropdowns have the "w--open" class
const handleNoOpenDropdowns = debounce(() => {
  nav.removeClass('is-open');
}, 10);

// Function to check the presence of the "w--open" class among dropdowns
function checkForOpenClass() {
  const hasOpenClass = Array.from(document.querySelectorAll('.nav__drop-toggle')).some((element) =>
    element.classList.contains('w--open')
  );
  if (hasOpenClass) {
    nav.addClass('is-open');
    // Immediate actions when a dropdown is open
  } else {
    // Delayed check for no open dropdowns
    handleNoOpenDropdowns();
  }
}

// MutationObserver to observe class changes on dropdowns
const observer = new MutationObserver((mutations) => {
  checkForOpenClass();
});

// Observe all elements with the class "nav__drop-toggle"
const targetElements = document.querySelectorAll('.nav__drop-toggle');

targetElements.forEach((targetElement) => {
  observer.observe(targetElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
});
