<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $config = require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'config' .
        DIRECTORY_SEPARATOR .
        'config.php';

    require_once $config['pathToScript'];
} else {
    http_response_code(404);
}
