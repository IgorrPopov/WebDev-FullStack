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

if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
    unset($_SESSION['welcome_message']);
}

if (isset($_POST['submit'])) {
    $name = InputValidator::validateInput($_POST['name']);
    $password = InputValidator::validateInput($_POST['password']);

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

    if (empty($errors)) {
        // both fields are valid, check user password
        $jsonChecker = new JsonFileChecker(
            PATH_TO_JSON_AUTH_FILE,
            JSON_AUTH_FILE_NAME
        );

        $jsonChecker->validateJsonFile(); // create json if need

        $jsonReader = new JsonFileReader(
            PATH_TO_JSON_AUTH_FILE,
            JSON_AUTH_FILE_NAME
        );

        $jsonDatabase = $jsonReader->getJsonFileContent();

        $jsonWriter = new JsonFileWriter(
            PATH_TO_JSON_AUTH_FILE,
            JSON_AUTH_FILE_NAME
        );

        if (!$jsonDatabase) { // if json file is empty
            $jsonWriter->writeJson(array($name => $password));
        } else {
            if (array_key_exists($name, $jsonDatabase) && // old user with wrong password
                $jsonDatabase[$name] !== $password) {
                $errors['password'] = 'Wrong password!';
            } else { // new user
                $jsonDatabase[$name] = $password;
                $jsonWriter->writeJson($jsonDatabase);
            }
        }

        if (empty($errors)) {
            $_SESSION['logged_in_user'] = $name;
        }
    }

    echo ($errors) ? json_encode($errors) : '';
}
