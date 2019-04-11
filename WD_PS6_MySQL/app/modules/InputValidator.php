<?php
namespace app\modules;

class InputValidator
{
    private $errors = [];
    private $validMessage;

    public function validateName($name, $condition)
    {
        if (!mb_strlen($name)) {
            $this->errors['name'] = 'Enter name!';
            return false;
        }
        if (preg_match('/[^a-zA-Z0-9-_]/', $name)) {
            $this->errors['name'] = 'Only Latin letters, numbers, "-" or "_"';
            return false;
        }
        if (mb_strlen($name) > $condition) {
            $this->errors['name'] = 'Max name size is ' . $condition;
            return false;
        }

        return true;
    }

    public function validatePassword($password, $condition)
    {
        if (!mb_strlen($password)) {
            $this->errors['password'] = 'Enter password!';
            return false;
        }
        if (preg_match('/[^a-zA-Z0-9-_]/', $password)) {
            $this->errors['password'] = 'Only Latin letters, numbers, "-" or "_"';
            return false;
        }
        if (mb_strlen($password) > $condition) {
            $this->errors['password'] = 'Max password size is ' . $condition;
            return false;
        }

        return true;
    }

    public function validateMassage($newMessage, $condition)
    {
        $newMessage = htmlspecialchars(stripslashes(trim($newMessage)));

        if (!mb_strlen($newMessage)) {
            $this->errors['invalid_msg'] = 'Type something!';
            return false;
        }
        if (mb_strlen($newMessage) > $condition) {
            $this->errors['invalid_msg'] = 'Maximum message length is ' . $condition . ' characters!';
            return false;
        }

        $this->validMessage = $newMessage;

        return true;
    }

    public function getValidMessage()
    {
        return $this->validMessage;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}
