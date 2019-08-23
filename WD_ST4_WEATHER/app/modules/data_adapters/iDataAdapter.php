<?php

namespace App\Modules\DataAdapters;

interface iDataAdapter
{
    public function getAdaptedWeatherForecast(array $rawForecastArray, array $config): array;
}
