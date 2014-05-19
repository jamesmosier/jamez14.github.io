(function($) {


	$.fn.portfolioResize = function () {

		$(document).ready(function() {
			var $wrapperWidth = $(this).width();
    		if ($wrapperWidth < 480) {

				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 1)
			    });
			} else if ($wrapperWidth < 768 && $wrapperWidth > 480) { 
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 2)
			    });
			} else if ($wrapperWidth > 768) {
			    $('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 3) 
			    });
			}
		});

		$(window).resize(function(){

			var $wrapperWidth = $(this).width();

			if ($wrapperWidth < 480) {
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 1)
			    });
			} else if ($wrapperWidth < 768 && $wrapperWidth > 480) { 
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 2)
			    });
			} else if ($wrapperWidth > 768) {
			    $('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 3)
			    });
			}
		});

		$(window).resize();
	}


})(jQuery);