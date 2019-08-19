<?php

namespace App\Modules\DataGetters;


class ApiDataGetter implements iDataGetter
{

    public function getWeatherForecast(array $config): array
    {

        $url = $config['apiUrl'];
        $query = $config['apiRequestQuery'];

        $options = ['http' => [
                'method' => 'GET',
                'header' => 'Content-Type: application/json',
                'content' => http_build_query($query)
            ]
        ];

        $context = stream_context_create($options);


        $jsonString = file_get_contents($url, false, $context);


        if ($jsonString === false) {
            throw new \Exception('An error occurred');
        }

        $weatherForecast = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('An error occured');
        }

        return $weatherForecast;

    }
}