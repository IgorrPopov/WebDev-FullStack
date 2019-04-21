<?php
session_start();


if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['router'])) {
    http_response_code(404);
    die();
}


$route = $_POST['router'];

if ($route === 'auth' || $route === 'chat') {

    $config = require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'config' .
        DIRECTORY_SEPARATOR .
        'config.php';

    require_once $config['pathToHandlersHeader'];

    require_once $config[($route === 'auth') ? 'pathToHandlerAuth' : 'pathToHandlerChat'];

} else { // in case if user change 'router' value for some reason
    http_response_code(404);
}
