<?php

use App\Modules\DataAdapters\DataAdapterStaticFactory;
use App\Modules\DataGetters\DataGetterStaticFactory;

require_once $config['pathToModulesLoader'];


$dataSourceType = $_GET['data_source_type'];

try {

    $dataGetter = (new DataGetterStaticFactory())::factory($dataSourceType);

    $rawForecastArray = $dataGetter->getWeatherForecast($config);


    if (!count($rawForecastArray)) {
        throw new \Exception('An error occurred "Data source is empty"');
    }


    echo json_encode(
        (new DataAdapterStaticFactory())::factory($dataSourceType)-> getAdaptedWeatherForecast($rawForecastArray, $config)
    );

} catch (Exception $exception) {

    http_response_code(500);

    echo json_encode(['error_message' => $exception->getMessage()]);

}
