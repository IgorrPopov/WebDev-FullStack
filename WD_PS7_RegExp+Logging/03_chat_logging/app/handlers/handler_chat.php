<?php

use app\modules\InputValidator;
use app\modules\ChatMySqlDatabaseHandler;

if (isset($_POST['new_message']) && isset($_SESSION['logged_in_user'])) {
    $validator = new InputValidator();

    $userId = $_SESSION['logged_in_user_id'];

    // if message invalid send response and stop script
    if (!$validator->validateMassage($_POST['new_message'], $config['maxMessageLength'])) {
        $log->setLog('warning', 'invalid message', 'message validation', $userId);
        $responseData = $validator->getErrors();
        $responseData['log'] = $log->getLog();
        $response->send($responseData);
    }

    // message is valid
    $newMessage = $validator->getValidMessage();
    $name = $_SESSION['logged_in_user'];

    try {
        $db = new ChatMySqlDatabaseHandler();
        $db->addMessage($name, $newMessage);
    } catch (PDOException $exception) {
        $logMsg = 'attempt to add a new message to the database fail';
        $log->setLog('error', $logMsg, 'adding new message to db', $userId);
        $response->send(['exception' => $exception->getMessage(), 'log' => $log->getLog()]);
    }

    $logMsg = 'new message successfully added to the database';
    $log->setLog('info', $logMsg,'adding new message to db', $userId);

    $response->send(['status' => 'success', 'log' => $log->getLog()]);
}


if (isset($_POST['load_chat']) && isset($_SESSION['logged_in_user'])) {

    $userId = $_SESSION['logged_in_user_id'];

    try {
        $db = new ChatMySqlDatabaseHandler();
        $messagesForLastHour = $db->getMessagesForLastHour();
    } catch (PDOException $exception) {
        $logMsg = 'attempt to get chat`s messages from the database fail';
        $log->setLog('error', $logMsg, 'getting messages for the last hour', $userId);
        $response->send(['exception' => $exception->getMessage(), 'log' => $log->getLog()]);
    }

    $logMsg = 'chat`s messages successfully got from the database';
    $log->setLog('info', $logMsg,'getting messages for the last hour', $userId);

    $response->send(['status' => 'success', 'messages' => $messagesForLastHour, 'log' => $log->getLog()]);
}
