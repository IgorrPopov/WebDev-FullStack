<?php

use App\Modules\DataGetters\DataGetterStaticFactory;

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'data_getters'.
    DIRECTORY_SEPARATOR .
    'iDataGetter.php';

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'data_getters'.
    DIRECTORY_SEPARATOR .
    'JsonDataGetter.php';

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'data_getters'.
    DIRECTORY_SEPARATOR .
    'DatabaseDataGetter.php';

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'data_getters'.
    DIRECTORY_SEPARATOR .
    'ApiDataGetter.php';

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'data_getters'.
    DIRECTORY_SEPARATOR .
    'DataGetterStaticFactory.php';


$dataSourceType = $_GET['data_source_type'];

$weatherFactory = new DataGetterStaticFactory();

try {

    $dataSource = $weatherFactory::factory($dataSourceType);

    if ($dataSourceType === 'json') {
        echo json_encode(jsonAdapter($dataSource->getWeatherForecast($config)));
    } elseif ($dataSourceType === 'database') {
        echo json_encode(databaseAdapter($dataSource->getWeatherForecast($config)));
    } else {
        echo json_encode(apiAdapter($dataSource->getWeatherForecast($config)));
    }

} catch (Exception $exception) {
//    to do
}

// api
function apiAdapter(array $arr): array
{
    $result = array_slice($arr, 0,6);

    $result = array_map(function ($d) {

        $newD['date_and_time'] = $d['EpochDateTime'];
        $newD['temperature'] = (int) round($d['Temperature']['Value']);
        $newD['weather_icon'] = getWeatherIconNameForApi($d['WeatherIcon']);

        return $newD;

    }, $result);

    return $result;
}


function getWeatherIconNameForApi(int $iconNumber): string {
    if (in_array($iconNumber, [1, 2, 3, 4])) {
        return '002-sun';
    }

    if (in_array($iconNumber, [5, 6])) {
        return '004-sky-1';
    }

    if (in_array($iconNumber, [7, 8, 11])) {
        return '005-sky';
    }

    if (in_array($iconNumber, [12, 13, 14, 18])) {
        return '003-rain';
    }

    if (in_array($iconNumber, [15, 16, 17])) {
        return '001-flash';
    }

    return '005-sky';
}


// database
function databaseAdapter(array $arr): array
{
//    if (count($arr) >= 6) {
        $result = array_slice($arr, 0, 6);
//    }

    $result = array_map(function ($d) {
        $newD = [];

        $newD['date_and_time'] = strtotime($d['timestamp']);
        $newD['temperature'] = (int) round($d['temperature']);
        $newD['weather_icon'] = getWeatherIconNameForDatabase(
            ['clouds' => $d['clouds'], 'rain_possibility' => $d['rain_possibility']]
        );

        return $newD;

    }, $result);

    return $result;
}

function getWeatherIconNameForDatabase(array $weatherDescription): string
{
    if ($weatherDescription['rain_possibility'] >= 1) {
        return '003-rain';
    }

    $cloudsLevel = $weatherDescription['clouds'];

    if ($cloudsLevel <= 16) {
        return '002-sun';
    }

    if ($cloudsLevel > 16 && $cloudsLevel < 22) {
        return '004-sky-1';
    }

    if ($cloudsLevel >= 22) {
        return '005-sky';
    }

    return '001-flash';
}



// json
function jsonAdapter(array $arr): array
{
    $result = $arr['list'];

    if (count($result) > 6) {
        $result = array_slice($result, 0, 6);
    }

    $result = array_map(function ($d) {
        $newD = [];

        $newD['date_and_time'] = $d['dt'];
        $newD['temperature'] = (int) round($d['main']['temp'] - 273.15);
        $newD['weather_icon'] = getWeatherIconNameForJson($d['weather'][0]['description']);

        return $newD;

    }, $result);

    return $result;
}

function getWeatherIconNameForJson(string $weatherDescription): string
{
    switch ($weatherDescription) {
        case 'clear sky':
            return '002-sun';
        case 'broken clouds':
            return '005-sky';
        case 'light rain' :
            return '003-rain';
        case 'moderate rain' :
            return '003-rain';
        case 'few clouds':
            return '004-sky-1';
        default:
            return '001-flash';
    }
}
