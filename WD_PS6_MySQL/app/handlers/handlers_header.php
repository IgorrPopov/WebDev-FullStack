<?php

use app\modules\DatabaseConnection;
use app\modules\ChatResponse;

$config =
    require_once
        dirname(__DIR__) .
        DIRECTORY_SEPARATOR .
        'config' .
        DIRECTORY_SEPARATOR .
        'config.php';

$dbConfig =
    require_once
        dirname(__DIR__, 1) .
        DIRECTORY_SEPARATOR .
        'config' .
        DIRECTORY_SEPARATOR .
        'db_config.php';

require_once $config['pathToModulesLoader'];


$response = new ChatResponse();

try {
    $connection = DatabaseConnection::getConnection($dbConfig);
} catch (PDOException $exception) {
    $response->send(['exception' => $exception->getMessage()]);
}
