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
  <form action="validator.php" method="post">
    <select name="song">
      <option value="stargazer">
        "Stargazer" by Rainbow (Rising 1976)
      </option>
      <option value="holy_diver">
        "Holy Diver" by Dio (Holy Diver 1983)
      </option>
      <option value="heaven_and_hell">
        "Heaven and Hell" by Black Sabbath (Heaven and Hell 1980)
      </option>
      <option value="rainbow_in_the_dark">
        "Rainbow in the Dark" by Dio (Holy Diver 1983)
      </option>
      <option value="stars">
        "Stars" by Hear'n Aid (Stars single 1986)
      </option>
      <option value="man_on_the_silver_mountain">
        "Man on the Silver Mountain" by Rainbow (Ritchie Blackmore’s Rainbow 1975)
      </option>
      <option value="the_last_in_line">
        "The Last in Line" by Dio (The Last in Line 1984)
      </option>
      <option value="we_rock">
        "We Rock" by Dio (The Last in Line 1984)
      </option>
      <option value="stand_up_and_shout">
        "Stand Up and Shout" by Dio (Holy Diver 1983)
      </option>
      <option value="neon_knights">
        "Neon Knights" by Black Sabbath (Heaven and Hell 1980)
      </option>
    </select>
    <input type="submit" name="submit" value="Vote" class="button">
  </form>
</div>
</body>
</html>