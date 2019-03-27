const PATH_TO_AUTH_ROUTER = './router/router.php';

const TIME_DELAY = 2000;

const selectLoginFormClass = 'login-form';
const selectLoginFormNameClass = 'login-form__name';
const selectLoginFormPasswordClass = 'login-form__password';
const selectInputErrorClass = 'input-error';
const selectErrorMessageClass = 'error-message';
const selectWelcomeMessageClass = 'welcome-message';
const selectLoginOutButtonClass = 'login-out-button';

const getClassNameByInputName = {
    name: selectLoginFormNameClass,
    password: selectLoginFormPasswordClass
};

$(() => {
    // show welcome message
    const $welcomeMessage = $(`.${selectWelcomeMessageClass}`);

    $welcomeMessage.fadeIn(TIME_DELAY);
    setTimeout(() => $welcomeMessage.fadeOut(TIME_DELAY), TIME_DELAY);


    // login logic
    $(`.${selectLoginFormClass}`).on('submit', (event) => {

        event.preventDefault();

        $.post(PATH_TO_AUTH_ROUTER, {
            router: 'auth',
            name: $(`.${selectLoginFormNameClass}`).val(),
            password: $(`.${selectLoginFormPasswordClass}`).val(),
            submit: 'submit'
        }, (response) => {
            response = JSON.parse(response);

            if (response.status === 'success') {
                location.reload();
            } else if (response.exception) { // backend trow an exception
                handleServerError(response.exception);
            } else { // handler gave us some input errors
                highlightInputErrors(response);
                addErrorsMessages(response);
            }

        }).fail((xhr, status, error) => { // ajax fail
            handleServerError(status + ' ' + xhr.status + ' ' + error);
        });
    });


    // login out logic
    $(`.${selectLoginOutButtonClass}`).on('click', () => {
        $.post(PATH_TO_AUTH_ROUTER, {
            router: 'auth',
            log_out: 'log_out'
        }, () => {
            location.reload();
        }).fail((xhr, status, error) => { // ajax fail
            handleServerError(status + ' ' + xhr.status + ' ' + error);
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

function handleServerError(errorMsg) {
    swal({ // using sweetalert)
        title: "Sorry, our server is temporarily unavailable! Please try again later",
        text: errorMsg.toUpperCase(),
        icon: "error",
        button: "Oh no, not again!!",
    });
}