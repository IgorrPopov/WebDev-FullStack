<?php

return [
    'millisecondsInHour' => 3600000,

    'microsecondsInMillisecond' => 1000,

    'maxPassOrNameLength' => 25,

    'maxMessageLength' => 500,

    'pathToJsonAuthFile' =>
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'database' .
        DIRECTORY_SEPARATOR .
        'auth_database.json',

    'pathToJsonChatFile' =>
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'database' .
        DIRECTORY_SEPARATOR .
        'chat_database.json',

    'pathToModulesLoader' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'modules_loader' .
        DIRECTORY_SEPARATOR .
        'modules_loader.php'
];
