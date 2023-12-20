// Nav Reveal
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
