(function($) {

	$.fn.autotype = function (options) {

		var settings = $.extend({            
			target: this
		}, options );

		var txt = "I'm a front-end developer.".split('');

		var delay = 50;
		for ( i = 0; i < txt.length; i++){   
			setTimeout(function(){        
				$(settings.target).append(txt.shift() )
			}, delay * i )
		}
	}
})(jQuery);