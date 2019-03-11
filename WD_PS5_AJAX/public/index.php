<?php session_start() ?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0,
      maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Easy Chat</title>
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body>
    <header class="header">
      <div class="top-line"></div>
    </header>
    <div class="chat-wrapper">
      <?php
      require_once
          dirname(__DIR__) .
          DIRECTORY_SEPARATOR .
          'app' .
          DIRECTORY_SEPARATOR .
          'templates' .
          DIRECTORY_SEPARATOR .
          (isset($_SESSION['logged_in_user']) ? 'chat_form.php' : 'login_form.php');
      ?>
    </div>
    <script src="js/jquery-3.3.1.js"></script>
    <script src="js/auth_script.js"></script>
    <script src="js/chat_script.js"></script>
  </body>
</html>
