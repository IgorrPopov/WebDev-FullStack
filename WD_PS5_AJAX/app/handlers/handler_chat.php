<?php
session_start();

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'JsonFileChecker.php';

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'JsonFileWriter.php';

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'JsonFileReader.php';

include_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'modules' .
    DIRECTORY_SEPARATOR .
    'InputValidator.php';

if (isset($_POST['new_message']) && isset($_SESSION['logged_in_user'])) {
    $newMessage = InputValidator::validateInput($_POST['new_message']);

    if (strlen($newMessage) == 0) {
        echo 'Type something!';
    } elseif (mb_strlen($newMessage) > MAX_MESSAGE_LENGTH) {
        echo 'Maximum message length is ' . MAX_MESSAGE_LENGTH . ' characters!';
    } else {
        $time = InputValidator::validateInput($_POST['time']);
        $name = InputValidator::validateInput($_SESSION['logged_in_user']);

        $jsonChecker = new JsonFileChecker(
            PATH_TO_JSON_CHAT_FILE,
            JSON_CHAT_FILE_NAME
        );

        $jsonChecker->validateJsonFile();

        $jsonReader = new JsonFileReader(
            PATH_TO_JSON_CHAT_FILE,
            JSON_CHAT_FILE_NAME
        );

        $jsonDatabase = $jsonReader->getJsonFileContent();

        $jsonWriter = new JsonFileWriter(
            PATH_TO_JSON_CHAT_FILE,
            JSON_CHAT_FILE_NAME
        );

        if (!$jsonDatabase) { // if json file is empty
            $jsonWriter->writeJson(
                array($time => array(
                    'name' => $name,
                    'message' => $newMessage)
                )
            );
        } else {
            $jsonDatabase[$time] = array(
                'name' => $name,
                'message' => $newMessage
            );

            $jsonWriter->writeJson($jsonDatabase);
        }

        echo ''; // now errors was find
    }
}

if (isset($_POST['load_chat'])) {
    $jsonChecker = new JsonFileChecker(
        PATH_TO_JSON_CHAT_FILE,
        JSON_CHAT_FILE_NAME
    );

    $jsonChecker->validateJsonFile();

    $jsonReader = new JsonFileReader(
        PATH_TO_JSON_CHAT_FILE,
        JSON_CHAT_FILE_NAME
    );

    $jsonDatabase = $jsonReader->getJsonFileContent();

    $jsonWriter = new JsonFileWriter(
        PATH_TO_JSON_CHAT_FILE,
        JSON_CHAT_FILE_NAME
    );

    if ($jsonDatabase) {
        // get current time in milliseconds
        $currentTime = round(microtime(true) * 1000);
        $messagesForLastHour = [];

        foreach ($jsonDatabase as $time => $nameAndMessage) { // an hour has passed or not
            if (($currentTime - (float)$time) <= MILLISECONDS_IN_HOUR) {
                $messagesForLastHour[$time] = $nameAndMessage;
            }
        }

        echo json_encode($messagesForLastHour);
    }
}
