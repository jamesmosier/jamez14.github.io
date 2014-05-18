(function($) {


	$.fn.portfolioResize = function () {

		$(window).resize(function(){

			var $wrapperWidth = $(this).width();

			if ($wrapperWidth > 1200) {
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 5)
			    });
			} else if ($wrapperWidth > 990) {
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 4)
			    });
			} else if ($wrapperWidth < 480) {
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 1)
			    });
			} else if ($wrapperWidth < 768) { 
				$('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 2)
			    });
			} else {
			    $('.posts-thumbs li a img').css({
			        width:($("[data-id='post-thumbs']").width() / 3)
			    });
			}
		});

		$(window).resize();
	}


})(jQuery);