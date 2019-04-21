<?php

use app\modules\DatabaseConnection;
use app\modules\ChatResponse;
use app\modules\ChatLogger;

$dbConfig = require_once
    dirname(__DIR__, 1) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'db_config.php';

require_once $config['pathToModulesLoader'];


$response = new ChatResponse();
$log = new ChatLogger($config['pathToChatLogger']);

try {
    $connection = DatabaseConnection::getConnection($dbConfig);
} catch (PDOException $exception) {
    $logMsg = 'attempt to connect to the database fail';
    $log->setLog('error', $logMsg, 'create connection to the db');

    $response->send(['exception' => $exception->getMessage(), 'log' => $log->getLog()]);
}
