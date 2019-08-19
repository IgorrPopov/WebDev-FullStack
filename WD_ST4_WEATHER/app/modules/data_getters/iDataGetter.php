<?php

namespace App\Modules\DataGetters;


interface iDataGetter
{
    public function getWeatherForecast(array $config): array;
}