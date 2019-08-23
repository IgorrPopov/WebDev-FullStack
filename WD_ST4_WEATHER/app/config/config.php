<?php

return [

    'dataSourceTypes' => ['json', 'database', 'api'],

    'forecastArrayLength' => 7,

    'apiUrl' => 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/324291',

    'apiRequestQuery' => [
        'language' => 'en-us',
        'details' => 'false',
        'metric' => 'true',
        'apikey' => 'ukGAODqauQ90orXmsQ4XnunciQ5UkKDg'
    ],

    'apiIcons' => [
        'iconsToImageReference' => [
            ['iconsNumbers' => [1, 2, 3, 4], 'iconImageName' => '002-sun'],
            ['iconsNumbers' => [5, 6], 'iconImageName' => '004-sky-1'],
            ['iconsNumbers' => [7, 8, 11], 'iconImageName' => '005-sky'],
            ['iconsNumbers' => [12, 13, 14, 18], 'iconImageName' => '003-rain'],
            ['iconsNumbers' => [15, 16, 17], 'iconImageName' => '001-flash']
        ],
        'defaultIconImageName' => '005-sky'
    ],

    'jsonIcons' => [
        'iconsToImageReference' => [
            'clear sky' => '002-sun',
            'broken clouds' => '005-sky',
            'light rain' => '003-rain',
            'moderate rain' => '003-rain',
            'few clouds' => '004-sky-1'
        ],
        'defaultIconImageName' => '005-sky'
    ],

    'dbIcons' => [
        'rainPossibilityLevelForDbAdapter' => 1,
        'lowCloudsLevel' => 16,
        'highCloudsLevel' => 22,
        'iconsToImageReference' => [
            'sun' => '002-sun',
            'brokenClouds' => '005-sky',
            'rain' => '003-rain',
            'fewClouds' => '004-sky-1'
        ],
        'defaultIconImageName' => '005-sky'
    ],

    'kelvinToCelsius' => function($klv){ return $klv - 273.15; },

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

    'pathToModulesLoader' =>
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'modules' .
        DIRECTORY_SEPARATOR .
        'modules_loader' .
        DIRECTORY_SEPARATOR .
        'modules_loader.php',

    'dbConfig' => [
        'serverName' => 'localhost',
        'dbName' => 'weather',
        'userName' => 'root',
        'password' => ''
    ]
];
