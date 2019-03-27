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

if (isset($_POST['log_out']) && isset($_SESSION['logged_in_user'])) {
    unset($_SESSION['logged_in_user']);
    unset($_SESSION['welcome_message']);

    $connection = null;
}

if (isset($_POST['submit'])) { // try to log in
    $validator = new InputValidator();

    $name = $_POST['name'];
    $password = $_POST['password'];


    if (!$validator->validateName($name, $config['maxPassOrNameLength'])) {
        $response['name'] = $validator->getErrors()['name'];
    }
    if (!$validator->validatePassword($password, $config['maxPassOrNameLength'])) {
        $response['password'] = $validator->getErrors()['password'];
    }


    if (!empty($response)) {
        $response['status'] = 'fail';
        $connection = null;
        echo json_encode($response);
        die();
    }


    try { // both fields are valid, check user password
        $sql = "SELECT password FROM users WHERE name='$name'";
        $statement = $connection->prepare($sql);
        $statement->execute();

        $hashedPasswordFromDb = $statement->fetch(PDO::FETCH_ASSOC)['password'];
        // add a new user
        if (!$hashedPasswordFromDb) {
            $newHashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO users(name, password) VALUES('$name', '$newHashedPassword')";
            $connection->exec($sql);
        }
        // old user with wrong password
        if ($hashedPasswordFromDb && !password_verify($password, $hashedPasswordFromDb)) {
            $response['password'] = 'Wrong password!';
        }
    } catch (PDOException $exception) {
        $response['exception'] = $exception->getMessage();
    }


    if (empty($response)) { // no exception or wrong password
        $_SESSION['logged_in_user'] = $name;
        $response['status'] = 'success';
    } else {
        $response['status'] = 'fail';
    }


    $connection = null;

    echo json_encode($response);
}
