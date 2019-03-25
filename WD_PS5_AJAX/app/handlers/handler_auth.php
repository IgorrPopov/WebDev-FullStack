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

if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
    unset($_SESSION['welcome_message']);
}

if (isset($_POST['submit'])) { // try to log in
    $validator = new InputValidator();

    $name = $_POST['name'];
    $password = $_POST['password'];

    $response = []; // we will send this array to the front as json

    if (!$validator->validateName($name, $config['maxPassOrNameLength'])) {
        $response['name'] = $validator->getErrors()['name'];
    }
    if (!$validator->validatePassword($password, $config['maxPassOrNameLength'])) {
        $response['password'] = $validator->getErrors()['password'];
    }

    if (!empty($response)) {
        $response['status'] = 'fail';
        echo json_encode($response);
        die();
    }

    // both fields are valid, check user password
    try {
        $databaseHandler = new DatabaseHandler($config['pathToJsonAuthFile']);
        $database = $databaseHandler->getDatabase();

        if (!$database) { // if json file is empty
            $databaseHandler->writeToDatabase([$name => $password]);
        } else {
            if (array_key_exists($name, $database) && // old user with wrong password
                $database[$name] !== $password) {

                $response['password'] = 'Wrong password!';
            } else { // new user
                $database[$name] = $password;
                $databaseHandler->writeToDatabase($database);
            }
        }
    } catch (Exception $exception) {
        $response['exception'] = $exception->getMessage();
    }

    if (empty($response)) { // no exception or wrong password
        $_SESSION['logged_in_user'] = $name;
        $response['status'] = 'success';
    } else {
        $response['status'] = 'fail';
    }

    echo json_encode($response);
}
