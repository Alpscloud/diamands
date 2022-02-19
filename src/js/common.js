$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});

	if ($('.js-select').length > 0) {
		$('.js-select').on('click',  function(e) {
			$(this).toggleClass('is-opened');
		});

		$('.js-select').on('click', 'li',  function(e) {
			var value = $(this).attr('data-value');
			$(this).parents('.js-select').find('input').val(value).trigger('change');
			
		});


		$(document).mouseup(function (e) {
			var container = $('.js-select');
			if (container.has(e.target).length === 0){
				container.removeClass('is-opened');
			}
		});
	}


	$("input[type=tel]").inputmask({"mask": "+380 (99) 999 99 99","clearIncomplete": false});


});
