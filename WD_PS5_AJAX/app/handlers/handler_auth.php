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

if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
    unset($_SESSION['welcome_message']);
}

if (isset($_POST['submit'])) {
    $name = app\modules\InputValidator::validateInput($_POST['name']);
    $password = app\modules\InputValidator::validateInput($_POST['password']);

    $errors = [];

    if (empty($name)) {
        $errors['name'] = 'Enter name!';
    } elseif (preg_match('/[^a-zA-Z0-9-_]/', $name)) {
        $errors['name'] = 'Only Latin letters, numbers, dashes and underscores!';
    } elseif (mb_strlen($name) > MAX_INPUT_LENGTH) {
        $errors['name'] = 'Max name size is ' . MAX_INPUT_LENGTH;
    }

    if (empty($password)) {
        $errors['password'] = 'Enter password!';
    } elseif (preg_match('/[^a-zA-Z0-9-_]/', $password)) {
        $errors['password'] = 'Only Latin letters, numbers, dashes and underscores!';
    } elseif (mb_strlen($password) > MAX_INPUT_LENGTH) {
        $errors['password'] = 'Max password size is ' . MAX_INPUT_LENGTH;
    }

    if (empty($errors)) { // both fields are valid, check user password
        try {
            $databaseHandler = new \app\modules\DatabaseHandler(
                PATH_TO_JSON_AUTH_FILE
            );
            $database = $databaseHandler->getDatabase();

            if (!$database) { // if json file is empty
                $databaseHandler->writeToDatabase(array($name => $password));
            } else {
                if (array_key_exists($name, $database) && // old user with wrong password
                    $database[$name] !== $password) {

                    $errors['password'] = 'Wrong password!';
                } else { // new user
                    $database[$name] = $password;
                    $databaseHandler->writeToDatabase($database);
                }
            }

        } catch (Exception $exception) {
            $_SESSION['error'] = $exception->getMessage();
            echo 'exception';
            die();
        }

        if (empty($errors)) {
            $_SESSION['logged_in_user'] = $name;
        }
    }

    echo ($errors) ? json_encode($errors) : '';
}
