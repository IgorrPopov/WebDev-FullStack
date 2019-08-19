<?php

$config = require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';


if (isset($_GET['data_source_type']) && in_array($_GET['data_source_type'], $config['dataSourceType'])) {

    require_once $config['pathToHandler'];

} else {
// do something
}