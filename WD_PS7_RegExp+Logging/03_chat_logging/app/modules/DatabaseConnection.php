<?php
namespace app\modules;

use PDO;

class DatabaseConnection
{
    // our single PDO connection
    private static $connection;

    // this method prevents creating instance of this class
    private function __construct()
    {
    }

    // this method gives to us single instance of the $connection field
    public static function getConnection($dbConfig = false): PDO
    {
        if (self::$connection === null) {
            self::$connection = new PDO(
                'mysql:host=' . $dbConfig['serverName'] . ';dbname=' . $dbConfig['databaseName'],
                $dbConfig['userName'],
                $dbConfig['password']
            );

            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return self::$connection;
    }
}
