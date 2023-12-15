// Nav Reveal
function checkNav() {
  var scroll = $(window).scrollTop();

  if (scroll >= 100) {
    $('.nav_wrapper').addClass('sticky');
    setTimeout(() => {
      $('.nav_wrapper').css('top', 0);
    });
  } else if (scroll === 0) {
    $('.nav_wrapper').removeClass('sticky');
    $('.nav_wrapper').attr('style', '');
  }
}

$(window).scroll(checkNav);
checkNav();
