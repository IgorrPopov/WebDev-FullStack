const selectImageClass = 'image';
const selectImageSmallClass = 'image__small';
const selectPreviewClass = 'preview';

const OFFSET = 15; // pixels

$(function () {

    const $preview = $(`.${selectPreviewClass}`); // select all "a" tags with images

    $preview.hover(
        () => {
            const $imgPath = $(event.target).attr('href');

            $('body').append(
                `<div class="${selectImageClass}">
                  <img src="${$imgPath}" class="${selectImageSmallClass}" />
                 </div>`);

            $(`.${selectImageClass}`)
                .css('top', (event.pageY + OFFSET) + 'px')
                .css('left', (event.pageX + OFFSET) + 'px')
                .fadeIn();
        },

        () => { $(`.${selectImageClass}`).remove(); }
    );

    $preview.mousemove(() => {
        $(`.${selectImageClass}`)
            .css('top', (event.pageY + OFFSET) + 'px')
            .css('left', (event.pageX + OFFSET) + 'px')
    });
});