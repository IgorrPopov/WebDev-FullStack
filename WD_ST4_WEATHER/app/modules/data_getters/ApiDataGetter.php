<?php

namespace App\Modules\DataGetters;

class ApiDataGetter implements iDataGetter
{

    public function getWeatherForecast(array $config): array
    {

        $url = $config['apiUrl'];
        $query = http_build_query($config['apiRequestQuery']);

        $jsonString = file_get_contents($url . '?' . $query);


        if ($jsonString === false) {
            throw new \Exception('An error occurred "No access to the API"');
        }

        $weatherForecast = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('An error occured "API response is corrupted"');
        }

        return $weatherForecast;

    }

}
