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

	$.fn.gMap = function () {
		
		function init() {
		    var mapOptions = {
		         
		        center: new google.maps.LatLng(41.096642, -81.544071), 
		        zoom: 14,
		        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]
		    };

		    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

		    var resizeTimeout; google.maps.event.addDomListener(window, "resize", function() { 
		    if (resizeTimeout) { 
		    	clearTimeout(resizeTimeout); 
			} resizeTimeout = setTimeout(function() {
			 /* do resizing */ 
			}, 250); });
		}

		google.maps.event.addDomListener(window, 'load', init);
	}


})(jQuery);