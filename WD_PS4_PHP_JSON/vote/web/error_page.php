<?php session_start() ?>

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
<div class="error">
  <h1>
    <?php
    if ($_SESSION['error'] === '404') {
        echo '<div class="error_404">404</div>';
    } else {
        echo $_SESSION['error'];
    }
    ?>
  </h1>
</div>
</body>
</html>
