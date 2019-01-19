<?php

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

include_once PATH_TO_JSON_COUNTER_CLASS;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['song'])) {
        $counter = new JsonSongsCounter(PATH_TO_JSON_FILE);
        $song = checkInput($_POST['song']);
        if (!$counter->voteForSong($song)) {
            header('Location: 404.html'); // if json doesn't have transferred song
            die();
        }
        $counter->writeJson();
    }
}

function checkInput($song)
{
    $song = trim($song);
    $song = stripslashes($song);
    $song = htmlspecialchars($song);
    return $song;
}

header('Location: pie_chart.php');
