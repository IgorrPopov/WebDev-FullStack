<?php

namespace App\Modules\DataAdapters;

class JsonDataAdapter implements iDataAdapter
{

    public function getAdaptedWeatherForecast(array $rawForecastArray, array $config): array
    {
        $rawForecastArray = $rawForecastArray['list'];


        if (count($rawForecastArray) > $config['forecastArrayLength']) {
            $rawForecastArray = array_slice($rawForecastArray, 0, $config['forecastArrayLength']);
        }


        $adaptedForecastArray = array_map(function ($rawHourlyForecastElement) use ($config) {

            $adaptedHourlyForecastElement['date_and_time'] = $rawHourlyForecastElement['dt_txt'];

            $adaptedHourlyForecastElement['temperature'] = (int) round(
                $config['kelvinToCelsius']($rawHourlyForecastElement['main']['temp'])
            );

            $adaptedHourlyForecastElement['weather_icon'] =
                $config['jsonIcons']['iconsToImageReference'][$rawHourlyForecastElement['weather'][0]['description']]
                ?? $config['jsonIcons']['defaultIconImageName'];

            return $adaptedHourlyForecastElement;

        }, $rawForecastArray);


        return $adaptedForecastArray;
    }

}
