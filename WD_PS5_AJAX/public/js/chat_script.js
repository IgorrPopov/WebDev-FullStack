const PATH_TO_CHAT_HANDLER = '../app/handlers/handler_chat.php';
const PATH_TO_FROWNING_FACE_EMOJI_FILE = 'emoji/frowning_face.png';
const PATH_TO_SMILING_FACE_EMOJI_FILE = 'emoji/smiling_face.png';

const MILLISECONDS_IN_SECOND = 1000;

const FROWNING_FACE_EMOJI = ':(';
const SMILING_FACE_EMOJI = ':)';

const selectChatInputTextClass = 'chat__input-text';
const selectFormChatClass = 'chat__form';
const selectChatTextareaClass = 'chat__textarea';
const selectEmptyMessageClass = 'empty-message';
const selectChatInputSubmitClass = 'chat__input-submit';

$(() => {
    const $chatInput = $(`.${selectChatInputTextClass}`);
    const $chatForm = $(`.${selectFormChatClass}`);


    // downloading chat messages that already have been sent when the page is loading
    if ($chatForm.length) {
        updateChatMessages(true);
    }


    $chatForm.on('submit', (event) => {

        event.preventDefault();

        $.post(PATH_TO_CHAT_HANDLER, {
            new_message: $chatInput.val(),
            time: new Date().getTime()
        }, (responseError) => {
            if (responseError === 'exception') { // php gave us an exception
                window.location = 'error_page.php';
            } else if (responseError) { // check if message isn't valid
                $(`.${selectEmptyMessageClass}`).remove();
                $(`.${selectChatInputSubmitClass}`).after(
                    `<p class="${selectEmptyMessageClass}">${responseError}</p>`
                );
            } else { // the message is valid
                $(`.${selectEmptyMessageClass}`).remove();

                updateChatMessages(true);
            }

            $chatInput.val('');

        }).fail((xhr, status, error) => { // ajax fail
            handleAjaxError(status + ' ' + xhr.status + ' ' + error);
        });
    });
});

function updateChatMessages(scrollDown = false) {

    $.post(PATH_TO_CHAT_HANDLER, {
        load_chat: 'load_chat'
    }, (response) => {
        if (response === 'exception') { // php gave us an exception
            window.location = 'error_page.php';
        } else if (response) {
            response = JSON.parse(response);

            let updatedMessages = '';
            for (let timeKey in response) {
                updatedMessages += getOneLineMessage(response, timeKey);
            }

            $(`.${selectChatTextareaClass}`).html(updatedMessages);

            if (scrollDown) { // scroll chat textarea to the bottom in case of new msg
                const chatTextarea =
                    document.getElementsByClassName(selectChatTextareaClass)[0];
                chatTextarea.scrollTop = chatTextarea.scrollHeight;
            }
        }

        setTimeout(updateChatMessages, MILLISECONDS_IN_SECOND);

    }).fail((xhr, status, error) => { // ajax fail
        handleAjaxError(status + ' ' + xhr.status + ' ' + error);
    });
}

const getOneLineMessage = (response, timeKey) =>
    `<div>
        ${getTime(new Date(parseInt(timeKey)))}
        <b>${response[timeKey].name}:</b>
        ${addEmojiToMessage(response[timeKey].message)}
    </div>`;

const getTime = (date) =>
    '[' +
        timePart(date.getHours()) + ':' +
        timePart(date.getMinutes()) + ':' +
        timePart(date.getSeconds()) +
    '] ';

const timePart = (input) =>
    input <= 9 ? `0${input}` : input; // add zero if we have one digit


function addEmojiToMessage(message) {
    while (message.includes(SMILING_FACE_EMOJI) || message.includes(FROWNING_FACE_EMOJI)) {
        message = message.replace(
            SMILING_FACE_EMOJI, getEmoji(PATH_TO_SMILING_FACE_EMOJI_FILE)
        );
        message = message.replace(FROWNING_FACE_EMOJI, getEmoji());
    }

    return message;
}

const getEmoji = (path = PATH_TO_FROWNING_FACE_EMOJI_FILE) =>
    `<img class="emoji" src="${path}" alt="emoji">`;

function handleAjaxError(errorMsg) {
    localStorage.setItem('ajax_error', errorMsg.toLowerCase());
    window.location = 'error_page.php';
}