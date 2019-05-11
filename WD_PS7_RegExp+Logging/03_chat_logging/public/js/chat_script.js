const PATH_TO_FROWNING_FACE_EMOJI_FILE = 'emoji/frowning_face.png';
const PATH_TO_SMILING_FACE_EMOJI_FILE = 'emoji/smiling_face.png';

const MILLISECONDS_IN_SECOND = 1000;

const MATCH_FROWNING_FACE_EMOJI = /:\(/g;
const MATCH_SMILING_FACE_EMOJI = /:\)/g;

const selectChatInputTextClass = 'chat__input-text';
const selectFormChatClass = 'chat__form';
const selectChatTextareaClass = 'chat__textarea';
const selectEmptyMessageClass = 'empty-message';
const selectChatInputSubmitClass = 'chat__input-submit';

$(() => {
    if (userId !== 'none') {
        printLog(new Logger('info', 'chat page loaded', 'chat page main script', 'none'));
    }

    const $chatInput = $(`.${selectChatInputTextClass}`);
    const $chatForm = $(`.${selectFormChatClass}`);


    // downloading chat messages that already have been sent when the page is loading
    if ($chatForm.length) {
        updateChatMessages('first_launch');
    }


    // new message send logic
    $chatForm.on('submit', (event) => {

        event.preventDefault();

        const service = 'send a new message';

        $.post(PATH_TO_AUTH_ROUTER, {
            router: 'chat',
            new_message: $chatInput.val(),
        }, (response) => {

            if (response.status === 'success') {
                const logMsg = 'the new message successfully sent to the server';
                printLog(new Logger('info', logMsg, service, response.log));

                $(`.${selectEmptyMessageClass}`).remove();

                updateChatMessages('new_message');
            } else if (response.exception) {
                const logMsg = 'internal server error';
                printLog(new Logger('error', logMsg, service, response.log, '500'));

                handleServerError(response.exception);
            } else { // handler gave us some input errors
                const logMsg = 'invalid user input message';
                printLog(new Logger('warning', logMsg, service, response.log));

                $(`.${selectEmptyMessageClass}`).remove();
                $(`.${selectChatInputSubmitClass}`).after(
                    `<p class="${selectEmptyMessageClass}">${response.invalid_msg}</p>`
                );
            }

            $chatInput.val('');

        }, 'json').fail((xhr, status, error) => { // ajax fail
            const logMsg = 'server is not available';
            printLog(new Logger('error', logMsg, service, 'none', xhr.status));

            handleServerError(status + ' ' + xhr.status + ' ' + error);
        });
    });
});

function updateChatMessages(updateOption = 'not_new_message') {

    const service = 'update chat messages';

    $.post(PATH_TO_AUTH_ROUTER, {
        router: 'chat',
        load_chat: 'load_chat',
        update_option: updateOption
    }, (response) => {

        if (response.status === 'success' && response.messages) {
            const $chatTextarea = $(`.${selectChatTextareaClass}`);

            let updatedMessages = '';
            response.messages.forEach(msgObj => updatedMessages += getOneLineMessage(msgObj));
            $chatTextarea.html(updatedMessages);

            // scroll chat textarea to the bottom in case of a new msg
            if (updateOption === 'new_message') {
                $chatTextarea.scrollTop($chatTextarea[0].scrollHeight);
            }

            const logMsg = "chat's messages for the last hour successfully updated";
            printLog(new Logger('info', logMsg, service, response.log));

        } else if (response.exception) { // backend trow an exception
            const logMsg = 'internal server error';
            printLog(new Logger('error', logMsg, service, response.log, '500'));

            handleServerError(response.exception);
        }


        if (updateOption === 'not_new_message' || updateOption === 'first_launch'
            && !response.exception) { // if exception stop update the chat
            setTimeout(updateChatMessages, MILLISECONDS_IN_SECOND);
        }

    }, 'json').fail((xhr, status, error) => { // ajax fail
        const logMsg = 'server is not available';
        printLog(new Logger('error', logMsg, service, 'none', xhr.status));

        handleServerError(status + ' ' + xhr.status + ' ' + error);
    });
}

const getOneLineMessage = (messageObj) =>
    `<div>
        ${getTime(new Date(messageObj.time))}
        <b>${messageObj.name}:</b>
        ${messageObj.message
            .replace(MATCH_FROWNING_FACE_EMOJI, getEmoji())
            .replace(MATCH_SMILING_FACE_EMOJI, getEmoji(PATH_TO_SMILING_FACE_EMOJI_FILE))
         }
    </div>`;

const getTime = (date) =>
    '[' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0') + ':' +
        date.getSeconds().toString().padStart(2, '0') +
    '] ';

const getEmoji = (path = PATH_TO_FROWNING_FACE_EMOJI_FILE) =>
    `<img class="emoji" src="${path}" alt="emoji">`;