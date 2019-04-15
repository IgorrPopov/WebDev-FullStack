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
        $response->send($validator->getErrors());
    }

    // both input fields are valid, check user
    try {
        $db = new ChatMySqlDatabaseHandler();

        if (!$db->isUserExist($name)) {
            $db->addUser($name, $password);
        } elseif (!$db->isPasswordMatch($name, $password)) {
            $response->send(['password' => 'Wrong password!']);
        }

    } catch (PDOException $exception) {
        $response->send(['exception' => $exception->getMessage()]);
    }


    $_SESSION['logged_in_user'] = $name;

    $response->send(['status' => 'success']);
}


if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
    unset($_SESSION['welcome_message']);
}
