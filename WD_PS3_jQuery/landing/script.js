const NAVIGATION = {
    products_link: '.banner',
    about_us_link: '.services',
    contact_us_link: '.forms'
};

const SPEED = 1000, PAGE_TOP = 0, PX_OFFSET = 100;

$(document).ready(() => {
    const $upButton =  $('.up-button');
    const $links = $('.products_link, .about_us_link, .contact_us_link');

    $(window).scroll(() => {
        ($(this).scrollTop() > PX_OFFSET) ? $upButton.fadeIn(SPEED) : $upButton.fadeOut(SPEED);
    });

    $upButton.click(() => {
        $('html, body').animate({scrollTop : PAGE_TOP}, SPEED);
    });

    $links.click(() => {
        const $aim = $(`${NAVIGATION[event.toElement.className]}`);
        const recenter = (window, aim, offset) => (window > aim) ?
            offset - ((window - aim) / 2) : offset;
        const altitude = recenter($(window).height(), $aim.height(), $aim[0].offsetTop );
        $('html').animate({scrollTop: altitude}, SPEED);
    });
});