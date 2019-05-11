const CONFIG = [
    {
        input_id: 'ip',
        input_js_class: 'form__js-flag--ip',
        input_php_class: 'form__php-flag--ip',
        regex_for_js: /^((0|25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)\.){3}(0|25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)$/
    },
    {
        input_id: 'url',
        input_js_class: 'form__js-flag--url',
        input_php_class: 'form__php-flag--url',
        regex_for_js: /^https?:\/\/(www\.)?[\w-.]{2,256}\.[a-z]{2,6}\b(\/[\w-@:%+.~#?&\/=]*)?$/
    },
    {
        input_id: 'email',
        input_js_class: 'form__js-flag--email',
        input_php_class: 'form__php-flag--email',
        regex_for_js: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    {
        input_id: 'date',
        input_js_class: 'form__js-flag--date',
        input_php_class: 'form__php-flag--date',
        regex_for_js: /^(02\/(0[1-9]|[1-2][0-9])|(11|0[469])\/(0[1-9]|[1-2]\d|30)|(1[02]|0[13578])\/(0[1-9]|[1-2]\d|3[01]))\/\d{4}$/
    },
    {
        input_id: 'time',
        input_js_class: 'form__js-flag--time',
        input_php_class: 'form__php-flag--time',
        regex_for_js: /^([0-1]\d|2[0-3])(:[0-5]\d){2}$/
    }
];

const selectFormClass = 'form';

$(() => {
    // for js form validation
    CONFIG.forEach(element => validateInputJs(element));


    // for php form validation
    const $form = $(`.${selectFormClass}`);

    $form.on('submit', (e) => {
        e.preventDefault();

        $.post('./router/router.php', $form.serialize(), (response) => {
            CONFIG.forEach(element => printInputValidationForPHP(element, response));
        }, 'json').fail((xhr) => { // ajax fail
            handleServerError(xhr.status);
        });

    });
});

function validateInputJs(element) {
    const $input = $(`#${element.input_id}`);

    $input.keyup(() => {
        $(`.${element.input_js_class}`).css('background-color',
            (($input.val().match(element.regex_for_js)) ? 'green' : 'red'));
    });
}

const printInputValidationForPHP = (element, response) =>
    $(`.${element.input_php_class}`).css('background-color',
        ((response[element.input_id] === 'pass')) ? 'green' : 'red');

function handleServerError(errorMsg) {
    swal({ // using sweetalert)
        title: "Sorry, our server is temporarily unavailable! Please try again later",
        text: errorMsg.toString(),
        icon: "error",
        button: "Oh no, not again!!",
    });
}