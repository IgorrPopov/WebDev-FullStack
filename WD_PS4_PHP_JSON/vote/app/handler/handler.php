<?php
include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

include_once PATH_TO_JSON_COUNTER_CLASS;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['song'])) {
        $counter = new module\JsonSongsCounter(PATH_TO_JSON_FILE);

        if (!$counter->validateJsonFile()) {
            $counter->createJsonFile(DEFAULT_JSON_FILE_CONTENT);
        }

        $counter->readJson();

        $song = trim($_POST['song']);
        $song = stripslashes($song);
        $song = htmlspecialchars($song);

        if (!$counter->voteForSong($song)) {
            header('Location: ../../web/404.html'); // if json doesn't have transferred song
            die();
        }
        $counter->writeJson();
    }
}

header('Location: ../../web/pie_chart.php');
