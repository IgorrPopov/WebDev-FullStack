<?php
session_start();

require_once 'actions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (count($_REQUEST)) {
        end($_REQUEST);
        $task = checkInput(key($_REQUEST));
        $_SESSION[$task] = FUNCTIONS[$task];
    }
}

$_SESSION['files_list'] = showFilesList();

$_SESSION['textarea_input'] = $_POST['textarea'];

header('Location: index.php');
