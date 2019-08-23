<?php

namespace App\Modules\DataGetters;

class JsonDataGetter implements iDataGetter
{

    public function getWeatherForecast(array $config): array
    {
        $jsonString = file_get_contents($config['pathToJsonStorage']);

        if ($jsonString === false) {
            throw new \Exception('An error occurred "No access to the json file"');
        }

        $weatherForecast = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('An error occured "The json file is corrupted"');
        }

        return $weatherForecast;
    }

}
