<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' &&
    isset($_POST['action']) &&
    in_array($_POST['action'], ['load_old_balloons', 'add_new_balloon', 'delete_balloon', 'change_balloon_text', 'move_balloon'])) {

    $config = require_once
        dirname(__DIR__, 2) .
        DIRECTORY_SEPARATOR .
        'app' .
        DIRECTORY_SEPARATOR .
        'config' .
        DIRECTORY_SEPARATOR .
        'config.php';

    $balloons = json_decode(file_get_contents($config['pathToJsonStorage']), true);

    $post = array_map(function ($element) {
        return htmlspecialchars(stripslashes(trim($element)));
    }, $_POST);

    require_once $config['pathToScript'];

} else {

    http_response_code(404);

}
