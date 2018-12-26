$(document).ready(() => {

    const $preview = $('.preview');
    const OFFSET = 15;

    $preview.hover(() => {
        const $imgPath = $(event.target).attr('href');

        $('body').append('<div class="small_img_wrapper">' +
            '<img src="' + $imgPath + '" class="small_img" /></div>');

        $('.small_img_wrapper')
            .css('top', (event.pageY + OFFSET) + 'px')
            .css('left', (event.pageX + OFFSET) + 'px')
            .fadeIn();


    },

        () => { $('.small_img_wrapper').remove(); }
    );

    $preview.mousemove(() => {
        $('.small_img_wrapper')
            .css('top', (event.pageY + OFFSET) + 'px')
            .css('left', (event.pageX + OFFSET) + 'px')
    });
});