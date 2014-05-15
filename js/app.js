(function($) {

	$.fn.autotype = function (options) {

		var settings = $.extend({            
			target: this
		}, options );

		var txt='This is what I want to type'.split('');

		var delay=100;
		for ( i=0; i<txt.length;i++){   
			setTimeout(function(){        
				$(settings.target).append(txt.shift() )
			}, delay * i)       

		}
	}
})(jQuery);