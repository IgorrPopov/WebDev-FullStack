const WELCOME_MESSAGE = 'Hello Friend!';

const PATH_TO_AUTH_HANDLER = '../app/handlers/handler_auth.php';

const TIME_DELAY = 2000;

const selectLoginFormClass = 'login-form';
const selectLoginFormNameClass = 'login-form__name';
const selectLoginFormPasswordClass = 'login-form__password';
const selectInputErrorClass = 'input-error';
const selectErrorMessageClass = 'error-message';
const selectWelcomeMessageClass = 'welcome-message';
const selectChatFormClass = 'chat__form';
const selectLoginOutButtonClass = 'login-out-button';

const getClassNameByInputName = {
    name: selectLoginFormNameClass,
    password: selectLoginFormPasswordClass
};

$(() => {
    const $welcomeMessage = $(`.${selectWelcomeMessageClass}`);

    $welcomeMessage.fadeIn(TIME_DELAY);
    setTimeout(() => $welcomeMessage.fadeOut(TIME_DELAY), TIME_DELAY);

    $(`.${selectLoginFormClass}`).on('submit', (event) => {

        event.preventDefault();

        $.post(PATH_TO_AUTH_HANDLER, {
            name: $(`.${selectLoginFormNameClass}`).val(),
            password: $(`.${selectLoginFormPasswordClass}`).val(),
            submit: 'submit'
        }, (errorResponse) => {
            if (errorResponse) { // handler gave us some errors
                errorResponse = JSON.parse(errorResponse);
                highlightInputErrors(errorResponse);
                addErrorsMessages(errorResponse);
            } else { // no errors
                location.reload();
            }
        });
    });

    $(`.${selectLoginOutButtonClass}`).on('click', () => {
        $.post(PATH_TO_AUTH_HANDLER, {
            log_out: 'log_out'
        }, () => {
            location.reload();
        });
    });
});

function highlightInputErrors(errors) {
    $(`.${selectLoginFormNameClass}, .${selectLoginFormPasswordClass}`)
        .removeClass(selectInputErrorClass);

    for (let inputName in errors) {
        $(`.${getClassNameByInputName[inputName]}`).addClass(selectInputErrorClass);
    }
}

function addErrorsMessages(errors) {
    $(`.${selectErrorMessageClass}`).remove();

    for (let inputName in errors) {
        const $input = $(`.${getClassNameByInputName[inputName]}`);
        $input.after(`<p class="${selectErrorMessageClass}">${errors[inputName]}</p>`);
        $input.val('');
    }
}

function printWelcomeMessage() {
    $(`.${selectChatFormClass}`)
        .after(`<div class="${selectWelcomeMessageClass}">${WELCOME_MESSAGE}</ div>`);

    setTimeout(() => {
        $(`.${selectWelcomeMessageClass}`).fadeOut();
    }, 2000);
}

