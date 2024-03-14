// #region Nav Disable
let scrollPosition;
let menuOpen;
let menuTimeout;
const disableScroll = () => {
  clearTimeout(menuTimeout);
  if (!menuOpen) {
    scrollPosition = $(window).scrollTop();
    menuTimeout = setTimeout(() => {
      $('html, body').scrollTop(0).addClass('overflow-hidden');
    }, 200);
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpen = !menuOpen;
};

$('.nav_button').on('click', disableScroll);
$('#mobile-menu-close').on('click', disableScroll);

// #endregion

// #region Nav Reveal
let nav = $('.nav_wrapper');
function checkNav() {
  var scroll = $(window).scrollTop();
  let nav = $('.nav_wrapper');

  if (!menuOpen) {
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

// #endregion

const menuDelay = '0.3';
const initializeMobileNav = ({
  menuEl,
  openEl,
  closeEl,
  backEl,
  brandEl,
  labelEl,
  primaryMenuId,
}) => {
  let navigationMemory = [];

  const navigationReset = () => {
    navigationMemory = [primaryMenuId];
    hideSubNav();
  };

  const navigationAdd = (item) => {
    navigationMemory.push(item);
    if (navigationMemory.length > 1) {
      showSubNav();
    }
  };
  const navigationPop = () => {
    navigationMemory.pop();
    if (navigationMemory.length === 1) {
      hideSubNav();
    }
  };

  const showSubNav = () => {
    gsap.to([backEl, labelEl], { opacity: 1, duration: menuDelay });
    gsap.to(brandEl, { opacity: 0, duration: menuDelay });
    gsap.set(brandEl, { pointerEvents: 'none' });
  };

  const hideSubNav = () => {
    gsap.to([backEl, labelEl], { opacity: 0, duration: menuDelay });
    gsap.to(brandEl, { opacity: 1, duration: menuDelay });
    gsap.set(brandEl, { pointerEvents: 'auto' });
  };

  const visibleNext = (current, next) => {
    gsap.to(current, { x: '-100%', duration: menuDelay });
    gsap.to(next, { x: '0%', duration: menuDelay });
  };

  const visibleBack = (current, prev) => {
    gsap.to(current, { x: '100%', duration: menuDelay });
    gsap.to(prev, { x: '0%', duration: menuDelay });
  };

  const openMenu = () => {
    gsap.set(menuEl, { x: '0vw' });
    const mainContent = document.querySelector(`[data-nav-id=${primaryMenuId}]`);

    gsap.set(menuEl, { x: '0vw' });
    gsap.to(mainContent, { x: 0, duration: '0.2' });
    navigationReset();
  };

  const handleClickSubmenu = ({ target }) => {
    console.log(target);
    const targetSubNavId = target.getAttribute('data-target-nav-id');
    const activeTarget = navigationMemory[navigationMemory.length - 1];

    // Update Tittle
    labelEl.textContent = target.textContent;

    visibleNext(
      document.querySelector(`[data-nav-id=${activeTarget}]`),
      document.querySelector(`[data-nav-id=${targetSubNavId}]`)
    );

    navigationAdd(targetSubNavId);
  };

  // initialize clicks
  document.querySelectorAll('[data-target-nav-id]').forEach((clickItem) => {
    clickItem.addEventListener('click', handleClickSubmenu);
  });

  const closeMenu = () => {
    gsap.set(menuEl, { x: '-100vw' });

    // reset position to all submenus
    document.querySelectorAll('[data-nav-id]').forEach((submenu) => {
      submenu.style.setProperty('transform', 'translateX(100%)');
    });
    handleClickBack();
    navigationReset();
  };

  const handleClickBack = () => {
    const currentTarget = navigationMemory[navigationMemory.length - 1];
    const prevTarget = navigationMemory[navigationMemory.length - 2];

    if (currentTarget && prevTarget) {
      visibleBack(
        document.querySelector(`[data-nav-id=${currentTarget}]`),
        document.querySelector(`[data-nav-id=${prevTarget}]`)
      );

      navigationPop();
    }
  };

  openEl.addEventListener('click', openMenu);
  closeEl.addEventListener('click', closeMenu);
  backEl.addEventListener('click', handleClickBack);

  console.log(navigationMemory);
};

initializeMobileNav({
  menuEl: document.getElementById('mobile-menu'),
  openEl: document.getElementById('mobile-menu-open'),
  closeEl: document.getElementById('mobile-menu-close'),
  backEl: document.getElementById('mobile-menu-back'),
  brandEl: document.getElementById('mobile-menu-brand'),
  labelEl: document.getElementById('mobile-menu-label'),
  primaryMenuId: 'main',
});
