<?php

use app\modules\InputValidator;
use app\modules\ChatMySqlDatabaseHandler;

if (isset($_POST['submit'])) { // try to log in
    $validator = new InputValidator();

    $name = $_POST['name'];
    $password = $_POST['password'];

    $validator->validateName($name, $config['maxPassOrNameLength']);
    $validator->validatePassword($password, $config['maxPassOrNameLength']);

    // if name or password invalid send response and stop script
    if (!empty($validator->getErrors())) {
        $log->setLog('warning', 'invalid input while logging', 'logging input check');
        $responseData = $validator->getErrors();
        $responseData['log'] = $log->getLog();
        $response->send($responseData);
    }

    // both input fields are valid, check user
    try {
        $db = new ChatMySqlDatabaseHandler();

        if (!$db->isUserExist($name)) {
            $db->addUser($name, $password);
            $logMsg = 'added a new user';
        } elseif (!$db->isPasswordMatch($name, $password)) {
            $log->setLog('warning', 'wrong password while logging', 'password check');
            $response->send(['password' => 'Wrong password!', 'log' => $log->getLog()]);
        }

        $userId = $db->getUserId($name);

    } catch (PDOException $exception) {
        $logMsg = 'database error while logging';
        $log->setLog('error', $logMsg, 'db connection to logging');
        $response->send(['exception' => $exception->getMessage(), 'log' => $log->getLog()]);
    }

    $_SESSION['logged_in_user'] = $name;
    $_SESSION['logged_in_user_id'] = $userId;

    $log->setLog('info', (empty($logMsg) ? 'user logged in' : $logMsg),'logging to the chat', $userId);

    $response->send(['status' => 'success', 'log' => $log->getLog()]);
}


if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    $log->setLog('info', 'user logged out','log out from the chat', $_SESSION['logged_in_user_id']);

    unset($_SESSION['logged_in_user']);
    unset($_SESSION['logged_in_user_id']);
    unset($_SESSION['welcome_message']);

    $response->send(['status' => 'success', 'log' => $log->getLog()]);
}
