// Check if we are on any of those pages and assing redirect var
const urlConfig = {
  advisorUrls: ['/advisor', '/advisor/'],
  investorUrls: ['/', '/product/'],
};
// Check if current path matches any URL in the config
const currentPath = window.location.pathname;
const advisorRedirect = Object.values(urlConfig)
  .flat()
  .some((pattern) => (pattern === '/' ? currentPath === '/' : currentPath.startsWith(pattern)));

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Helper function to update user type attribute on body
  const updateUserType = () => {
    const userType = localStorage.getItem('cache-user-type');

    // Helper function to check if current path
    const pathMatchesPattern = (currentPath, patterns) => {
      return patterns.some((pattern) =>
        pattern === '/' ? currentPath === '/' : currentPath.startsWith(pattern)
      );
    };

    if (userType) {
      // Set new flow
      document.body.setAttribute('user-type', userType);

      const currentPath = window.location.pathname;
      const onAdvisor = pathMatchesPattern(currentPath, urlConfig.advisorUrls);
      const onInvestor = pathMatchesPattern(currentPath, urlConfig.investorUrls);

      if (currentPath === '/' || advisorRedirect) {
        if (userType === 'advisor' && !onAdvisor) {
          window.location.href = '/advisor';
        } else if (userType === 'investor' && !onInvestor) {
          window.location.href = '/';
        }
      }
    }
  };

  // Handle Popup
  const popup = document.querySelector('.exp-selector');
  const popupBlock = document.querySelector('.exp-selector_block');

  const closeButtons = document.querySelectorAll('.exp-selector_close, .exp-selector_fade');

  // Set initial state for the popup block
  if (popupBlock) {
    gsap.set(popupBlock, {
      y: '2rem',
      opacity: 0,
    });
  }

  // Add click handlers for close buttons
  closeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      hidePopup();
    });
  });

  // Animation functions
  const showPopup = () => {
    popup.style.display = 'flex';
    gsap.to(popupBlock, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: 'out-cubic',
    });
  };

  const hidePopup = () => {
    gsap.to(popupBlock, {
      y: '2rem',
      opacity: 0,
      duration: 0.35,
      ease: 'out-cubic',
      onComplete: () => {
        popup.style.display = 'none';
      },
    });
  };

  // Helper function to handle user type selection
  const handleUserTypeSelection = (userType) => {
    console.log('Selected user type:', userType); // Debug log

    // Store the selection in localStorage
    localStorage.setItem('cache-user-type', userType);

    // Update user-type attribute
    updateUserType();

    // Get redirect URL
    if (!advisorRedirect) {
      // Add slight delay for animation to complete
      setTimeout(() => {
        location.reload();
      }, 350);
    }
  };

  // Add click handler to elements with data-user
  const addUserClickHandlers = (parentElement) => {
    if (!parentElement) return;

    parentElement.querySelectorAll('[data-user]').forEach((element) => {
      element.addEventListener('click', (e) => {
        e.preventDefault();

        const clickedElement = e.target.closest('[data-user]');

        if (!clickedElement) {
          console.error('No element with data-user attribute found');
          return;
        }

        const userType = clickedElement.getAttribute('data-user');
        handleUserTypeSelection(userType);
        hidePopup();
      });
    });
  };

  // Init
  handlePopup();
  updateUserType();
  addUserClickHandlers(document);

  // Check if we already have a user type stored
  const existingUserType = localStorage.getItem('cache-user-type');
  if (!existingUserType && popup) {
    setTimeout(showPopup, 5000);
  }
});
