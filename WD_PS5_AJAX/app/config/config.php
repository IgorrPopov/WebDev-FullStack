<?php

define('JSON_AUTH_FILE_NAME', 'auth_database.json');
define('JSON_CHAT_FILE_NAME', 'chat_database.json');

define('MILLISECONDS_IN_HOUR', 3600000);
define('MAX_INPUT_LENGTH', 20);
define('MAX_MESSAGE_LENGTH', 120);

define(
    'PATH_TO_JSON_AUTH_FILE',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'database' .
    DIRECTORY_SEPARATOR .
    JSON_AUTH_FILE_NAME
);

define(
    'PATH_TO_JSON_CHAT_FILE',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'database' .
    DIRECTORY_SEPARATOR .
    JSON_CHAT_FILE_NAME
);

define(
    'PATH_TO_AUTH_HANDLER',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'handlers' .
    DIRECTORY_SEPARATOR .
    'handler_auth.php'
);

define(
    'PATH_TO_CHAT_HANDLER',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'handlers' .
    DIRECTORY_SEPARATOR .
    'handler_chat.php'
);
