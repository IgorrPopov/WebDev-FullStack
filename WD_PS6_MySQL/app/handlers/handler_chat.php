<?php

use app\modules\InputValidator;

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

    if (!$validator->validateMassage($_POST['new_message'], $config['maxMessageLength'])) {
        $response['invalid_message'] = $validator->getErrors()['invalid_message'];
        $response['status'] = 'fail';

        echo json_encode($response);

        $connection = null;

        die();
    }

    $newMessage = $validator->getValidMessage();
    $name = $_SESSION['logged_in_user'];

    try {
        // get user_id of current user
        $sql = "SELECT user_id FROM users WHERE name='$name'";
        $statement = $connection->prepare($sql);
        $statement->execute();

        $userIdFromDb = $statement->fetch(PDO::FETCH_ASSOC)['user_id'];

        // add a new message to the database
        $sql = "INSERT INTO messages(user_id, message) VALUES(:user_id, :message)";
        $statement = $connection->prepare($sql);

        $statement->bindParam(':user_id', $userIdFromDb);
        $statement->bindParam(':message', $newMessage);

        $statement->execute();
    } catch (PDOException $exception) {
        $response['exception'] = $exception->getMessage();
    }

    $response['status'] = empty($response) ? 'success' : 'fail';

    echo json_encode($response);
}

if (isset($_POST['load_chat']) && isset($_SESSION['logged_in_user'])) {
    try {
        $sql = "SELECT messages.time, messages.message, users.name
                FROM messages
                LEFT JOIN users
                ON messages.user_id=users.user_id
                WHERE messages.time > NOW() - INTERVAL 1 HOUR";

        $statement = $connection->prepare($sql);
        $statement->execute();

        $messagesForLastHour = $statement->fetchAll(PDO::FETCH_ASSOC);

    } catch (PDOException $exception) {
        $response['exception'] = $exception->getMessage();
        $response['status'] = 'fail';
    }

    if (empty($response)) {
        $response['messages'] = $messagesForLastHour;
        $response['status'] = 'success';
    }

    echo json_encode($response);
}

$connection = null;
