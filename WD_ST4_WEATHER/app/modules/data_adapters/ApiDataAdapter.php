<?php

namespace App\Modules\DataAdapters;

class ApiDataAdapter implements iDataAdapter
{

    public function getAdaptedWeatherForecast(array $rawForecastArray, array $config): array
    {

        if (count($rawForecastArray) > $config['forecastArrayLength']) {
            $rawForecastArray = array_slice($rawForecastArray, 0, $config['forecastArrayLength']);
        }


        $adaptedForecastArray = array_map(function ($rawHourlyForecastElement) use ($config) {

            $adaptedHourlyForecastElement['date_and_time'] = $rawHourlyForecastElement['DateTime'];
            $adaptedHourlyForecastElement['temperature'] = (int) round($rawHourlyForecastElement['Temperature']['Value']);
            $adaptedHourlyForecastElement['weather_icon'] =
                $this->getWeatherIconNameForApi($rawHourlyForecastElement['WeatherIcon'], $config);

            return $adaptedHourlyForecastElement;

        }, $rawForecastArray);


        return $adaptedForecastArray;

    }


    private function getWeatherIconNameForApi(int $iconNumber, array $config): string {

        foreach ($config['apiIcons']['iconsToImageReference'] as $val) {
            if (in_array($iconNumber, $val['iconsNumbers'], true)) {
                return $val['iconImageName'];
            }
        }

        return $config['apiIcons']['defaultIconImageName'];

    }

}
