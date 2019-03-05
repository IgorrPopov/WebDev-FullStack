<?php

session_start();

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

include_once PATH_TO_JSON_COUNTER_CLASS;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['song'])) {
    try {
        $songsCounter = new module\JsonSongsCounter(
            PATH_TO_JSON_FILE,
            DEFAULT_JSON_FILE_CONTENT
        );

        $song = trim($_POST['song']);
        $song = stripslashes($song);
        $song = htmlspecialchars($song);

        $songsCounter->voteForSong($song);
    } catch (Exception $exception) {
        $_SESSION['error'] = $exception->getMessage();
        header('Location: ../../web/error_page.php');
        die();
    }
}

header('Location: ../../web/pie_chart.php');
