const selectImageClass = 'image';
const selectImageSmallClass = 'image__small';
const selectPreviewClass = 'preview';

const OFFSET = 15; // pixels


const selectChessboardClass = 'chessboard';
const selectChessboardWhiteCellClass = 'chessboard__white-cell';
const selectChessboardBlackCellClass = 'chessboard__black-cell';

const CHESSBOARD_CELL_SIZE = 20; // pixels


const selectLinksListClass = 'links-list';

$(function () {

    // task 3
    $.post('handler_show_files_list.php', {
        links_list: 'links_list'
    }, (response) => {
        // show links list for task 3
        if (response) {
            $(`.${selectLinksListClass}`).html(response);
        }

        // download images preview for task 3
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

    // chessboard for task 4
    const $chessboard = $(`.${selectChessboardClass}`);

    if ($chessboard.length) {
        const dimensions = $chessboard.attr('id').split('x');
        const rows = dimensions[0], columns = dimensions[1];

        $chessboard
            .css('height', CHESSBOARD_CELL_SIZE * rows)
            .css('width', CHESSBOARD_CELL_SIZE * columns);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                $chessboard.append(addCell((j % 2) === (i % 2) ?
                    selectChessboardWhiteCellClass : selectChessboardBlackCellClass));
            }
        }
    }
});

const addCell = (color) => `<div class="${color}"></div>`;