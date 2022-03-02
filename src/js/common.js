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

	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top - 70;

		$('html, body').animate({scrollTop: top}, 300);
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

	$('.js-toggle-footer-nav-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$(this).parents('.footer-col').find('.footer-nav').stop().slideToggle(250);
		
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


	var fileInputs = $('input[type=file]');

	console.log(fileInputs)

	if (fileInputs.length > 0) {

		fileInputs.each(function() {

			$(this).on('change', function(e) {
				var self = $(this);
				var fileName = '';

				var filesLength = self[0].files.length;
				var files = self[0].files;

				if (files && filesLength > 1) {
					fileName = ( self.attr( 'data-multiple-caption' ) || '' ).replace( '{count}', filesLength );
				} else {
					fileName = e.target.value.split( '\\' ).pop();
				}

				if( fileName ) {	
					self.parents('.form-file').find('.form-file__result--text').html(fileName);
					self.parents('.form-file').addClass('is-attached');
				} 

				


			});
		});
	
	}



	// var fileInputs = document.querySelectorAll( '.input__file' );


	// Array.prototype.forEach.call( fileInputs, function( input ) {
	// 	var label    = input.parentNode,
	// 	labelVal = label.innerHTML;

	// 	input.addEventListener('change', function(e) {
	// 		var fileName = '',
	// 		nextElem = label.nextElementSibling;

	// 		if(nextElem.classList.contains('active')) {
	// 			nextElem.classList.remove('active');
	// 		}

	// 		if( this.files && this.files.length > 1 ) {
	// 			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
	// 		}
	// 		else {
	// 			fileName = e.target.value.split( '\\' ).pop();
	// 		}

	// 		if( fileName ) {	
	// 			nextElem.innerHTML = fileName;
	// 			nextElem.classList.add('is-active');
	// 		} else {

	// 			label.innerHTML = labelVal;
	// 		}
	// 	});
	// });


	$("input[type=tel]").inputmask({"mask": "+380 (99) 999 99 99","clearIncomplete": false});


});



