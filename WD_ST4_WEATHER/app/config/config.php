<?php

return [

    'dataSourceType' => ['json', 'database', 'api'],

    'apiUrl' => 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/324291',

    'apiRequestQuery' => [
        'language' => 'en-us',
        'details' => 'false',
        'metric' => 'true',
        'apikey' => 'ukGAODqauQ90orXmsQ4XnunciQ5UkKDg'
    ],

    'pathToJsonStorage' =>
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'data' .
        DIRECTORY_SEPARATOR .
        'today.json',

    'pathToHandler' =>
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'handler.php',

    'dbConfig' => [
            'serverName' => 'localhost',
            'dbName' => 'weather',
            'userName' => 'root',
            'password' => ''
        ]
];
