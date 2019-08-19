<?php

namespace App\Modules\DataGetters;

use PDO;

class DatabaseDataGetter implements iDataGetter
{

    private $dbConfig;

    public function getWeatherForecast(array $config): array
    {
        $this->dbConfig = $config['dbConfig'];

        $conn = $this->getConnection();

        $sql = 'SELECT 
                forecast.timestamp, 
                forecast.temperature, 
                forecast.rain_possibility,
                forecast.clouds
                FROM forecast;';

        $stm = $conn->query($sql);

        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    private function getConnection() {
        $connection = new PDO(
            'mysql:host=' . $this->dbConfig['serverName'] . ';dbname=' . $this->dbConfig['dbName'],
             $this->dbConfig['userName'],
             $this->dbConfig['password']
        );

        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $connection;
    }

}
