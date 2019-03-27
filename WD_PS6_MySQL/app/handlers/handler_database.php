<?php

$dbConfig =
    require_once
    dirname(__DIR__, 1) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'db_config.php';

try {
    $connection = new PDO(
        'mysql:host=' . $dbConfig['serverName'] . ';dbname=' . $dbConfig['databaseName'],
        $dbConfig['userName'],
        $dbConfig['password']
    );

    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $exception) {
    $response['status'] = 'fail';
    $response['exception'] = $exception->getMessage();

    $connection = null;

    echo json_encode($response);

    die();
}
