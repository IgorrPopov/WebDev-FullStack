<?php

return [
    'millisecondsInHour' => 3600000,

    'microsecondsInMillisecond' => 1000,

    'maxPassOrNameLength' => 25,

    'maxMessageLength' => 500,

    'pathToModulesLoader' =>
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'modules_loader' .
        DIRECTORY_SEPARATOR .
        'modules_loader.php'
];
