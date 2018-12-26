<?php
include_once '../app/JsonSongsCounter.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['song'])) {
        $counter = new JsonSongsCounter('../app/json/dio_top_songs.json');
        $song = checkInput($_POST['song']);
        $counter->voteForSong($song);
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
