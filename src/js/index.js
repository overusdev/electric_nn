import $ from "jquery";
import mask from "jquery-mask-plugin";
import 'owl.carousel';

$(function () {

    $('.b-gallery__owl').owlCarousel({
        nav: true,
        margin: 40,
        responsiveClass:true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        },
        navText: [
            "<img class='b-gallery__icon_arrow-left' src='img/gallery/arrows/b-gallery__icon_arrow-left.svg'>", 
            "<img class='b-gallery__icon_arrow-right' src='img/gallery/arrows/b-gallery__icon_arrow-right.svg'>"
        ],
    });

    $('.b-gallery__owl-mobile').owlCarousel({
        nav: false,
        responsiveClass:true,
        responsive:{
            0:{
                items: 1,
                nav: false
            },
        },
    });


    $('.b-reviews__wrapper').owlCarousel({
        nav: true,
        margin: 40,
        responsiveClass:true,
        responsive:{
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 2,
                nav: true,
                loop: false
            }
        },
        navText: [
            "<img class='b-reviews__icon_arrow-left' src='img/gallery/arrows/b-gallery__icon_arrow-left.svg'>", 
            "<img class='b-reviews__icon_arrow-right' src='img/gallery/arrows/b-gallery__icon_arrow-right.svg'>"
        ],
    });

    const $popup              = $('.b-popup');
    const $popupBtn           = $('.b-popup__button');
    const $popupLoaderWrapper = $('.b-popup__loader-wrapper').hide();
    const $popupSpinner       = $('.b-popup__spinner');
    const $popupThnxText      = $('.b-popup__thnx-text').hide();
    const $openPopupBtn       = $('.b-open-popup-btn');
    const $closePopupElem     = $('.b-close-popup-elem');
    const $burger             = $('.b-nav__burger');
    const $menuArrow          = $('.b-nav__menu-arrow');
    const $loupeWrapper       = $('.b-services__loupe-wrapper');
    const $closeFullBlock     = $('.b-services__full-block-close');
    const $inputPhone         = $('.b-popup__input_phone');

    $inputPhone.mask('+0 (000) 000 00 00', { placeholder: "+_ (___) ___ __ __" });
    $inputPhone.on('keyup', function() {
        if ( $(this).val().length === 18 ) {
            $popupBtn.removeClass('b-popup__button_state_disabled');
        }
    });

    $popupBtn.on('click', function(e) {
        e.preventDefault();
        $popupLoaderWrapper.show();

        setTimeout(function () {
            $popup.removeClass('b-popup_state_shown');
        }, 7000);

        $.ajax({
            url: "../ajax/order.php",
            type: "POST",
            data: $('#b-popup__form').serialize(),
            dataType: "html",
            beforeSend: function () {
                $popupLoaderWrapper.show();
                console.log('Sending data...');
            },
            success: function (data) {
                console.log(data);
                $popupSpinner.addClass('b-popup__spinner_state_hidden');
                $popupThnxText.show();
                setTimeout(function () {
                    $popup.removeClass('b-popup_state_shown');
                }, 7000);
            },
            error: function () {
                $popupSpinner.addClass('b-popup__spinner_state_hidden');
                alert("Error occured.please try again");
            },
            complete: function () {
                console.log('Complete');
            },
        });

    })

    $burger.on('click', function () {
        $('.b-nav__menu-wrapper').addClass('b-nav__menu-wrapper_state_active');
    });


    $menuArrow.on('click', function () {
        $('.b-nav__menu-wrapper').removeClass('b-nav__menu-wrapper_state_active');
    });


    $openPopupBtn.on('click', function () {
        $popup.addClass('b-popup_state_shown');
    });


    $(document).mouseup(function (e) { // событие клика по веб-документу
        if (e.target.className === 'b-popup b-close-popup-elem b-popup_state_shown') {
            $popup.removeClass('b-popup_state_shown');
        }
    });


    $('.b-popup__close-popup').on('click', function () {
        $popup.removeClass('b-popup_state_shown');
    });


    $loupeWrapper.on('click', function () {
        $('div[data-full="' + $(this).data('item') + '"]').addClass('b-services__full-block_state_show');
    });


    $closeFullBlock.on('click', function () {
        $('div[data-full="' + $(this).data('item') + '"]').addClass('b-services__full-block_state_show');
    });

    $closeFullBlock.on('click', function () {
        $(this).parent('.b-services__full-block').removeClass('b-services__full-block_state_show');
    });

    //скролл side главная страница
    $(window).scroll(function () {
        var $sections = $('.el-sections');
        $sections.each(function (i, el) {

            var top = $(el).offset().top - 100;
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('.b-nav__links').removeClass('b-nav__links_state_active');
                $('a[href="#' + id + '"]').addClass('b-nav__links_state_active');

            }
        })
    });

    $('.b-nav__links').on("click", function (event) {
        event.preventDefault();

        $('.b-nav__menu-wrapper').removeClass('b-nav__menu-wrapper_state_active');
        const id = $(this).attr('href');
        const top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 800);
    });

    $('.b-header-block__button').on("click", function (event) {
        event.preventDefault();
        const orderBlockPosition = $('#b-order').offset().top;
        $('body,html')
            .animate({ scrollTop: orderBlockPosition }, 800);
    });

    //фикс навбар
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('.b-nav').addClass("b-nav_state_fixed");
            $('.b-nav__nav-wrapper').addClass("b-nav__nav-wrapper_state_tiny");
        }
        else {
            $('.b-nav').removeClass("b-nav_state_fixed");
            $('.b-nav__nav-wrapper').removeClass("b-nav__nav-wrapper_state_tiny");
        }
    });

    // показать кнопку наверх
    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $('.top').addClass('top_active');
        }
        else {
            $('.top').removeClass('top_active');
        }
    });

    //Кнопка "Наверх"
    //http://api.jquery.com/scrolltop/
    //http://api.jquery.com/animate/
    $(".top").click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

});
