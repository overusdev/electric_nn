import jQuery from "jquery";


jQuery(function () {

    const $popup          = $('.b-popup');
    const $openPopupBtn   = $('.b-open-popup-btn');
    const $closePopupElem = $('.b-close-popup-elem');
    const $burger         = $('.b-nav__burger');
    const $menuArrow      = $('.b-nav__menu-arrow');

    $burger.on('click', function () {
        $('.b-nav__menu-wrapper').addClass('b-nav__menu-wrapper_state_active');
    });


    $menuArrow.on('click', function () {
        $('.b-nav__menu-wrapper').removeClass('b-nav__menu-wrapper_state_active');
    });


    $openPopupBtn.on('click', function () {
        $popup.addClass('b-popup_state_shown');
    });


    $closePopupElem.on('click', function () {
        $popup.removeClass('b-popup_state_shown');
    });


});
