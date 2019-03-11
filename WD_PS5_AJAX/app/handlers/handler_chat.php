<?php
session_start();

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'modules_loader' .
    DIRECTORY_SEPARATOR .
    'modules_loader.php';

if (isset($_POST['new_message']) && isset($_SESSION['logged_in_user'])) {

    $newMessage = app\modules\InputValidator::validateInput($_POST['new_message']);

    if (mb_strlen($newMessage) === 0) {

        echo 'Type something!';

    } elseif (mb_strlen($newMessage) > MAX_MESSAGE_LENGTH) {

        echo 'Maximum message length is ' . MAX_MESSAGE_LENGTH . ' characters!';

    } else {

        $time = app\modules\InputValidator::validateInput($_POST['time']);
        $name = $_SESSION['logged_in_user'];

        try {
            $databaseHandler = new \app\modules\DatabaseHandler(
                PATH_TO_JSON_CHAT_FILE
            );

            $database = $databaseHandler->getDatabase();
            $database[$time] = array(
                'name' => $name,
                'message' => $newMessage
            );

            $databaseHandler->writeToDatabase($database);
        } catch (Exception $exception) {
            $_SESSION['error'] = $exception->getMessage();
            echo 'exception';
            die();
        }

        echo ''; // now errors was find
    }
}

if (isset($_POST['load_chat'])) {

    try {
        $databaseHandler = new \app\modules\DatabaseHandler(
            PATH_TO_JSON_CHAT_FILE
        );

        $database = $databaseHandler->getDatabase();
    } catch (Exception $exception) {
        $_SESSION['error'] = $exception->getMessage();
        echo 'exception';
        die();
    }

    if ($database) {
        // get current time in milliseconds
        $currentTime = round(microtime(true) * 1000);
        $messagesForLastHour = [];

        foreach ($database as $time => $nameAndMessage) { // an hour has passed or not
            if (($currentTime - (float)$time) <= MILLISECONDS_IN_HOUR) {
                $messagesForLastHour[$time] = $nameAndMessage;
            }
        }

        echo json_encode($messagesForLastHour);
    }
}
