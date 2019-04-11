<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['router'])) {
    header('Location: ../');
    die();
}

$route = $_POST['router'];

if ($route === 'auth' || $route === 'chat') {

    require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        'handlers_header.php';

    require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        (($route === 'auth') ? 'handler_auth.php' : 'handler_chat.php');

} else { // in case if user change 'router' value for some reason
    header('Location: ../');
}
