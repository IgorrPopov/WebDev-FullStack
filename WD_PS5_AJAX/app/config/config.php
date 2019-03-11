<?php

const JSON_AUTH_FILE_NAME = 'auth_database.json';
const JSON_CHAT_FILE_NAME = 'chat_database.json';

const MILLISECONDS_IN_HOUR = 3600000;
const MAX_INPUT_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 120;

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
