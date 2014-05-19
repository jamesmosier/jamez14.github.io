(function($) {


	$.fn.portfolioResize = function () {

		$(window).load(function() {		
			var $wrapperWidth = $(this).outerWidth();
    		if ($wrapperWidth < 480) {

				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").outerWidth() / 1)
			    });
			} else if ($wrapperWidth < 768 && $wrapperWidth > 480) { 
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").outerWidth() / 2)
			    });
			} else if ($wrapperWidth > 768) {
			    $('.posts-thumbs li a img').css({			    	
			        width:($("[data-id='post-thumbs']").outerWidth() / 3) 
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