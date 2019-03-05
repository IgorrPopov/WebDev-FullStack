<?php
session_start();

if (isset($_SESSION['visits'])) {
    $_SESSION['visits']++;
} else {
    $_SESSION['visits'] = 1;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Warm up</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div class="counter">
<?= $_SESSION['visits']; ?>
</div>
<section class="task">
  <h1>TASK 1</h1>
  <p>Calculate the sum of numbers from -1000 to 1000</p>
  <form action="handler.php" method="post">
    <input type="submit" name="task1" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task1'])) {
        echo $_SESSION['task1'];
        unset($_SESSION['task1']);
    }
    ?>
  </div>
</section>
<section class="task">
  <h1>TASK 2</h1>
  <p>
    Calculate the sum of numbers from -1000 to 1000,
    adding only the numbers that end with 2, 3 and 7
  </p>
  <form action="handler.php" method="post">
    <input type="submit" name="task2" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task2'])) {
        echo $_SESSION['task2'];
        unset($_SESSION['task2']);
    }
    ?>
  </div>
</section>
<section class="task">
  <h1>TASK 3</h1>
  <p>File upload</p>
  <form action="handler.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="MAX_FILE_SIZE" value="2048000000">
    <input type="file" name="file">
    <input type="submit" name="task3" value="Upload">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task3'])) {
        echo $_SESSION['task3'];
        unset($_SESSION['task3']);
    }
    ?>
  </div>
  <div class="links-list"></div>
</section>
<section class="task">
  <h1>TASK 4</h1>
  <p>Chessboard</p>
  <form action="handler.php" method="post">
    <input type="text" placeholder="rows" name="rows">
    <input type="text" placeholder="columns" name="columns">
    <input type="submit" name="task4" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task4']) && preg_match('/chessboard/', $_SESSION['task4'])) {
        $response = explode(' ', $_SESSION['task4']);
        echo '<div class="' .
            $response[0] . '" id="' . $response[1] . 'x' . $response[2] . '"></ div>';
        unset($_SESSION['task4']);
    } elseif (isset($_SESSION['task4'])) {
        echo $_SESSION['task4'];
        unset($_SESSION['task4']);
    }
    ?>
  </div>
</section>
<section class="task">
  <h1>TASK 5</h1>
  <p>Find the sum of the digits of the entered number</p>
  <form action="handler.php" method="post">
    <input type="text" placeholder="your number" name="number">
    <input type="submit" name="task5" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task5'])) {
        echo $_SESSION['task5'];
        unset($_SESSION['task5']);
    }
    ?>
  </div>
</section>
<section class="task">
  <h1>TASK 6</h1>
  <p>
    Generate an array of random integers from 1 to 10, the length of the
    array is 100. Remove duplicates from the array, sort and revert
  </p>
  <form action="handler.php" method="post">
    <input type="submit" name="task6" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task6'])) {
        echo $_SESSION['task6'];
        unset($_SESSION['task6']);
    }
    ?>
  </div>
</section>
<section class="task">
  <h1>TASK 7</h1>
  <p>
    Count the number of lines, letters and spaces in the entered text.
    Consider Cyrillic, emoji and special characters. Check with any online counter
  </p>
  <form action="handler.php" method="post">
    <label for="textarea">Enter your text:</label><br>
    <textarea name="textarea" id="textarea" cols="30" rows="10"><?php
    if (isset($_COOKIE['textarea'])) {
        echo $_COOKIE['textarea'];
    }
    ?></textarea>
    <input type="submit" name="task7" value="GO!">
  </form>
  <div class="task__answer">
    <?php
    if (isset($_SESSION['task7'])) {
        echo $_SESSION['task7'];
        unset($_SESSION['task7']);
    }
    ?>
  </div>
</section>
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous">
</script>
<script src="js/script.js"></script>
</body>
</html>