<?php
session_start();

if (isset($_POST['router']) && $_POST['router'] === 'auth' || $_POST['router'] === 'chat') {
    require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'handlers' .
        DIRECTORY_SEPARATOR .
        (($_POST['router'] === 'auth') ? 'handler_auth.php' : 'handler_chat.php');
}
