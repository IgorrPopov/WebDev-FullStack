<?php

namespace App\Modules\DataGetters;

class JsonDataGetter implements iDataGetter
{

    public function getWeatherForecast(array $config): array
    {
        $jsonString = file_get_contents($config['pathToJsonStorage']);
        // we can get zero as a string if json is valid but empty
        if ($jsonString === false) {
            throw new \Exception('An error occurred "No access to the database"');
        }

        $weatherForecast = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('An error occured "The database is corrupted"');
        }

        return $weatherForecast;
    }

}
