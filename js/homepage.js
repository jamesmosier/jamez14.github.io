(function(window, document, $) {
  'use strict';

  var postsNav = function() {
    this.isVisible = false;

    this.togglePostsNav();
    this.navAnchorClick();
  };

  postsNav.prototype.setIsVisible = function(isIt) {
    this.isVisible = isIt;
  };

  postsNav.prototype.togglePostsNav = function() {
    var context = this;

    $(document).on('click', '#toggle-posts-nav', function() {
      var $postsNav = $('.posts-nav');
      var $blogNav = $('.blog-nav');

      $blogNav.slideToggle();
      $postsNav.toggleClass('active');

      if (context.isVisible) {
        $postsNav.animate({
          backgroundColor: 'rgba(85, 85, 85, 0.45)'
        });
      } else {
        $postsNav.animate({
          backgroundColor: 'rgba(85,85,85,.94)'
        });
      }

      var isItVisible = context.isVisible ? false : true;
      context.setIsVisible(isItVisible);
    });
  };

  postsNav.prototype.navAnchorClick = function() {
    var context = this;

    $(document).on('click', '.blog-nav-anchor', function() {
      if (context.isVisible) {
        var $postsNav = $('.posts-nav');
        var $blogNav = $('.blog-nav');

        $blogNav.hide();
        $postsNav.removeClass('active');
        $postsNav.animate({
          backgroundColor: 'rgba(85, 85, 85, 0.45)'
        });

        context.setIsVisible(false);

        $('body').animate({
          scrollTop: $($(this).attr('href')).offset().top - 55
        }, 200);
      }
    });
  };

  window.postsNav = new postsNav();

}(window, document, jQuery));
