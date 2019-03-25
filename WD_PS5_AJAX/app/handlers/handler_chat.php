<?php

use app\modules\InputValidator as InputValidator;
use app\modules\DatabaseHandler as DatabaseHandler;

$config =
    require_once
    dirname(__DIR__) .
    DIRECTORY_SEPARATOR .
    'config' .
    DIRECTORY_SEPARATOR .
    'config.php';

require_once $config['pathToModulesLoader'];

if (isset($_POST['new_message']) && isset($_SESSION['logged_in_user'])) {
    $validator = new InputValidator();

    $response = []; // we will send this array to the front as json

    if (!$validator->validateMassage($_POST['new_message'], $config['maxMessageLength'])) {
        $response['invalid_message'] = $validator->getErrors()['invalid_message'];
        $response['status'] = 'fail';
        echo json_encode($response);
        die();
    }

    $newMessage = $validator->getValidMessage();
    $time = strval(round(microtime(true) * $config['microsecondsInMillisecond']));
    $name = $_SESSION['logged_in_user'];

    try {
        $databaseHandler = new DatabaseHandler($config['pathToJsonChatFile']);
        $database = $databaseHandler->getDatabase();
        $database[$time] = ['name' => $name, 'message' => $newMessage];
        $databaseHandler->writeToDatabase($database);
    } catch (Exception $exception) {
        $response['exception'] = $exception->getMessage();
    }

    if (empty($response)) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'fail';
    }

    echo json_encode($response);
}

if (isset($_POST['load_chat'])) {
    $response = [];

    try {
        $databaseHandler = new DatabaseHandler($config['pathToJsonChatFile']);
        $database = $databaseHandler->getDatabase();
    } catch (Exception $exception) {
        $response['exception'] = $exception->getMessage();
        $response['status'] = 'fail';
        echo json_encode($response);
        die();
    }

    if ($database) {
        $messagesForLastHour = [];
        $currentTime = round(microtime(true) * $config['microsecondsInMillisecond']);

        foreach ($database as $time => $nameAndMessage) { // an hour has passed or not
            if (($currentTime - $time) <= $config['millisecondsInHour']) {
                $messagesForLastHour[$time] = $nameAndMessage;
            }
        }

        $response['messages'] = $messagesForLastHour;
    }

    $response['status'] = 'success';

    echo json_encode($response);
}
