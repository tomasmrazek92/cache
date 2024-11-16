// Slides
let menuOpen;
const categoryMap = {};
const currentSlideEl = $('.current-slide');
let currentSlide;
const totalSlideEl = $('.total-slide');
let totalSlide;
let lastActiveCategory = null;

// Links
const sideList = $('.questions_toc_list');
const sideItems = $('.questions_toc-item');
const categoryItems = $('.questions_toc-dropdown');

// Content
const content = $('.questions_block');
const swiper = new Swiper('.questions_inner-slider', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-arrow.faq.next',
    prevEl: '.swiper-arrow.faq.prev',
  },
  on: {
    beforeInit: (swiper) => {
      mapSlides();
    },
    afterInit: (swiper) => {
      trackSlides(swiper);
      updateCategory();
      updateToc(0, swiper);
    },
    slideChange: (swiper) => {
      trackSlides(swiper);
      updateToc(swiper.activeIndex);
    },
  },
});

// Functions
function mapSlides() {
  // Iterate over each '.question_list-item'
  $('.questions_inner').each(function () {
    const category = $(this).data('category');

    // Initialize the category array if it doesn't exist
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }

    // Add the '.questions_inner' items of this category to the array
    $(this).each(function () {
      categoryMap[category].push(this); // 'this' refers to the '.questions_inner' item
    });
  });

  // Get all category keys and sort them (if they are numeric or string)
  const categoryKeys = Object.keys(categoryMap).sort();

  // Iterate over each category except the last one
  for (let i = 0; i < categoryKeys.length - 1; i++) {
    const category = categoryKeys[i];
    const lastItem = categoryMap[category][categoryMap[category].length - 1];

    // Add class to the last item of this category
    $(lastItem).addClass('category-last');
  }
}
function trackSlides(swiper) {
  const activeSlide = $(swiper.slides[swiper.activeIndex]);

  // Iterate through each category to find the active slide
  Object.keys(categoryMap).forEach((category, index) => {
    // Get total slides for each category
    $('[category-count]')
      .eq(index)
      .text(`(${$(categoryMap[index + 1]).length})`);

    // Find the index of the active slide in the current category
    const indexInCategory = categoryMap[category].indexOf(activeSlide[0]) || 0;

    if (indexInCategory !== -1) {
      // Adjust the index for the updateCategory function
      // Assuming category is a string representing a number
      updateCategory(parseInt(category) - 1);

      // Check and update the current slide count based on the category
      if (lastActiveCategory !== category) {
        currentSlide = indexInCategory + 1; // Reset and update currentSlide
        lastActiveCategory = category;
      } else {
        currentSlide = indexInCategory + 1; // Just update currentSlide
      }

      totalSlide = categoryMap[category].length;

      // Format currentSlide and totalSlide as two-digit numbers
      const formattedCurrentSlide = String(currentSlide).padStart(2, '0');
      const formattedTotalSlide = String(totalSlide).padStart(2, '0');
      currentSlideEl.text(formattedCurrentSlide);
      totalSlideEl.text(formattedTotalSlide);
    }
  });
}
function updateCategory(index) {
  const activeClass = 'active';
  const activeLine = $('.questions_active-line');

  // Check if the current active index does not match the passed index
  // Remove the active class from all items and update
  categoryItems.removeClass(activeClass);
  categoryItems.eq(index).addClass(activeClass);

  // Find the newly active item and move the line there
  const newActiveItem = categoryItems.eq(index ?? 0);

  // Update the sidelinks
  sideList.hide();
  sideList.eq(index).show();

  // Update the responsive name
  $('[category-display]').text(newActiveItem.find('[category-name]').text());
}
function updateToc(index, swiperInstance) {
  const parentIndex = sideItems.eq(index).closest('ul').index();
  const activeClass = 'active';

  // Existing code to map slide references
  const categoryIndex = findInnerIndex(categoryMap, index);
  let dropdownLists = categoryItems.find('.questions_toc-mask');
  dropdownLists.stop().animate('height', 0);
  dropdownLists.eq(categoryIndex).stop().animate('height', 'auto');
  console.log(parentIndex);
  console.log(categoryIndex);
  const slideRef = categoryMap[parentIndex + 1][categoryIndex];
  const slideIndex = slideRef ? $(slideRef).index() : 0;

  if (swiperInstance) {
    swiperInstance.slideTo(slideIndex);
  }

  // Existing code to update active state
  sideItems.removeClass(activeClass);
  sideItems.eq(index).addClass(activeClass);

  // Animate scroll
  const itemOffsetTop = sideItems.eq(index).position().top;
  const tocWrapper = sideItems.eq(index).closest('.questions_toc_wrap');

  tocWrapper.stop().animate(
    {
      scrollTop: tocWrapper.scrollTop() + itemOffsetTop,
    },
    500
  ); // 500 is the duration in milliseconds for the animation
}
function findInnerIndex(obj, targetIndex) {
  let cumulativeIndex = 0;

  for (const array of Object.values(obj)) {
    if (cumulativeIndex + array.length > targetIndex) {
      // Calculate and return the index within the nested array
      return targetIndex - cumulativeIndex;
    }
    cumulativeIndex += array.length;
  }

  return -1; // Return -1 if targetIndex is out of bounds
}

// Links
sideItems.on('click', function () {
  updateToc(sideItems.index($(this)), swiper);
});

categoryItems.on('click', function () {
  // Base
  const index = $(this).index();
  updateCategory(index);

  const slideRef = categoryMap[index + 1][0];
  const slideIndex = $(slideRef).index();

  swiper.slideTo(slideIndex);

  if ($(window).width() <= 992) {
    content.css('display', 'flex');
    setTimeout(() => {
      trackSlides(swiper);
    }, 200);
    console.log('disabled');
    disableScroll();
  }
});

// Close
$('#content-close').on('click', function () {
  content.hide();
  disableScroll();
});

var scrollPosition;
const disableScroll = () => {
  if (!menuOpen) {
    scrollPosition = $(window).scrollTop();
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
  menuOpen = !menuOpen;
};
