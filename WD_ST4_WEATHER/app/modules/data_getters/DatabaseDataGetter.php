<?php

namespace App\Modules\DataGetters;

use PDO;

class DatabaseDataGetter implements iDataGetter
{

    public function getWeatherForecast(array $config): array
    {
        $conn = $this->getConnection($config['dbConfig']);

        $sql = 'SELECT 
                forecast.timestamp, 
                forecast.temperature, 
                forecast.rain_possibility,
                forecast.clouds
                FROM forecast;';

        $stm = $conn->query($sql);

        $rawForecastArray = $stm->fetchAll(PDO::FETCH_ASSOC);

        if ($rawForecastArray === false) {
            throw new \Exception('An error occurred "Database is corrupted"');
        }

        return $rawForecastArray;
    }


    private function getConnection(array $dbConfig): PDO
    {
        $connection = new PDO(
            'mysql:host=' . $dbConfig['serverName'] . ';dbname=' . $dbConfig['dbName'],
             $dbConfig['userName'],
             $dbConfig['password']
        );

        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $connection;
    }

}
