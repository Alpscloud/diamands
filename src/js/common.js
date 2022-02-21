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


	// Popup
	$('.js-open-categories-popup-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-categories').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});
	// ========= =========== =========== ===========

	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$('.js-nav').toggleClass('is-opened');
		$('html').toggleClass('is-fixed');
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


	if ($('.js-products-slider').length > 0) {
		var productsSlider = new Swiper('.js-products-slider', {
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: '.js-products-slider-btn-next',
				prevEl: '.js-products-slider-btn-prev',
			},
		});
	}

	if ($('.js-feedbacks-slider').length > 0) {
		var feedbacksSlider = new Swiper('.js-feedbacks-slider', {
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: '.js-feedbacks-slider-btn-next',
				prevEl: '.js-feedbacks-slider-btn-prev',
			},
			breakpoints: {
				992: {
					slidesPerView: 'auto'
				},
				700: {
					slidesPerView: 2
				}
			}
		});
	}


	$("input[type=tel]").inputmask({"mask": "+380 (99) 999 99 99","clearIncomplete": false});


});
