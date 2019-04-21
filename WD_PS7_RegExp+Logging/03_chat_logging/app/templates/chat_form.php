<button type="button" class="login-out-button">Log out</button>
<?php
if (!isset($_SESSION['welcome_message'])) {
    $_SESSION['welcome_message'] = 1;
    echo '<div class="welcome-message">Hello Friend!</div>';
}
?>
<h1 class="chat-logo">Easy Chat</h1>
<div class="chat">
  <div class="chat__textarea"></div>
  <form class="chat__form">
    <input type="text" class="chat__input chat__input-text">
    <input type="submit" class="chat__input chat__input-submit" value="Send">
  </form>
</div>