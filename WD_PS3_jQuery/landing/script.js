const SPEED = 1000, PAGE_TOP = 0, PX_OFFSET = 100;

$(document).ready(() => {
    const $upButton =  $('.up-button');
    const $links = $('#banner, #services, #forms');
    const $webPage = $('html, body');
    const stopScroll = () => {
        $webPage.on("DOMMouseScroll mousewheel keyup touchmove scroll wheel",
            () => { $webPage.stop();}
        );
    };

    $(window).scroll(() => {
        ($(this).scrollTop() > PX_OFFSET) ? $upButton.fadeIn(10) : $upButton.fadeOut(10);
    });

    $upButton.click(() => {
        if (!$(':animated').length) {
            stopScroll();
            $webPage.animate({scrollTop : PAGE_TOP}, SPEED);
        }
    });

    $links.click(() => {
        if (!$(':animated').length) {
            stopScroll();
            const $aim = $('.' + `${event.target.id}`);
            const recenter = (window, aim, offset) => (window > aim) ?
                offset - ((window - aim) / 2) : offset;
            const altitude = recenter($(window).height(), $aim.height(), $aim[0].offsetTop );
            $webPage.animate({scrollTop: altitude}, SPEED);
        }
    });
});