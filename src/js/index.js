import jQuery from "jquery";


jQuery(function () {

    const $popup          = $('.b-popup');
    const $openPopupBtn   = $('.b-open-popup-btn');
    const $closePopupElem = $('.b-close-popup-elem');

    $openPopupBtn.on('click', function () {
        $popup.addClass('b-popup_state_shown');
    });


    $closePopupElem.on('click', function () {
        $popup.removeClass('b-popup_state_shown');
    });


});
