<?php

return [
    'maxPassOrNameLength' => 25,

    'maxMessageLength' => 500,

    'pathToModulesLoader' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'modules_loader' .
        DIRECTORY_SEPARATOR .
        'modules_loader.php',

    'pathToHandlersHeader' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        'handlers_header.php',

    'pathToHandlerAuth' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        'handler_auth.php',

    'pathToHandlerChat' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        'handler_chat.php',

    'pathToChatTemplate' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'templates' .
        DIRECTORY_SEPARATOR .
        'chat_form.php',

    'pathToLoginTemplate' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'templates' .
        DIRECTORY_SEPARATOR .
        'login_form.php'
];
