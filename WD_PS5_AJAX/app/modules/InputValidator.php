<?php
namespace app\modules;

class InputValidator
{
    public function validateName($name, $condition)
    {
        if (!mb_strlen($name)) {
            return 'Enter name!';
        } elseif (preg_match('/[^a-zA-Z0-9-_]/', $name)) {
            return 'Only Latin letters, numbers, "-" or "_"';
        } elseif (mb_strlen($name) > $condition) {
            return 'Max name size is ' . $condition;
        }

        return false;
    }

    public function validatePassword($password, $condition)
    {
        if (!mb_strlen($password)) {
            return 'Enter password!';
        } elseif (preg_match('/[^a-zA-Z0-9-_]/', $password)) {
            return 'Only Latin letters, numbers, "-" or "_"';
        } elseif (mb_strlen($password) > $condition) {
            return 'Max password size is ' . $condition;
        }

        return false;
    }

    public function validateMassage($newMessage, $condition)
    {
        if (!mb_strlen($newMessage)) {
            return 'Type something!';
        } elseif (mb_strlen($newMessage) > $condition) {
            return 'Maximum message length is ' . $condition . ' characters!';
        }

        return false;
    }

    public function validateInput($input)
    {
        $input = trim($input);
        $input = stripslashes($input);
        return htmlspecialchars($input);
    }
}
