const PATH_TO_POST_REQUEST_HANDLER = './handler/handler.php';

const selectDraggableBlockClass = 'draggable-block';
const selectImgContainerClass = 'img-container';
const selectDraggableBlockInputClass = 'draggable-block__input';

const EMPTY_BALLOON_WIDTH = 184;
const EMPTY_BALLOON_HEIGHT = 72;

const OFFSET_Y_FOR_CORNER_CENTRING = 73;
const OFFSET_X_FOR_CORNER_CENTRING = 45;

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

const MAX_MSG_LENGHT = 150;


let startIndex = 0;


$(() => {

    $.post(PATH_TO_POST_REQUEST_HANDLER, { action: 'load_old_balloons' }, (response) => {

        addOldBalloons(response);
        addBalloonsDoubleClickHandler();
        addImageDoubleClickHandler();
        makeBalloonsDraggable();

    }, 'json');

});


function addImageDoubleClickHandler() {

    const $imgContainer = $(`.${selectImgContainerClass}`);

    $imgContainer.dblclick((e) => {

        e.stopPropagation();

        const coordinates = getCoordinates(e, $imgContainer);

        $imgContainer.append(
            $('<div></div>')
                .addClass(selectDraggableBlockClass)
                .attr('id', ++startIndex)
                .css({ top: coordinates.y, left: coordinates.x})
        );

        sendPost('add_new_balloon', $(`#${startIndex}`));

        makeBalloonsDraggable();

        addBalloonsDoubleClickHandler(`#${startIndex}`);

    });

}


function addBalloonsDoubleClickHandler(newBalloonId = false) {

    $(newBalloonId ? newBalloonId : `.${selectDraggableBlockClass}`).dblclick((e) => {

        e.stopPropagation();

        const $target = $(e.target);
        const previousText = $target.text();

        $target.empty().append(`<input class="${selectDraggableBlockInputClass}" maxlength="${MAX_MSG_LENGHT}">`);

        handelBalloonsInput($target, $target.children('input'), previousText);

    });

}


function handelBalloonsInput($target, $input, previousText) {

    $input.val(previousText);
    $input.focus();


    $input.on('focusout', () => {
        $input.remove();
        $target.text(previousText);
    });


    $input.on('keydown', (e) => {

        if (e.keyCode === ESC_KEY_CODE) {
            $input.remove();
            $target.text(previousText);
        }

        if (e.keyCode === ENTER_KEY_CODE) {

            let text = $input.val();

            if (text === '') {
                sendPost('delete_balloon', $target);
                $target.remove();
            } else {
                sendPost('change_balloon_text', $target, text);
                $input.remove();
            }

        }

    });

}


function addOldBalloons(response) {

    let balloons = '';

    for(let id in response) {
        startIndex = startIndex <= parseInt(id) ? parseInt(id) + 1 : startIndex;

        const y = response[id].position_y;
        const x = response[id].position_x;

        balloons +=
            `<div class="${selectDraggableBlockClass}" id="${id}" style="top: ${y}; left: ${x};">${response[id].text ? response[id].text : ''}</div>`;
    }

    $(`.${selectImgContainerClass}`).html(balloons);

}


function makeBalloonsDraggable() {

    $(`.${selectDraggableBlockClass}`)
        .draggable({

            containment: `.${selectImgContainerClass}`,
            stop:function () {
                sendPost('move_balloon', $(this));
            }

        });

}


function sendPost(action, $target, text = '') {

    let parameters = { action: action, id: $target.attr('id') };

    if (action === 'move_balloon' || action === 'add_new_balloon') {

        parameters.position_x = $target.css('left');
        parameters.position_y = $target.css('top');

    }

    if (action === 'change_balloon_text') {

        parameters.text = text;

    }

    $.post(PATH_TO_POST_REQUEST_HANDLER, parameters, response => {

        if (action === 'change_balloon_text') {

            $target.text(response.text);

        }

    }, 'json');

}

function getCoordinates(event, $container) {

    const coordinates = {x: OFFSET_X_FOR_CORNER_CENTRING, y: OFFSET_Y_FOR_CORNER_CENTRING};

    const clickX = event.pageX;
    const clickY = event.pageY;

    const containerOffsetX = $container.offset().left;
    const containerOffsetY = $container.offset().top;
    const containerWidth = $container.width();


    if (containerOffsetX + OFFSET_X_FOR_CORNER_CENTRING >= clickX) {
        coordinates.x = clickX - containerOffsetX;
    }

    if (containerOffsetX + containerWidth - (EMPTY_BALLOON_WIDTH - OFFSET_X_FOR_CORNER_CENTRING) <= clickX) {
        coordinates.x -= containerWidth + containerOffsetX - clickX - EMPTY_BALLOON_WIDTH + OFFSET_X_FOR_CORNER_CENTRING;
    }

    if(containerOffsetY + EMPTY_BALLOON_HEIGHT >= clickY) {
        coordinates.y = clickY - containerOffsetY;
    }


    coordinates.y = clickY - containerOffsetY - coordinates.y;
    coordinates.x = clickX - containerOffsetX - coordinates.x;

    return coordinates;

}