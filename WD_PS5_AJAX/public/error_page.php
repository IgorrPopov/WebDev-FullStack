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
<button class="go-back-button" onclick="window.location = 'index.php'">
  Go back to the main page
</button>
<div class="chat-wrapper">
  <div class="server-error">
    <p class="server-error__msg">
      <script>
          const ajaxError = localStorage['ajax_error'];
          if (ajaxError) {
              document.
              getElementsByClassName('server-error__msg')[0].
              innerHTML = ajaxError;
          }
      </script>
      <?php
      if (isset($_SESSION['error'])) {
          // in case if user reload the page error massage will remain
          $_SESSION['previous_error'] = $_SESSION['error'];
          echo $_SESSION['error'];
          unset($_SESSION['error']);
      } elseif (isset($_SESSION['previous_error'])) {
          echo $_SESSION['previous_error'];
      }
      unset($_SESSION['logged_in_user']); // logout user if an error occurred
      unset($_SESSION['welcome_message']);
      ?><br>
    </p>
    Our chat is temporarily unavailable<br>
    We will fix the error soon
  </div>
</div>
</body>
</html>
