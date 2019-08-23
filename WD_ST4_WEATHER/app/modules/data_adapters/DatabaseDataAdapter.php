<?php

namespace App\Modules\DataAdapters;

class DatabaseDataAdapter implements iDataAdapter
{

    public function getAdaptedWeatherForecast(array $rawForecastArray, array $config): array
    {

        if (count($rawForecastArray) > $config['forecastArrayLength']) {
            $rawForecastArray = array_slice($rawForecastArray, 0, $config['forecastArrayLength']);
        }

        $adaptedForecastArray = array_map(function ($rawHourlyForecastElement) use ($config) {

            $adaptedHourlyForecastElement['date_and_time'] = $rawHourlyForecastElement['timestamp'];
            $adaptedHourlyForecastElement['temperature'] = (int) round($rawHourlyForecastElement['temperature']);
            $adaptedHourlyForecastElement['weather_icon'] = $this->getWeatherIconNameForDatabase(
                [
                    'clouds' => $rawHourlyForecastElement['clouds'],
                    'rain_possibility' => $rawHourlyForecastElement['rain_possibility']
                ], $config
            );

            return $adaptedHourlyForecastElement;

        }, $rawForecastArray);


        return $adaptedForecastArray;

    }


    private function getWeatherIconNameForDatabase(array $weatherDescription, array $config): string
    {
        if ($weatherDescription['rain_possibility'] >= $config['dbIcons']['rainPossibilityLevelForDbAdapter']) {
            return $config['dbIcons']['iconsToImageReference']['rain'];
        }

        $cloudsLevel = $weatherDescription['clouds'];

        if ($cloudsLevel <= $config['dbIcons']['lowCloudsLevel']) {
            return $config['dbIcons']['iconsToImageReference']['sun'];
        }

        if ($cloudsLevel > $config['dbIcons']['lowCloudsLevel'] && $cloudsLevel < $config['dbIcons']['highCloudsLevel']) {
            return $config['dbIcons']['iconsToImageReference']['fewClouds'];
        }

        if ($cloudsLevel >= $config['dbIcons']['highCloudsLevel']) {
            return $config['dbIcons']['iconsToImageReference']['brokenClouds'];
        }

        return $config['dbIcons']['defaultIconImageName'];
    }
}
