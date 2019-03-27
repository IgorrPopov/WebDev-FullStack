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
        updateChatMessages();
    }


    // new message send logic
    $chatForm.on('submit', (event) => {

        event.preventDefault();

        $.post(PATH_TO_AUTH_ROUTER, {
            router: 'chat',
            new_message: $chatInput.val()
        }, (response) => {
            response = JSON.parse(response);

            if (response.status === 'success') {
                $(`.${selectEmptyMessageClass}`).remove();

                updateChatMessages(true);
            } else if (response.exception) {
                handleServerError(response.exception);
            } else { // handler gave us some input errors
                $(`.${selectEmptyMessageClass}`).remove();
                $(`.${selectChatInputSubmitClass}`).after(
                    `<p class="${selectEmptyMessageClass}">${response.invalid_message}</p>`
                );
            }

            $chatInput.val('');

        }).fail((xhr, status, error) => { // ajax fail
            handleServerError(status + ' ' + xhr.status + ' ' + error);
        });
    });
});

function updateChatMessages(newMessage = false) {

    $.post(PATH_TO_AUTH_ROUTER, {
        router: 'chat',
        load_chat: 'load_chat'
    }, (response) => {
        response = JSON.parse(response);

        if (response.status === 'success' && response.messages) {
            let updatedMessages = '';

            for (let index in response.messages) {
                updatedMessages += getOneLineMessage(response.messages[index]);
            }

            $(`.${selectChatTextareaClass}`).html(updatedMessages);


            // scroll chat textarea to the bottom in case of a new msg
            if (newMessage) {
                const chatTextarea =
                    document.getElementsByClassName(selectChatTextareaClass)[0];
                chatTextarea.scrollTop = chatTextarea.scrollHeight;
            }
        } else if (response.exception) { // backend trow an exception
            handleServerError(response.exception);
        }


        if (!newMessage && !response.exception) { // if exception stop update the chat
            setTimeout(updateChatMessages, MILLISECONDS_IN_SECOND);
        }

    }).fail((xhr, status, error) => { // ajax fail
        handleServerError(status + ' ' + xhr.status + ' ' + error);
    });
}

const getOneLineMessage = (messageObj) =>
    `<div>
        ${getTime(new Date(messageObj.time))}
        <b>${messageObj.name}:</b>
        ${addEmojiToMessage(messageObj.message)}
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