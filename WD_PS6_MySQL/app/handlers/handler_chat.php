<?php

use app\modules\InputValidator;
use app\modules\ChatMySqlDatabaseHandler;

if (isset($_POST['new_message']) && isset($_SESSION['logged_in_user'])) {
    $validator = new InputValidator();

    // if message invalid send response and stop script
    if (!$validator->validateMassage($_POST['new_message'], $config['maxMessageLength'])) {
        $response->send($validator->getErrors());
    }

    // message is valid
    $newMessage = $validator->getValidMessage();
    $name = $_SESSION['logged_in_user'];

    try {
        $db = new ChatMySqlDatabaseHandler();
        $db->addMessage($name, $newMessage);
    } catch (PDOException $exception) {
        $response->send(['exception' => $exception->getMessage()]);
    }

    $response->send(['status' => 'success']);
}


if (isset($_POST['load_chat']) && isset($_SESSION['logged_in_user'])) {

    try {
        $db = new ChatMySqlDatabaseHandler();
        $messagesForLastHour = $db->getMessagesForLastHour();
    } catch (PDOException $exception) {
        $response->send(['exception' => $exception->getMessage()]);
    }

    $response->send(['status' => 'success', 'messages' => $messagesForLastHour]);
}
