import jQuery from "jquery";

jQuery(function () {

    const $popup          = $('.b-popup');
    const $openPopupBtn   = $('.b-open-popup-btn');
    const $closePopupElem = $('.b-close-popup-elem');
    const $burger         = $('.b-nav__burger');
    const $menuArrow      = $('.b-nav__menu-arrow');
    const $servicesItem   = $('.b-services__item');

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


    // $servicesItem.on('click', function () {
    //     $(this).toggleClass('b-services__item_state_scaled');
    // });

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
        // исключаем стандартную реакцию браузера
        event.preventDefault();

        $('.b-nav__menu-wrapper').removeClass('b-nav__menu-wrapper_state_active');

        // получем идентификатор блока из атрибута href
        var id = $(this).attr('href'),

        // находим высоту, на которой расположен блок
            top = $(id).offset().top;

        console.log(top);

        // анимируем переход к блоку, время: 800 мс
        $('body,html').animate({ scrollTop: top }, 800);
    });

    //фикс навбар
        // $(window).scroll(function () {
        //     if ($(this).scrollTop() > 80) {
        //         $('.b-nav').addClass("b-nav_state_fixed");
        //     }
        //     else {
        //         $('.b-nav').removeClass("b-nav_state_fixed");
        //     }
        // });

    // показать кнопку наверх
    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $('#top').fadeIn(100);
        }
        else {
            $('#top').fadeOut(100);
        }
    });

    //Кнопка "Наверх"
    //http://api.jquery.com/scrolltop/
    //http://api.jquery.com/animate/
    $("#top").click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
        return false;
    });

});
