<?php
session_start();

require_once 'actions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && count($_REQUEST)) {
    end($_REQUEST);
    $task = checkInput(key($_REQUEST));
    $_SESSION[$task] = selectFunctionByTaskName($task);
}

header('Location: index.php');
