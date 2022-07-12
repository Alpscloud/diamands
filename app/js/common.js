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

	$('[data-fancybox').fancybox({
		loop: true,
		buttons: [
			"zoom",
			"close"
		]
	});

	// ========= Ajax form ===========
	$('.js-required-input').on('focus',function() {
		var inputGroup = $(this).parents('.form-group');

		if(inputGroup.hasClass('is-error')) {
			inputGroup.removeClass('is-error');
		}
	});

	var formSuccess = '<div class="form-success js-form-success">' +
								'<button class="btn-close js-close-form-success-btn" type="button"><svg  viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg"><path d="M1.33398 18.6675L18.6679 1.33359"/><path d="M18.668 18.6675L1.33407 1.33359"/></svg></button>' +
								'<p class="form-success__title">Спасибо!</p>' +
								'<p>Мы рассмотрим вашу заявку и свяжемся с вами<br> в ближайшее время </p>' +
							'</div>';

	$('form').on('submit', function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.js-required-input'),
			flag = true;

		var wrapper = that.parents('.form-wrapper');

		var formData = new FormData(that.get(0));
		
		
		
		// Validate
		$(inputs).each(function() {
			var inputGroup = $(this).parents('.form-group');

			if(!$(this).val() || $(this).val() == "") {
				inputGroup.addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			contentType: false,
			processData: false,
			type: "POST",
			url: "sendmail.php", //Change
			data: formData,
		}).done(function() {
			if (wrapper.find('.js-form-success').length == 0) {
				wrapper.append(formSuccess);
				setTimeout(function() {
					wrapper.addClass('is-active');
				}, 100);
			};
			that.trigger("reset");
			that.find('.form-file').removeClasss('is-attached');
		});

	});


	$('.form-wrapper').on('click', '.js-close-form-success-btn', function(e) {
		e.preventDefault();

		$(this).parents('.form-wrapper').removeClass('is-active');
		$(this).parents('.form-wrapper').find('.form-file').removeClass('is-attached');
		$(this).parents('.js-form-success').remove();
		

	});


	$("input[type=tel]").inputmask({"mask": "+380 (99) 999 99 99","clearIncomplete": false});


});



