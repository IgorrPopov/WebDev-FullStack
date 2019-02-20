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

$songsCounter = new module\JsonSongsCounter(PATH_TO_JSON_FILE);

if (!$songsCounter->validateJsonFile()) {
    $songsCounter->createJsonFile(DEFAULT_JSON_FILE_CONTENT);
}

$songsCounter->readJson();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Vote</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div class="vote-page"></div>
<div class="vote-form">
  <h1>Choose your favorite Ronnie James Dio song from his top 10 tracks</h1>
  <form action="../app/handler/handler.php" method="post">
    <div class="vote-form__options">
        <?= $songsCounter->createVoteOptions(); ?>
    </div><br>
    <input type="submit" name="submit" value="Vote" class="button">
  </form>
</div>
</body>
</html>